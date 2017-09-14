const assert = require('assert')
const fs = require('fs')
const CSVParser = require('./csv-parser')

const parser = new CSVParser()

const actual = []

fs.createReadStream(__dirname + '/sample.csv').pipe(parser)

process.on('exit', () => {
    actual.push(parser.read())

    const expected = [
        {} // 期望的结果
    ]

    assert.deepEqual(expected, actual) // 对比结果
})