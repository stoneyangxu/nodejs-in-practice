
const monitor = () => {
    console.log(process.memoryUsage())
}

const id = setInterval(monitor, 1000)
id.unref() // 告知node停止计时器

setTimeout(() => {
    console.log('Done')
}, 5000)