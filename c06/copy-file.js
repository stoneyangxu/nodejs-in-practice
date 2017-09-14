const fs = require('fs')

const readStream = fs.createReadStream('./file.txt')
const writeStream = fs.createWriteStream('./copy.txt')

readStream.pipe(writeStream)