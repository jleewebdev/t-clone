var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Foodie' });
});

router.get("/new", function(req, res, next) {
  res.send("create new board")
});


module.exports = router;
