const stream = require('stream')

class HungryStream extends stream.Duplex {

    constructor() {
        super()
        this.waiting = false
    }

    _write(chunk, encoding, callback) {
        process.stdout.write('u001b[32m' + chunk + 'u001b[39m')
        callback()
    }

    _read(size) {
        if (!this.waiting) {
            process.stdout.write('Feed me >')
            this.waiting = true
        }
    }
}

process.stdin.pipe(new HungryStream()).pipe(process.stdout)