require("dotenv").config();
const express       = require('express');
const path          = require("path")
const cors          = require('cors');
const compression   = require('compression')
const boom          = require('express-boom')
const logger        = require('morgan')
const bodyParser    = require('body-parser')
const app = express();

app.use(logger('dev'));
app.use(boom());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
    credentials: true
  }));
  app.use(bodyParser.json({limit: '100mb'}) );
  app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true,
  parameterLimit:50000
}));
app.use(compression({ level: 1 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// definet route
app.use(require("./app/routes"));
// server running
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));


module.exports = app;