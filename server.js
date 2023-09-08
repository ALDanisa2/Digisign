const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '@neleD20010719',
  database: 'content_info',
});

app.post("/create", (req, res) => {
  
  const name = req.body.name;
  const text = req.body.text;
  const id = req.body.id;
  const Date = req.body.Date;
 
  

  db.query(
    "INSERT INTO image_upload (UserName, ImageName, Image_ID, Date) VALUES (?,?,?,?)",
    [name, text, id, Date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/upload", (req, res) => {
  console.log('inside');

  const imageData = req.body.imageData;
  const imageName  = req.body.imageName;

  // Save the image data to the "images" folder
  const imagePath = path.join(__dirname, '..', 'client/src/Images', imageName);
  console.log(imagePath);

  // Extract the base64 data from the image data
  const Extract_Data = imageData.replace(/^data:image\/\w+;base64,/, '');

  fs.writeFile(imagePath, Extract_Data, 'base64', (err) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
      } else {
          res.sendStatus(200);
      }
  });
});


//handle the image diplay
let uploadedImageName = ''; // Store the uploaded image name

app.post('/updateImage', (req, res) => {
  uploadedImageName = req.body.imageName;
  res.sendStatus(200);
});

app.get('/getImage', ( req, res) => {
  res.json({ imageName: uploadedImageName });
});

app.listen(3001, () => {
  console.log("your server is running on port 3001");
});
