/*
 * GET home page.
 */

var fs = require('fs');

exports.changeProfilePhoto = function(req,res) {
  fs.readFile(req.files.img.path, function (err, data) {
    var imageName = "profile.png";
    var newPath = __dirname + "/../public/images/" + imageName;

    console.log("Saving to " + newPath);
    fs.writeFile(newPath, data, function (err) {
      res.redirect("/images/" + imageName);
    });
  });
}

exports.view = function(req, res){
  res.render('index', { });
};

