const cp = require('child_process')

const stdout = cp.execFileSync('echo', ['hello']).toString()
console.log(stdout)

const ps = cp.spawnSync('ps', ['aux'])
const grep = cp.spawnSync('grep', ['node'], {
    input: ps.stdout,
    encoding: 'utf8',
})

console.log(grep)

const execSyncOut = cp.execSync('ps aux | grep node').toString()
console.log(execSyncOut)


try {
    cp.execFileSync('cat', ['not-exist-file']).toString()
} catch (e) {
    console.error(e.status)
    console.error(e.stderr)
}