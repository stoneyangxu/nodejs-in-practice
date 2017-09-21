var express = require('express');
var birds = require('./birds')
var nconf = require('nconf')

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World! Reload');
});
//
// if (app.get('env') === 'development') {
//     // ...
// } else {
//     // ...
// }

nconf.argv().env().file({file: 'config.json'})




app.use('/birds', birds);


app.listen(nconf.get('port'), function () {
    console.log('Example app listening on port 3000!');
});