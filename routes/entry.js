var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  res.send({
      result: true,
      message: 'OK'
  });
});

module.exports = router;
