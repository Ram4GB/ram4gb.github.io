const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const drive = require("./google-drive");
const { galleryModel } = require("./db.model");

const folderId = "1zvI6i0X44yz71RjOSSLoMOBtZU9TF96B";
const memtypeAccept = "mimeType='image/jpeg' or mimeType='image/png'";
require("dotenv").config();

app.use(expressFileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/upload", (req, res) => {
  res.sendStatus(200);
});

app.post("/upload", (req, res) => {
  try {
    if (!req.body.title)
      return res.status(400).send({ error: "Missing title", success: false });
    if (!req.files)
      return res.status(400).send({ error: "Missing file", success: false });
    const { title } = req.body;
    const { document } = req.files;
    drive.authorize(auth =>
      drive.uploadDrive(auth, document, title, [folderId], res)
    );
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

app.get("/lists-in-google-drive", (req, res) => {
  drive.authorize(auth =>
    drive.listFiles(auth, folderId, null, memtypeAccept, res)
  );
});

app.get("/list-images", async (req, res) => {
  console.log(req.query);
  let { limit, page } = req.query;

  limit = parseInt(limit);
  page = parseInt(page);

  const count = await galleryModel.find({}).exec();

  if (
    limit >= 0 &&
    page >= 0 &&
    Number.isInteger(limit) &&
    Number.isInteger(page)
  ) {
    galleryModel
      .find({})
      .skip(page * limit)
      .limit(limit)
      .exec(function(err, doc) {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(200).send({
          data: doc,
          count: count.length
        });
      });
    return;
  }

  galleryModel.find({}, (err, value) => {
    if (err) return res.send(err);
    return res.status(200).send({ data: value, count: count.length });
  });
});

app.listen(port, () => {
  console.log(`Server open port ${port}`);
});
