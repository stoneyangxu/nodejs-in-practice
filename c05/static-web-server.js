const fs = require('fs')
const http = require('http')
const zlib = require('zlib')

http.createServer((req, res) => {

    res.writeHead(200, {'content-encoding': 'gzip'})

    fs.createReadStream(__dirname + '/index.html')
        .pipe(zlib.createGzip())
        .pipe(res)
}).listen(8000)