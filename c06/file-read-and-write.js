const fs = require('fs')
const assert = require('assert')

const fd = fs.openSync('./file.txt', 'w+') // 用于写或者读读方式打开文件

const writeBuf = new Buffer('some text to write')
fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0) // 写入文件

const readBuffer = new Buffer(writeBuf.length)
fs.readSync(fd, readBuffer, 0, writeBuf.length, 0) // 读入文件

assert.equal(writeBuf.toString(), readBuffer.toString())

fs.closeSync(fd) // 关闭文件