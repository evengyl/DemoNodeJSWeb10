const http = require("http") //contient le package http utilisé pour créer le serveur web
const url = require("url") // package permettant la tranformation de req.url en un objet plus pratique et utilisable


const server = http.createServer((req, res) => { //crée le servuer http, celui ci vous renvoie une callback avec req et res
//req pour request -> entrée des demandes client vers serveur
//res pour response -> sortie de la requète du servuer vers le client

    let urlParse = url.parse(req.url) //fonction me permettant de parser l'url en objet utilisable
    /* ex : localhost:3000/url1/url2?maquery=tutu&maquery2=toto
    donnera :   pathname : /url1/url2
                query : { maquery : 'tutu', maquery2 : 'toto'}

    */

    let statusCode = 404 //je prépare les status code http de réponse du serveur à l'avance
    let contentRes = "" // ainsi que le contenu de la réponse, tout ça pour les rendre plus dynamique

    if(urlParse.pathname == '/url1/url2') //grace au parsage de mon url, je peux mtn tester les params de route
    {
        statusCode = 200 //status 200 signifie OK tout vas bien 
        contentRes = "<h1>je suis au bon endroit pour url1 et url2</h1>" //petit message
    }
    else {
        statusCode = 404 //si je n'ai pas matcher dans mes if, les params envoyé, alors mon serveur ne connais pas
        //cette route, alors je retourne une erreur 404
        contentRes = "Attention cette page/demande n'existe pas..." //avec une petit message
    }

    //je peux maintenant définir ma reponse au client, en disant
    //le status et tel, et j'encode ma réponse en utf-8 et en text ou html (headers)
    res.writeHead(statusCode, { "Content-Type" : "text/html; charset=utf-8" })
    res.write(contentRes) // voila ma réponse (body)
    res.end() //cloture la requète et renvoie la réponse au client
    
})

//PS : pour accèder au "code source" des méthodes et prop du système
// -> crtl + click sur la méthode
// -> f12 sur la méthode
// click droit -> go to definition sur la méthode

server.listen(3000) // permet la mise sur écoute du serveur http sur le port 3000