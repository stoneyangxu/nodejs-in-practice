const assert = require('assert')
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'})
    res.write('Hello World!\r\n')
    res.end()
})

server.listen(8000, () => {
    console.log('Listening on port 8000')
})

const req = http.request({
    port: 8000
}, (res) => {
    console.log('HTTP headers: ', res.headers)
    res.on('data', (data) => {
        console.log('Body: ', data.toString())

        assert.equal('Hello World!\r\n', data.toString())
        assert.equal(200, res.statusCode)
        server.unref()
    })
})

req.end() // send request