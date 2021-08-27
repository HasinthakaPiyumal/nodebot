const tokenise = require('./nlp')

num = ['94710442946@s.whatsapp.net', '94761650864@s.whatsapp.net', '94769876712@s.whatsapp.net', '94763215389@s.whatsapp.net']

const fs = require('fs');



/***********  Mapper  *************/
function Mapper(msg) {

    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);


    var maps = {}
    var tk0 = tokenise(msg)
    tk = tk0[1].join(' ')
    for (var key in data) {
        if (data[key]['req'].includes(tk)) {
            maps[tk] = key
        }
    }
    return maps
}

function Reply(maps) {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);


    var rps = []
    for (var key in maps) {
        var rs = data[maps[key]]['res']
        rps.push(rs[Math.floor(Math.random() * rs.length)])
    }
    return rps
}




//Logical Code
module.exports = function (id, msg, conn) {
    if (num.includes(id) && msg) {
        const res = Reply(Mapper(msg))
        if (res[Math.floor(Math.random() * res.length)]) {
            return res[Math.floor(Math.random() * res.length)]
        } else {
            return 'noreply'
        }
    }
    else {
        return 'noreply'
    }
}
