const cp = require('child_process')

cp.execFile('ls', ['file-not-exist'], (err, stdout, stdin) => {
    if (err) console.error(err)
    console.log('stdout', stdout)
    console.log('stdin', stdin)
})