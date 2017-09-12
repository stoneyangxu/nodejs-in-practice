const fs = require('fs')

const mine = 'image/png'
const encoding = 'base64'


const data = fs.readFileSync('./images.png').toString(encoding)

const uri = `data:${mine};${encoding},${data}`

console.log(uri)
