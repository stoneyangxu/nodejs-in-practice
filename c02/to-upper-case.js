
process.stdin.resume() // 通知stream准备读取数据
process.stdin.setEncoding('utf8') // 设置编码

process.stdin.on('data', (text) => { // 收到数据时
    process.stdout.write(text.toUpperCase()) // 转换为大写
})