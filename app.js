const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const app = express();
const Handlebars = require('handlebars')
const moment= require('moment')
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://muhammedsoubanbi:mzee@souban.rmwzbs7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('./config/session');

app.use(session)
const nocache = require("nocache");
app.use(nocache());

var DateFormats = {
  short: "DD MMMM - YYYY",
  long: "dddd DD.MM.YYYY HH:mm"
};
Handlebars.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'adminLayout', 
  layoutsDir: __dirname + '/views/admin',
  adminDir: __dirname + '/views/admin/'
}))


//for user routes
const userRoute = require('./routes/user')
app.use('/', userRoute)

//for admin routes
const adminRoute = require('./routes/admin');
const { registerHelper, handlebars } = require('hbs');
app.use('/admin', adminRoute);

app.listen(8080, function () {
  console.log('Server is running...');
});

app.use(function(req, res, next) {
  res.status(404).render('404');
});