const fs = require('fs')
const zlib = require('zlib')

function benchStream(inSize, outSize) {
    const time = process.hrtime() // 纳秒级起始事件
    let watermark = process.memoryUsage().rss

    const input = fs.createReadStream('/usr/share/dict/words', {
        bufferSize: inSize // 设置读入缓冲区大小
    })

    const gzip = zlib.createGzip({
        chunkSize: outSize // 设置压缩缓冲区大小
    })

    const output = fs.createWriteStream('out.gz', {bufferSize: inSize})

    const memoryCheck = setInterval(() => {
        const rss = process.memoryUsage().rss
        if (rss > watermark) {
            watermark = rss // 记录内存峰值
        }
    }, 50)

    input.on('end', () => {

        clearInterval(memoryCheck)

        const diff = process.hrtime(time) // 计算执行时间
        console.log([
            inSize, outSize, (diff[0] * 1e9 + diff[1]) / 1e6, watermark / 1024
        ].join(','))

    })

    input.pipe(gzip).pipe(output) // 读入文件经过压缩后，写入结果
    return input
}

console.log('file size, gzip size, ms, RSS')

let fileSize = 128
let zipSize = 5024

function run(times) {
    benchStream(fileSize, zipSize).on('end', () => {
        times--
        fileSize *= 2 // 每次执行完成后，扩大缓冲区
        zipSize *= 2

        if (times > 0) { // 递归调用
            run(times)
        }
    })
}

run(10)