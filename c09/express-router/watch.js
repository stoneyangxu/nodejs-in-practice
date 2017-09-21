const fs = require('fs')
const exec = require('child_process').exec

function watch() {
    const child = exec('node index.js')
    const watcher = fs.watch(__dirname + '/index.js', function(event) {
        console.log('file changed, reloading')
        child.kill()
        watcher.close()
        watch()
    })
}

watch()