const fs = require('fs')

const stream = fs.createReadStream('not-exist')

stream.on('error', (err) => {
    console.trace()
    console.error(err)
})