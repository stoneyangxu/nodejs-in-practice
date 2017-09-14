const stream = require('stream')
const fs = require('fs')

class CSVParser extends stream.Transform {

    constructor() {
        super()

        this.value = ''
        this.headers = []
        this.values = []
        this.line = 0
    }

    addValue() {
        if (this.line === 0) {
            this.headers.push(this.value)
        } else {
            this.values.push(this.value)
        }
        this.value = ''
    }

    toObject() { // 当前行转换为json格式
        const obj = {}

        for (let i = 0; i < this.headers.length; i++) {
            obj[this.headers[i]] = this.values[i]
        }

        return obj
    }

    _transform(chunk, encoding, done) {

        chunk = chunk.toString()

        for (let i = 0; i < chunk.length; i++) {
            const c = chunk.charAt(i)

            if (c === ',') { // 读取单元格结束
                this.addValue()
            } else if (c === 'n') { // 读完一行
                this.addValue()
                if (this.line > 0) { // 内容行，转换为json
                    this.push(JSON.stringify(this.toObject())) // 使用push方法推送到输出
                }

                this.values = [] // 清空内容缓存
                this.line++
            } else { // 继续读取单元格
                this.value += c
            }
        }
    }
}

module.exports = CSVParser

// const parser = new CSVParser()
//
// fs.createReadStream(__dirname + '/sample.csv')
//     .pipe(parser)
//     .pipe(process.stdout)
