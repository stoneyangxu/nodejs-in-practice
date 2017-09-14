const fs = require('fs')
const events = require('events')

class Database extends events.EventEmitter {
    constructor(path) {
        super()
        this.path = path

        this._records = Object.create(null) // 创建在内存中的记录映射

        this._writeStream = fs.createWriteStream(this.path, {
            encoding: 'utf8',
            flags: 'a' // 创建一个追加流
        })

        this._load()
    }

    _load() { // 加载已有的数据
        const stream = fs.createReadStream(this.path, {encoding: 'utf8'})
        const database = this

        let data = ''

        stream.on('readable', () => {
            data += stream.read() // 读取可用数据

            const records = data.split('\n') // 按行分隔数据
            data = records.pop() // 获取最后一个可能未完成的记录，最后一行通常是''

            records.forEach((record) => {
                try {
                    const json = JSON.parse(record)
                    if (json.value === null) { // 如果有null则删除记录
                        delete database._records[json.key]
                    } else {
                        database._records[json.key] = json.value // 按照键值存储
                    }
                } catch (e) {
                    database.emit('error', 'found invalid record: ', record)
                }
            })

        })

        stream.on('end', () => {
            database.emit('load')
        })
    }

    get(key) {
        return this._records[key]
    }

    set(key, value, cb) {
        const toWrite = JSON.stringify({key, value}) + '\n'

        if (value === null) {
            delete this._records[key]
        } else {
            this._records[key] = value
        }

        this._writeStream.write(toWrite, cb)
    }

    del(key, cb) {
        this.set(key, null, cb)
    }
}

module.exports = Database