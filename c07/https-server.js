const fs = require('fs')
const https = require('https')


const options = {
    key: fs.readFileSync('server.pem'), // 服务端私钥
    cert: fs.readFileSync('server-cert.pem'), // 公钥
    ca: [fs.readFileSync('client-cert.pem')], // 客户端验证证书
    requestCert: true, // 确保服务端和客户端都要检查
}

const server = https.createServer(options, (req, res) => {
    const authorized = req.socket.authorized ? 'authorized': 'unauthorized'

    console.log('Connected: ', authorized) // 展示服务器是否能够验证证书

    res.writeHead(200)
    res.write(`Welcome! You are ${authorized} \n`)
    res.end()
})

server.listen(8080, () => {
    console.log('Server listening...')
})