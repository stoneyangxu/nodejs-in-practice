const net = require('net')

const server = net.createServer((client) => {
    client.setNoDelay(true) // 关闭Nagle算法

    client.write('377323467283822324', 'binary') // 强制使用二进制传输

    console.log('server connected')

    client.on('end', () => {
        console.log('server disconnected')
        server.unref() // 客户端断开时，保证服务器关闭
    })

    client.on('data', (data) => {
        process.stdout.write(data.toString())
        client.write(data.toString())
    })
})

server.listen(8000, () => {
    console.log('server started')
})