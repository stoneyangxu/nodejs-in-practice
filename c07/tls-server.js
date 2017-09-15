const fs = require('fs')
const tls = require('tls')

const options = {
    key: fs.readFileSync('server.pem'), // 服务端私钥
    cert: fs.readFileSync('server-cert.pem'), // 公钥
    ca: [fs.readFileSync('client-cert.pem')], // 客户端验证证书
    requestCert: true, // 确保服务端和客户端都要检查
}

const server = tls.createServer(options, (clearTextStream) => {
    const authorized = clearTextStream.authorized ? 'authorized': 'unauthorized'

    console.log('Connected: ', authorized) // 展示服务器是否能够验证证书

    clearTextStream.write('Welcome!\n')
    clearTextStream.setEncoding('utf8')
    clearTextStream.pipe(clearTextStream)
})

server.listen(8080, () => {
    console.log('Server listening...')
})