const fs = require('fs')
const path = require('path')
module.exports = {
    read(url) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, url), "utf-8", (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(JSON.parse(data))
            })
        })
    },
    write(url, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, url), JSON.stringify(data), "utf-8", (err) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    },
    async add(url, data) {
        let result = await this.read(url)
        result.push(data)
        await this.write(url, result)
    },
    async amend(url, data) {
        let result = await this.read(url)
        result = result.map((item) => {
            if (item.id == data.id) {
                return data
            } else {
                return item
            }
        })
        await this.write(url, result)
    },
    async remove(url, id) {
        let result = await this.read(url)
        result = result.filter((item) => {
            return item.id != id
        })
        await this.write(url, result)
    }
}
