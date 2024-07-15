var express = require("express");
var app = express();
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='upload'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.end(form);

});

// Include the node file module
var fs = require('fs');

storage = multer.diskStorage({
    destination: __dirname+'\\uploads\\',
    filename: function(req, file, cb) {
      if(file){
        return crypto.pseudoRandomBytes(16, function(err, raw) {
          if (err) {
            return cb(err);
          }
          console.log(raw);
          return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
        });
      } else return null;
    }
  });


// Post files
app.post(
  "/upload",
  multer({
    storage: storage
  }).single('upload'), function(req, res) {
    if(req.file){
      console.log(req.file);
      console.log(req.body);
      res.redirect("/get/" + req.file.filename);
      console.log(req.file.filename);
    }
    return res.status(200).end();
  });

app.get('/get/:upload', function (req, res){
  file = req.params.upload;
  var img = fs.readFileSync(__dirname + "\\uploads\\" + file);
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');

});

app.get("/get_images", function(req,res){
  let i1 = fs.readFileSync(__dirname + "\\uploads\\" + "3deeaf1e704015533bf3a2fa4c445770.png"),
      i2 = fs.readFileSync(__dirname + "\\uploads\\" + "caf96777ec1be4e2c4b893e878541d53.png");
  
  res.end(JSON.stringify({images: [i1, i2]}));
});

app.listen(3000, () => {
    console.log("listening to port 3000");
});


