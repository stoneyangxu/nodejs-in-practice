#! /usr/bin/env node

process.on('message', (msg) => {

    let result = parseInt(msg)

    for (let i = 0; i < 1e10; i++) {
        result++
    }

    process.send(result)
})

