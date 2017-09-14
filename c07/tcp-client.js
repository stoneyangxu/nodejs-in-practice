const net = require('net')
const assert = require('assert')

let clients = 0
let expectedAssertions = 2 // 预期的断言数

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

    runTest(1, () => {
        runTest(2, () => {
            console.log('Tests finished')
            assert.equal(0, expectedAssertions)
            server.close()
        })
    })
})


const runTest = (expectedId, done) => {
    const client = net.connect(8000)

    client.on('data', (data) => {
        const expected = `Welcome client: ${expectedId}`
        assert.equal(expected, data.toString())

        expectedAssertions--
        client.end()
    })

    client.on('end', done)
}