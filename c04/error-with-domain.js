
const events = require('events')
const domain = require('domain')

const audioDomain = domain.create() // 创建一个domain

class AudioDevice extends events.EventEmitter {

    play() {
        this.emit('error', 'not implemented yet')
    }
}

const audioDevice = new AudioDevice()
audioDevice.on('play', () => {
    audioDevice.play()
})

class MusicPlayer extends events.EventEmitter {

    constructor() {
        super()
        this.audioDevice = audioDevice
    }

    play() {
        this.audioDevice.emit('play')
    }
}


audioDomain.on('error', (err) => { // 捕获异常
    console.log('error')
})

audioDomain.run(() => { // domain之内执行的代码都会被捕获
    const musicPlayer = new MusicPlayer()
    musicPlayer.play()
})