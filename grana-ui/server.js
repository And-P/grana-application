const express = require('express');

const app = express();
const projectName = 'grana-ui'

app.use(express.static(__dirname + '/dist/' + projectName));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/' + projectName + '/index.html');
});

app.listen(process.env.PORT || 8000);

// add as tags no package.json <script> para fazer deploy no Heroku
// "start": "node server.js",
// "heroku-postbuild": "ng build --configuration=production"
// "postinstall": "ng build --prod"