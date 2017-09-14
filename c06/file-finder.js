const fs = require('fs')
const join = require('path').join

exports.findSync = (nameRe, startPath) => {
    const results = []

    const finder = (path) => {
        const files = fs.readdirSync(path)

        files.forEach((file) => {
            const fpath = join(path, file)

            const states = fs.statSync(fpath)

            if (states.isDirectory()) finder(fpath)
            if (states.isFile() && nameRe.test(file)) results.push(fpath)
        })
    }

    finder(startPath)
    return results
}

exports.find = (nameRe, startPath, cb) => {

    const results = []
    let asyncOps = 0 // 需要计数器来判断是否完成了遍历
    let errored = false

    const error = (err) => {
        if (!errored) cb(err) // 如果存在多个错误，确保只执行一次回调
        errored = true
    }

    const finder = (path) => {
        asyncOps++

        fs.readdir(path, (err, files) => {

            files.forEach((file) => {
                const fpath = join(path, file)

                asyncOps++

                fs.stat(fpath, (err, stats) => {
                    if (err) return error(err)

                    if (stats.isDirectory()) finder(fpath)
                    if (stats.isFile() && nameRe.test(file)) results.push(fpath)

                    asyncOps-- // 在每个异步操作完成时，计数器减1

                    if (asyncOps === 0) cb(null, results) // 完成所有异步操作后，执行回调
                })
            })

            asyncOps-- // 在每个异步操作完成时，计数器减1
            if (asyncOps === 0) cb(null, results)  // 完成所有异步操作后，执行回调
        })
    }

    finder(startPath)
}
