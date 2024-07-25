const express = require('express');
const app = express();
const fileRoutes = require('./routes/fileRoute');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

// Middleware pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS , PATCH");
  next();
});

// Router
app.get('/', (req, res) => {
  res.send('Ca marche!! Yess!!!');
});

app.use('/files', fileRoutes);

const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
