const express = require('express')
const Bear = require('../model/bears')

const router = express.Router()

// middleware that is specific to this routes
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.route('/bears')
    .post((req, res) => {
        const bear = new Bear();      // 创建一个Bear model的实例
        bear.name = req.body.name;  // 从request取出name参数的值然后设置bear的name字段

        console.log(bear.name)

        // 保存bear，加入错误处理，即把错误作为响应返回
        bear.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })
    .get((req, res) => {
        Bear.find(function(err, bears) {
            if (err) res.send(err);

            res.json(bears);
        });
    });


router.route('/bears/:bear_id')
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) res.send(err);
            res.json(bear);
        });
    })
    .put((req, res) => {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) res.send(err);
            
            bear.name = req.body.name
            
            bear.save((err) => {
                if (err) res(err)
                res.json({ message: 'Bear updated!' });
            })
        });

    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router