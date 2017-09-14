const fs = require('fs')

let hasLock = false
const lockDir = 'config.lock'

exports.lock = (cb) => {
    if (hasLock) return cb()

    fs.mkdir(lockDir, (err) => {
        if (err) return console.error(err)

        fs.writeFile(lockDir + '/' + process.pid, (err) => {
            if (err) return console.error(err)

            hasLock = true
            cb()
        })
    })
}

exports.unlock = (cb) => {

    if (!hasLock) return cb()

    fs.unlink(lockDir + '/' + process.pid, (err) => {
        if (err) return console.error(err)

        fs.rmdir(lockDir, (err) => {
            if (err) return console.error(err)

            hasLock = false
            cb()
        })
    })
}

process.on('exit', () => {
    if (hasLock) { // 如果在退出时依然存在锁，同步删除
        fs.unlinkSync(lockDir + '/' + process.pid)
        fs.rmdirSync(lockDir)
        console.log('removed lock')
    }
})