const env = require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
const favicon = require("serve-favicon")
const app = express()
const port = process.env.PORT || 3010

app.use(favicon(path.join(__dirname, 'public', 'bmstu.png')))
app.use(logger(process.env.LOG_LEVEL));
app.use(express.json()); // отправка json
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api_form', require('./routers'));
app.get('/', (req, res) =>  res.send("всё хорошо"))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {console.log('server started on http://' + process.env.DOMAIN + ':' + port + '/')});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) =>  res.send("всё хорошо"))
app.use((req, res, next) => {next(createError(404));}); // catch 404 and forward to error handler

// app.use((err, req, res, next) => {  // error handler
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
///////////////////////////////////////////////
module.exports = app;
