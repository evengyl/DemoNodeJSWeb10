const http = require("http")
const url = require("url")


const server = http.createServer((req, res) => {

    let urlParse = url.parse(req.url, true)
    console.log(req.method)

    let contentRes = ""
    let statusCode = 500
    let head = { "Content-Type" : "text/html; charset=utf-8" }

    if(req.method == "GET")
    {
        if(urlParse.pathname == "/contact")
        {
            statusCode = 200
            contentRes = `<h1>Page de contact en mode GET</h1>
                <form method="post">
                    <input type="text" name="name"><br>
                    <input type="text" name="lastname">
                    <button type="submit">Envoyer</button>
                </form>`
        }
        else if(urlParse.pathname == "/")
        {
            statusCode = 200
            contentRes = `<h1>Page d'accueil</h1>`
        }
    }
    else if(req.method == "POST")
    {
        if(urlParse.pathname == "/contact")
        {
            statusCode = 302
            head = { "Location" : "/"}
        }
    }



    res.writeHead(statusCode, head)
    res.write(contentRes)
    res.end()
})

server.listen(3000)