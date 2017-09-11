const EventEmitter = require('events').EventEmitter

const complexOperation = () => {
    const events = new EventEmitter()

    process.nextTick(() => { // 异步触发
        events.emit('success')
    })

    return events
}

complexOperation().on('success', () => {
    console.log('success')
})