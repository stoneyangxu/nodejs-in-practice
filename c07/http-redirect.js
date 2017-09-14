const http = require('http')
const https = require('https')
const url = require('url')

let request

class Request {
    constructor() {
        this.maxRedirects = 10
        this.redirects = 0
    }

    get(href, callback) {
        const uri = url.parse(href)
        const options = {host: uri.host, path: uri.path}
        const httpGet = uri.prototype === 'http' ? http.get : https.get // 根据协议判断使用哪个方法

        console.log('GET: ' + href)

        const processResponse = (response) => {
            console.log(response)
            if (response.statusCode >= 300 && response.statusCode < 400) { // 如果是重定向请求
                if (this.redirects >= this.maxRedirects) {
                    this.error = new Error(`Too many redirects for ${href}`)
                } else {
                    this.redirects++ // 记录重定向次数
                    href = url.resolve(options.host, response.headers.location)

                    return this.get(href, callback) // 重定向时，递归调用
                }
            }

            // 非重定向请求时，记录请求信息
            response.url = href
            response.redirects = this.redirects

            console.log('Redirected: ', href) // 输出最终地址

            const end = () => {
                console.log('Connection ended')
                callback(this.error, response)
            }

            response.on('data', (data) => { // 获取真实数据
                console.log('Got data, length: ', data.length)
            })

            response.on('end', end.bind(this))
        }

        httpGet(options, processResponse.bind(this)).on('error', (err) => {
            callback(err)
        })
    }
}

request = new Request()
request.get('http://baidu.com/', (err, res) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Fetched URL: ', res.url, ' with ', res.redirects, ' redirects')
        process.exit(0)
    }
})