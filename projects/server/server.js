const path = require('path');
const express = require('express');
const compression = require('compression');
const config = require('./src/config/config');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');

const CONTEXT = `/${process.env.CONTEXT || 'angular-ngrx-material-starter'}`;
const PORT = process.env.PORT || 4000;

const app = express();

app.use(compression());
app.use(
  CONTEXT,
  express.static(
    path.resolve(__dirname, '../../dist/angular-ngrx-material-starter')
  )
);
app.use(
  '/',
  express.static(
    path.resolve(__dirname, '../../dist/angular-ngrx-material-starter')
  )
);
app.use(logger('dev'));

const passportMiddleware = require('./src/middleware/passport');
passport.use(passportMiddleware);

const api = require('./src/routes/api');
app.use('/api', api);

app.listen(PORT, () =>
  console.log(`App running on http://localhost:${PORT}${CONTEXT}`)
);

// DB connection
let mongoUri = config.mongoUri;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

connection.on('error', (err) => {
  console.log(
    'MongoDb connection error. Please make sure MongoDB is running. ' + err
  );
  process.exit();
});
