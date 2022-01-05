const fs = require("fs")



fs.readFile("./content/datas.json", (error, datas) => {
    if(error != null) return

    datas = datas.toString()
    datas = JSON.parse(datas)

    datas.categs.forEach((item_categ) => {
        console.log(" " + item_categ.name)
        
        item_categ.subcategs.forEach((item_subcateg) => {
            console.log("     " + item_subcateg.name)

            item_subcateg.products.forEach((item_product) => {
                console.log("          " + item_product.name)
            })
        })
    })
    
})