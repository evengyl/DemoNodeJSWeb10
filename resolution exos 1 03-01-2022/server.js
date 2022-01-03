const http = require("http")
const url = require("url")


const server = http.createServer((req, res) => {

    let urlParse = url.parse(req.url)

    console.log(urlParse)
    let contentRes = ""
    let statusCode = 500

    if(urlParse.pathname == "/" || urlParse.pathname == "/accueil")
    {
        statusCode = 200
        contentRes = "<h1>Page d'accueil</h1>"
    }
    else if(urlParse.pathname == "/contact")
    {
        statusCode = 200
        contentRes = "<h1>Page de contact</h1>"
    }
    else if(urlParse.pathname.includes("/categ"))
    {

        if(urlParse.pathname.includes("/subcateg"))
        {

            if(urlParse.pathname.includes("/product"))
            {
                statusCode = 200
                contentRes = "<h1>Vous êtes sur un produit</h1>"
            }
            else
            {
                statusCode = 200
                contentRes = "<h1>Vous êtes sur les catégories secondaires</h1>"
            }
        }
        else
        {
            statusCode = 200
            contentRes = "<h1>Vous êtes sur les catégories principales</h1>"
        }
    }
    else
    {
        statusCode = 404
        contentRes = "<h1>Oops, page non trouvée</h1>"
    }



    //localhost:3000/categ/subcateg/product?categID=1&subcategID=2&productID=3

    res.writeHead(statusCode, { "Content-Type" : "text/html; charset=utf-8" })
    res.write(contentRes)
    res.end()
})

server.listen(3000)