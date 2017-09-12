const fs = require('fs')

fs.readFile('./world.dbf', (error, buffer) => {
    const header = {}

    const date = new Date()
    date.setUTCFullYear(buffer[1])
    date.setUTCMonth(buffer[2])
    date.setUTCDate(buffer[3])

    header.lastUpdated = date.toUTCString()

    header.totalRecords = buffer.readUInt32LE(4)
    header.bytesInHeader = buffer.readUInt16LE(8)
    header.bytesPerRecord = buffer.readUInt16LE(10)


    const fields = []
    let fieldOffset = 32
    const fieldLength = 32
    const fieldTerminator = 0x0D

    const FIELD_TYPES = {
        C: 'Character',
        N: 'Numeric'
    }

    while(buffer[fieldOffset] !== fieldTerminator) {
        const fieldBuf = buffer.slice(fieldOffset, fieldOffset + fieldLength) // 只是快照，并非拷贝

        const field = {
            name: fieldBuf.toString('ascii', 0, 11).replace(/\u0000/, ''),
            type: FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)],
            length: fieldBuf[16]
        }

        fields.push(field)

        fieldOffset += fieldLength
    }

    console.log(header)
    console.log(fields)
})