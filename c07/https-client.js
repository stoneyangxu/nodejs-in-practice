const fs = require('fs')
const https = require('https')
const os = require('os')

const options = {
    key: fs.readFileSync('client.pem'), // 服务端私钥
    cert: fs.readFileSync('client-cert.pem'), // 公钥
    ca: [fs.readFileSync('server-cert.pem')], // 客户端验证证书
    hostname: os.hostname(),
    port: 8080,
    path: '/',
    method: 'GET'
}

const req = https.request(options, (res) => {
    res.on('data', (d) => {
        process.stdout.write(d)
    })
})

req.end()

req.on('error', (e) => {
    console.error(e)
})
