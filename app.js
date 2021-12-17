const env = require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3008

app.use(logger(process.env.LOG_LEVEL));
app.use(express.json()); // отправка json
app.use(express.urlencoded({ extended: false })); // для post получение body
app.use(express.static(path.join(__dirname, 'public'))); // для изображений и прочего говна
app.use(cors());

app.use('/api_form', require('./routers'));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {console.log('server started on http://' + process.env.DOMAIN + '.' + port + '/')});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use((req, res, next) => {next(createError(404));}); // catch 404 and forward to error handler

app.use((err, req, res, next) => {  // error handler
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
///////////////////////////////////////////////
module.exports = app;
