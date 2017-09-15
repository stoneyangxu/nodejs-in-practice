const cp = require('child_process')
const fs = require('fs')

const outFd = fs.openSync('./longrun.out', 'a')
const errFd = fs.openSync('./longrun.err', 'a')

const child = cp.spawn('./longrun', [], {
    detached: true,
    stdio: ['ignore', outFd, errFd],
})