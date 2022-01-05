const fs = require("fs")



fs.readFile("./content/datas.json", (error, datas) => {
    if(error != null) return

    datas = datas.toString()
    datas = JSON.parse(datas)


    
})