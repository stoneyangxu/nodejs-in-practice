const http = require('http')
const workerPool = require('./worker-pool')


const runJob = workerPool('./worker.js')  // 初始化工作池

http.createServer((req, res) => {

    runJob(1000, (err, data) => {
        console.log(data)
        if (err) res.end('got an error: ', JSON.stringify(err))
        res.end(data.toString())
    })
}).listen(8000)