const cp = require('child_process')
const cpus = require('os').cpus().length // 获取cpu数量，创建尽可能多的fork

module.exports = function (workModule) {
    const awaiting = [] // 当前处于排队的任务
    const readyPool = [] // 当前可用的worker
    let poolSize = 0 // 工作池的大小

    return function doWork(job, cb) {

        console.log(`poolSize: ${poolSize} readyPool: ${readyPool.length} awaiting: ${awaiting.length}`)

        if (!readyPool.length && poolSize > cpus) {
            return awaiting.push([doWork, job, cb]) // 如果没有空闲工作者或者数量超过池限制，加入排队
        }


        const child = readyPool.length
            ? readyPool.shift() // 如果有空闲资源，直接使用
            : (poolSize++, cp.fork(workModule)) // 如果还未超限，创建一个新的fork

        let cbTriggered = false // 记录回调是否被执行

        child
            .removeAllListeners()
            .once('error', (err) => {
            if (!cbTriggered) { // 避免多次执行回调
                cb(err)
                cbTriggered = true
            }
            child.kill() // 杀死子进程
        }).once('exit', (code, signal) => {
            if (!cbTriggered) {
                cb(new Error(`Child exited with code: ${code}`))
            }
            poolSize--
            const childIdx = readyPool.indexOf(child) // 如果子进程因为其他原因退出，已经不可用，在进程池中进行清理
            if (childIdx > -1) {
                readyPool.slice(childIdx, 1)
            }
        }).once('message', (result) => {
            cb(null, result) // 收到结果后执行回调
            cbTriggered = true
            readyPool.push(child) // 执行任务结束后，当前子进程作为空闲工作者
            if (awaiting.length) {
                setImmediate.apply(null, awaiting.shift()) // 如果还有排队任务，在下个周期执行
            }
        }).send(job)

    }
}