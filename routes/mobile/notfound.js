var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendfile('public/dev/mobile/page-notfound/index.html');
});

module.exports = router;