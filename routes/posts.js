var express = require('express');
var router = express.Router();
var Photo = require("../models/photo.js");

var limit = 10;

function slugify(title) {
  var slugged = title.replace(/[^a-zA-Z\d]/g, "-");
  slugged = slugged.replace(/-{2,}/g, "-");
  return slugged;
}

router.post('/', function(req, res, next) {
  var photo = new Photo(req.body);
  photo.slug = slugify(photo.title)
    photo.save(function(err, doc) {
    console.log("saved " + doc)
    res.send(doc)
  });
});

router.put("/:id", function(req, res, next) {

  Photo.update( { _id: req.params["id"] }, 
    {
      $set: {
        title: req.body["title"],
        image: req.body["image"],
        body: req.body["body"],
        tags: req.body["tags"]
      }
    }, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log("saved doc");
        console.log(doc)
        res.send(doc);
      }
  });
});

router.delete("/:id", function(req, res, next) {
  console.log("delete request")
  var id = req.params["id"];
  Photo.remove( { _id: id }, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted");
      console.log(doc);
      res.send(doc);
    }
  })
});

router.get("/:slug", function(req, res, next){
  var slug = req.params.slug ;
    Photo.findOne({slug: slug}).sort({"created_at": "desc" }).exec(function(err, doc) {
      res.send(doc);
    });
});

router.get("/", function(req, res, next){
  var skip = req.query.skip ? req.query.skip : 0,
      tag = req.query.tag;

  if (tag) {
    console.log("Got tag")
    console.log(tag)
    Photo.find({tags: {$in: [tag]}}).sort({"created_at": "desc" }).limit(limit).skip(skip).exec(function(err, docs) {
      res.send(docs);
    });
  } else {
    Photo.find({}).sort({"created_at": "desc" }).limit(limit).skip(skip).exec(function(err, docs) {
      res.send(docs);
    });
  }
});

module.exports = router;
