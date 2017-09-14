const {findSync, find} = require('./file-finder')

const path = '/Users/yangxu/Documents/projects/demo/nodejs-in-practice/'

try {
    console.time('sync')
    const results = findSync(/^package.json$/, path)
    console.log(results)
    console.timeEnd('sync')
} catch (err) {
    console.error(err)
}

console.time('async')
const result = find(/^package.json$/, path, (err, results) => {
    if (err) console.error(err)

    console.log(results)
    console.timeEnd('async')
})

