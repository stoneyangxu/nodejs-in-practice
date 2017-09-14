const dgram = require('dgram')
const fs = require('fs')

const port = 41230
const defaultSize = 16

class Client {
    constructor(remoteIp) {
        this.remoteIp = remoteIp
        this.inStream = fs.createReadStream(__filename) // 读取自身所在文件
        this.socket = dgram.createSocket('udp4')

        this.inStream.on('readable', () => {
            this.sendData() // 开始发送数据
        })
    }

    sendData() {
        const message = this.inStream.read(defaultSize) // 读取指定大小
        if (!message) { // 传输完毕时，关闭socket
            return this.socket.unref()
        }

        this.socket.send(message, 0, message.length, port, this.remoteIp, (err, data) => {
            this.sendData() // 递归发送剩余数据
        })

    }
}

class Server {
    constructor() {
        this.socket = dgram.createSocket('udp4')

        this.socket.on('message', (msg, rinfo) => {
            process.stdout.write(msg.toString())
        })

        this.socket.on('listening', () => {
            console.log(`Server ready:`, this.socket.address())
        })

        this.socket.bind(port)
    }
}

if (process.argv[2] === 'client') {
    new Client(process.argv[3])
} else {
    new Server()
}