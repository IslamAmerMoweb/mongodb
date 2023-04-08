const fs = require('fs')

class FileJson {
    static writeJsonData = (fileName, data) => {
        fs.writeFileSync(fileName, JSON.stringify(data))
    }

    static readFileJson = (fileName) => {
        let res
        try {
            res = JSON.parse(fs.readFileSync(fileName))
            if (!Array.isArray(res)) throw new Error('not array')
        }
        catch (e) {
            res = []
        }
        return res
    }

}

module.exports = FileJson