const fs = require('fs')

fs.readFile('./package.json', (err, buf) => {
    console.log(Buffer.isBuffer(buf))

    console.log(buf)

    console.log(buf.toString())

    console.log(buf.toString('ascii'))

    const encoded = new Buffer('yangxu: passwd').toString('base64')
    console.log(encoded)
})