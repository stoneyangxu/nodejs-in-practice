const dns = require('dns')

console.time('lookup')

dns.lookup('www.manning.com', (err, address) => {
    if (err) console.log(err)

    console.log(address)
    console.timeEnd('lookup')
})

console.time('resolve')
dns.resolve('www.manning.com', (err, address) => {
    if (err) console.log(err)

    console.log(address)
    console.timeEnd('resolve')
})