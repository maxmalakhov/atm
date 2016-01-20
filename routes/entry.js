var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
    var number = req.param('number');
    var code = req.param('code');

    res.send({
      result: true,
      message: number
  });
});

module.exports = router;
