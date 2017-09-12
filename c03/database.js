const zlib = require('zlib')

const database = [[],[],[],[],[],[],[],[]]
const bitmasks = [1, 2, 4, 8, 16, 32, 64, 128]

function store(buf) {
    const db = buf[0]
    const key = buf.readUInt8(1)

    if (buf[2] === 0x78) { // 判读是否被压缩
        zlib.inflate(buf.slice(2), (error, inflatedBuf) => { // 解压缩
            if (error) return console.error(error)

            const data = inflatedBuf.toString()

            bitmasks.forEach((bitmask, index) => {
                if ((db & bitmask) === bitmask) {
                    database[index][key] = 'some data'
                    console.log(`stored at ${index} with key ${key}`)
                }
            })
        })
    }

}

const header = new Buffer(2)
header[0] = 8
header[1] = 0

zlib.deflate('my message', (error, deflateBuf) => {
    if (error) return console.error(error)

    const message = Buffer.concat([header, deflateBuf])

    store(message)
})