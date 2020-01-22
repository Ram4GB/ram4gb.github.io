const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb://${process.env.USERNAME_DATABASE}:${process.env.PASSWORD_DATABASE}@ds211709.mlab.com:11709/gallery`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const gallerySchema = mongoose.Schema({
  title: String,
  idImage: String
});

module.exports.galleryModel = mongoose.model("gallery", gallerySchema);
