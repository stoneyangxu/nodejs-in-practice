const cp = require('child_process')

cp.execFile('echo', ['hello', 'world'], (err, stdout, stdin) => {
    if (err) console.error(err)
    console.log('stdout', stdout)
    console.log('stdin', stdin)
})