var express = require('express')
var app = express()
const mongoose = require('mongoose');
const bears = require('./routes/bears')


const bodyParser = require('body-parser')

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// API路由配置
var router = express.Router();              // 获得express router对象
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
})

// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', router)
app.use('/api', bears)

mongoose.connect('mongodb://localhost/bears');

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
