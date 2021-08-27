
const fs = require('fs');


function tokenise(str) {
    let rawdata = fs.readFileSync('tokens.json');
    let tokens = JSON.parse(rawdata);

    var rm = ['.', '/', ',', '?', '!', '+', '$']
    rm.forEach((val) => {
        str = str.split(val).join(' ');
    })
    var tk = {}
    var tks = []
    str.toLowerCase().split(" ").forEach((val) => {
        found = false
        for (var key in tokens) {
            if (tokens[key].includes(val)) {
                tk[val] = key
                tks.push(key)
                found = true
            }
        } if (!found && ((val != ''))) {
            tk[val] = 'noun'
        }
    })
    return [tk, tks]

}


module.exports = tokenise
