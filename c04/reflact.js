const events = require('events')

class MusicPlayer extends events.EventEmitter {
    constructor() {
        super()
        this.playing = false
    }
}

const musicPlayer = new MusicPlayer()


musicPlayer.on('newListener', (name, listener) => { // 监听`监听`事件
    console.log(name, listener)
})

musicPlayer.on('play', (track) => { // 监听播放事件
    this.playing = true
})
