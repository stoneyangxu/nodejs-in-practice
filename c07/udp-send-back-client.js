const assert = require('assert')
const dgram = require('dgram')
const readline = require('readline')

const port = 41234

class Client {
    constructor(remoteIp) {
        this.remoteIp = remoteIp

        this.socket = dgram.createSocket('udp4')

        this.rl = readline.createInterface(process.stdin, process.stdout) // 处理用户输入和输出

        this.socket.send(new Buffer('<JOIN>'), 0, 6, port, this.remoteIp) // 发送加入信息

        this.rl.setPrompt('Message>') // 显示用户提示
        this.rl.prompt()

        this.rl.on('line', (line) => {
            this.sendData(line) // 用户输入后，发送信息
        }).on('close', () => {
            process.exit(0)
        })

        this.socket.on('message', (msg, rinfo) => {
            console.log(`\n<${rinfo.address}>`, msg.toString()) // 收到消息后打印来源和内容
            this.rl.prompt()
        })
    }

    sendData(message) {
        this.socket.send(new Buffer(message), 0, message.length, port, this.remoteIp, (err, bytes) => {
            console.log('Send: ', message)
            this.rl.prompt()
        })
    }
}

class Server {
    constructor() {
        this.clients = []
        this.server = dgram.createSocket('udp4')

        this.server.on('message', (msg, rinfo) => {
            const clientId = rinfo.address + ':' + rinfo.port // 获取用户地址
            msg = msg.toString()

            if (!this.clients[clientId]) {
                this.clients[clientId] = rinfo // 如果用户第一次注册，保存注册信息
            }

            for (let client in this.clients) {
                if (client !== clientId) { // 消息广播给除自己之外的其他人
                    const clientRInfo = this.clients[client]
                    this.server.send(
                        new Buffer(msg), 0, msg.length,
                        clientRInfo.port, clientRInfo.address, // 消息发送给其他客户端
                        (err, bytes) => {
                            if (err) console.error(err)
                            console.log(`Bytes sent: `, bytes)
                        })
                }
            }
        })

        this.server.on('listening', () => {
            console.log('Server ready:', this.server.address())
        })

        this.server.bind(port)
    }
}

module.exports = {
    Client,
    Server,
}

if (!module.parent) {
    switch (process.argv[2]) {
        case 'client':
            new Client(process.argv[3])
            break
        case 'server':
            new Server()
            break
        default:
            console.log('unknown option')
            break
    }
}