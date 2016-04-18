var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Foodie' });
});

router.get("/:user", function(req, res, next) {

  res.send("User is " + req.params.user)
});


module.exports = router;
