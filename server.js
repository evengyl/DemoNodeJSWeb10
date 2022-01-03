const http = require("http")
const url = require("url")
const PORT = 3000

const server = http.createServer((req, res) => {
    console.log(req.method)
    console.log(req.url)

    let urlParse = url.parse(req.url, true)

    console.log(urlParse)


    //    localhost:3000/ OU localhost:3000
    if(urlParse.pathname == "/")
    {
        res.writeHead(200,{ "Content-Type" : "text/html; charset=utf-8" })
        res.write(`
            <h1>Bonjour à tous, vous êtes sur la homepage</h1>
            <a href='/contact'>Contact</a>
        `)
        res.end()
    }
    //    localhost:3000/contact
    else if(urlParse.pathname == "/contact")
    {
        res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" })
        res.write("<input name='name' type='text'>")
        res.end()
    }
    //    localhost:3000/categ
    else if(urlParse.pathname == "/categ")
    {
        //    localhost:3000/categ?categId
        if(urlParse.query.categId)
        {
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" })
            res.write(`<h1>Catégorie numéro : ${urlParse.query.categId}</h1>
            <ul>
                <li>un</li>
                <li>deux</li>
                <li>trois</li>
            </ul>`)
            res.end()
        }
        //    localhost:3000/categ OU localhost:3000/categ?autreChose=tutu
        else{
            res.writeHead(404, { "Content-Type" : "text/html; charset=utf-8" })
            res.write("<h1>Attention la catégorie n'existe pas/plus</h1>")
            res.end()
        }
        
    }
    //  localhost:3000/Autrechose
    else
    {
        res.writeHead(404, { "Content-Type" : "text/html; charset=utf-8" })
        res.write("<h1>Erreur 404</h1>")
        res.end()
    }

  


})



server.listen(PORT, console.log("Le serveur écoute sur le port 3000"))