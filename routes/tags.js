var express = require('express');
var router = express.Router();
var Photo = require("../models/photo.js");

router.get("/", function(req, res, next){
  Photo.distinct("tags", function(err, doc){
    res.send(doc);
  })
});

router.get("/:tag_name", function(req, res, next) {
  var tag = req.params["tag_name"];
  Photo.find({tags: { $in: [tag]} }, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  })
})

module.exports = router;
