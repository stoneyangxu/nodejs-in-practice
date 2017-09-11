const {Writable} = require('stream')

class CountStream extends Writable { // 继承可写入流

  constructor(matchText, options) {
    super(options)

    this.count = 0
    this.matcher = new RegExp(matchText, 'ig') // 创建一个忽略大小写的正则对象
  }

  _write(chunk, encoding, next) { // Node的Writable类会调用 _write 方法
    const matches = chunk.toString().match(this.matcher) // 把当前输入转换为字符串，并进行匹配

    if (matches) {
      this.count += matches.length
    }
    next()
  }

  end() { // 流结束时，Node的Writable会调用end方法
    this.emit('total', this.count) // 输入流结束时，出发total事件
  }

}

module.exports = CountStream
