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

musicPlayer.on('error', (track) => { // 错误处理
    console.log(`play ${track}`)
})

musicPlayer.on('stop', () => { // 监听停止事件
    this.playing = false
    console.log('stop')
})

musicPlayer.emit('error', 'The Roots - The Fire') // 触发错误

setTimeout(() => {
    musicPlayer.emit('stop')
}, 1000)
