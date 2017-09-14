const net = require('net')

let clients = 0

const server = net.createServer((client) => {

    clients++

    const clientId = clients

    console.log(`Client connected: ${clientId}`)

    client.on('end', () => {
        console.log(`Client disconnected: ${clientId}`)
    })

    client.write(`Welcome client: ${clientId}`)
    client.pipe(client) // 将欢迎信息返回给客户端
})

server.listen(8000, () => {
    console.log('Server started on port 8000')
})