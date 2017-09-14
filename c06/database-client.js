const Database = require('./database')
const client = new Database('./test.db')

client.on('load', () => {
    client.set('bar', 'my sweet value', (err) => {
        if (err) return console.error(err)

        console.log(client.get('bar'))
    })

    client.del('baz')
})