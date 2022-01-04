const http = require("http")
const url = require("url")


const server = http.createServer((req, res) => {

    let urlParse = url.parse(req.url, true)
    console.log(req.method)

    let contentRes = ""
    let statusCode = 500

    if(req.method == "GET")
    {
        if(urlParse.pathname == "/" || urlParse.pathname == "/accueil")
        {
            statusCode = 200
            contentRes = `<h1>Page d'accueil</h1>
            <a href='/categs'>Vers les catégories principales</a>`
        }
        else if(urlParse.pathname == "/contact")
        {
            statusCode = 200
            contentRes = `<h1>Page de contact en mode GET</h1>
                <input type="text" name="name"><br>
                <input type="text" name="lastname">
                <button type="submit">Envoyer</button>`
        }
        else if(urlParse.pathname.includes("/categs")) 
        {

            if(urlParse.pathname.includes("/subcategs")) 
            {

                if(urlParse.pathname.includes("/products"))
                {
                    if(urlParse.query.productID)//localhost:3000/categs/subcategs/products?categID=1&subcategID=2&productID=42
                    {
                        statusCode = 200
                        contentRes = `<h1>Vous êtes sur un produit</h1>
                        <p>Categ principale : ${urlParse.query.categID}</p>
                        <p>Categ secondaire : ${urlParse.query.subcategID}</p>
                        <p>Produit sélectionné : ${urlParse.query.productID}<p>`
                    }
                    else //localhost:3000/categs/subcategs/products?categID=1&subcategID=2
                    {
                        statusCode = 200
                        contentRes = `<h1>Vous êtes sur la liste des produits</h1>
                        <p>Categ principale : ${urlParse.query.categID}</p>
                        <p>Categ secondaire : ${urlParse.query.subcategID}</p>
                        <ul>
                            <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=${urlParse.query.subcategID}&productID=1">Product 1</a></li>
                            <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=${urlParse.query.subcategID}&productID=2">Product 2</a></li>
                            <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=${urlParse.query.subcategID}&productID=3">Product 3</a></li>
                            <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=${urlParse.query.subcategID}&productID=4">Product 4</a></li>
                        </ul>
                        `
                    }
                    
                }
                else//localhost:3000/categs/subcategs?categID=1
                {
                    statusCode = 200
                    contentRes = `<h1>Vous êtes sur les catégories secondaires</h1>
                    <p>Categ principale : ${urlParse.query.categID}</p>
                    <ul>
                        <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=1">Subcateg 1</a></li>
                        <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=2">Subcateg 2</a></li>
                        <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=3">Subcateg 3</a></li>
                        <li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategID=4">Subcateg 4</a></li>
                    </ul>
                    `
                }
            }
            else //localhost:3000/categs
            {
                statusCode = 200
                contentRes = `<h1>Vous êtes sur les catégories principales</h1>
                <ul>
                    <li><a href="/categs/subcategs?categID=1">Categ principale 1</a></li>
                    <li><a href="/categs/subcategs?categID=2">Categ principale 2</a></li>
                    <li><a href="/categs/subcategs?categID=3">Categ principale 3</a></li>
                    <li><a href="/categs/subcategs?categID=4">Categ principale 4</a></li>
                </ul>`
                
            }
        }
        else
        {
            statusCode = 404
            contentRes = "<h1>Oops, page non trouvée</h1>"
        }

    }
    else if(req.method == "POST")
    {
        if(urlParse.pathname == "/contact")
        {
            let body = ""

            req.on('data', (form) => {
                body += form.toString()
            })

            req.on('end', () => {

                //ici je suis dans la possibilité de recevoir de mon body (formulaire)
                // "name=loic&lastname=baudoux"    ====> STRING que je peux parser avec le décodeur
                // "{ 'name' : 'loic', 'lastname' : 'baudoux'}"     =====> STRING que je peux parser avec JSON.parse()
                if(body.startsWith("{") && body.endsWith("}"))
                    body = JSON.parse(body)
                else{

                    /*
                    Convertit "name=loic&lastname=baudoux" en JSON { 'name' : 'loic', 'lastname' : 'baudoux' } utilisable
                    */
                    body = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
                }

                console.log(body)
            })


            //je traite le formulaire ici
            //et puis je redirige mon client vers autre part.
            statusCode = 303
            head = { "Location" : "/"}


            // statusCode 302 -> redirection standard
            // 307 -> passer de get à post puis redirger vers le meme lien en post 
            // 303 -> passer de get à post puis redirger vers un autre lien en get 
        }
    }
    else
    {
        statusCode = 404
        contentRes = `<h1>Je ne connais pas cette méthode HTTP : ${req.method}</h1>`
    }



    //localhost:3000/categ/subcateg/product?categID=1&subcategID=2&productID=3

    res.writeHead(statusCode, { "Content-Type" : "text/html; charset=utf-8" })
    res.write(contentRes)
    res.end()
})

server.listen(3000)