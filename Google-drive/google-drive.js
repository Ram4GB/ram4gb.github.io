const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const stream = require("stream");
const { galleryModel } = require("./db.model");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const TOKEN_PATH = "token.json";

module.exports.authorize = callback => {
  let buffer = fs.readFileSync("credentials.json");
  const credentials = JSON.parse(buffer);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
};

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

module.exports.listFiles = (auth, folderId, pageSize, q, res) => {
  const drive = google.drive({ version: "v3", auth });
  drive.files.list(
    {
      pageSize: pageSize ? pageSize : 10,
      fields: "nextPageToken, files(id, name)",
      folderId,
      q: q ? q : null
    },
    (err, result) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = result.data.files;
      if (files.length) {
        res.status(200).send(files);
      } else {
        res.status(200).send([]);
      }
    }
  );
};

module.exports.uploadDrive = (auth, file, title, folderId, res) => {
  const drive = google.drive({ version: "v3", auth });
  let bufferStream = new stream.PassThrough();
  bufferStream.end(file.data);
  var fileMetadata = {
    name: file.name
  };
  if (folderId) fileMetadata.parents = [...folderId];
  var media = {
    body: bufferStream,
    mimeType: file.mimetype
  };

  drive.files.create(
    {
      media: media,
      resource: fileMetadata,
      fields: "id"
    },
    function(err, file) {
      if (err) return res.send(err);
      galleryModel.create(
        {
          title,
          idImage: file.data.id
        },
        (error, doc) => {
          if (err) return res.status(400).send({ success: false, error });
          return res.status(200).send(doc);
        }
      );
    }
  );
};
