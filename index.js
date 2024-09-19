var express = require('express');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
require('dotenv').config()

var app = express();
var upload = multer({ dest: 'uploads/' }); // Temporary folder for uploads

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// API endpoint to handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
