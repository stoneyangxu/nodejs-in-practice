#!/usr/bin/env node

const displayHelp = () => {
    console.log(`Argument processor: ${args}`)
}

const readFile = (file) => {
    console.log(`Reading ${file}`)
    require('fs').createReadStream(file).pipe(process.stdout)
}

const args = {
    '-h': displayHelp,
    '-r': readFile
}

if (process.argv.length > 0) {
    process.argv.forEach((arg, i) => {
        args[arg].apply(this, process.argv.slice(i + 1))
    })
}

