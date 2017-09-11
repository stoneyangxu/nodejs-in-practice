const CountStream = require('./src/countstream')
const http = require('http')

const countStream = new CountStream('book') // 初始化自定义流

http.get('http://www.manning.com', function(res) { // 请求网页
    res.pipe(countStream) // 以管道的方式连接到countStream
})

countStream.on('total', (count) => {
    console.log(`Total matches: ${count}`)
})
