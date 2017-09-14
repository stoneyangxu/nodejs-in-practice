const fs = require('fs')

fs.readFile('./package.json', (error, buf) => {
    if (error) throw error

    const config = JSON.parse(buf.toString())

    console.log(config)
})

try {
    const config = JSON.parse(fs.readFileSync('./package.json'))
    console.log(config)
} catch (error) {
    console.error(error)
}