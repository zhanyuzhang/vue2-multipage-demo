var express = require('express'),
    router = express.Router();

var notfound = require('./mobile/notfound');

router.use('/notfound', notfound);


module.exports = router;