const fs = require('fs')
const os = require('os')
const tls = require('tls')

const options = {
    key: fs.readFileSync('client.pem'), // 服务端私钥
    cert: fs.readFileSync('client-cert.pem'), // 公钥
    ca: [fs.readFileSync('server-cert.pem')], // 服务端验证证书
    servername: os.hostname()
}

const clearTextStream = tls.connect(8080, options, () => {
    const authorized = clearTextStream.authorized ? 'authorized': 'unauthorized'

    console.log('Connected: ', authorized)

    process.stdin.pipe(clearTextStream)
})

clearTextStream.setEncoding('utf8')
clearTextStream.on('data', (data) => {
    console.log(data)
})