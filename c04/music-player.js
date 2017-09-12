const events = require('events')

class MusicPlayer { // 继承
    constructor() {
        this.playing = false
    }
}

const musicPlayer = new MusicPlayer()

Object.assign(musicPlayer, events.EventEmitter.prototype)

musicPlayer.on('play', (track) => { // 监听播放事件
    this.playing = true
})

musicPlayer.on('play', (track) => { // 使用多个监听器
    console.log(`play ${track}`)
})

musicPlayer.on('stop', () => { // 监听停止事件
    this.playing = false
    console.log('stop')
})

musicPlayer.emit('play', 'The Roots - The Fire')

setTimeout(() => {
    musicPlayer.emit('stop')
}, 1000)
//
// musicPlayer.removeAllListeners()
//
// function listener() {
// }
//
// musicPlayer.on('play', listener)
// musicPlayer.removeListener('play', listener)
//
