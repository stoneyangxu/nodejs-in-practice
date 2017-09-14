const stream = require('stream')

class GreenStream extends stream.Writable {
    _write(chunk, encoding, callback) {
        process.stdout.write('u001b[32m' + chunk + 'u001b[39m')
        callback()
    }
}

process.stdin.pipe(new GreenStream())