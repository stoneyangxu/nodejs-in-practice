const assert = require('assert')
const fs = require('fs')

const CountStream = require('./src/countstream')

const countStream = new CountStream('example')
let passed = 0

countStream.on('total', (count) => {
    assert.equal(count, 1) // 断言匹配数
    passed += count
})

fs.createReadStream(__filename).pipe(countStream) // 将当前文件创建为流

process.on('exit', () => {
    console.log(`Assertions passed: ${passed}`)
})
