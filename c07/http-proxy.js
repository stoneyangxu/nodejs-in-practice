const http = require('http')
const url = require('url')

http.createServer((req, res) => {

    console.log('start request: ', req.url)

    const options = url.parse(req.url) // 解析原始请求头
    options.headers = req.headers

    const proxyRequest = http.request(options, (proxyResponse) => { // 创建一个代理请求
        proxyResponse.on('data', (chunk) => { // 收到响应时，转发给原始请求的response
            console.log('proxyResponse length: ', chunk.length)
            res.write(chunk, 'binary')
        })

        proxyResponse.on('end', () => { // 响应结束时，结束原始响应
            console.log('proxied request ended')
            res.end()
        })

        res.writeHead(proxyResponse.statusCode, proxyResponse.headers) // 将响应头，写入原始响应头
    })

    req.on('data', (chunk) => { // 收到原始请求时，通过代理请求进行转发
        console.log('in request length: ', chunk.length)
        proxyRequest.write(chunk, 'binary')
    })

    req.on('end', () => { // 原始请求结束时，结束代理请求的发送
        console.log('original request ended')
        proxyRequest.end()
    })

}).listen(8080)