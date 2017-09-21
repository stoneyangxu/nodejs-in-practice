const cheerio = require('cheerio')
const http = require('http')

http.get('http://nodejs.org/en/', function (res) {
    const $ = cheerio.load(res)

    $('li').each(function (li) {
        console.log(li.text())
    })
})

