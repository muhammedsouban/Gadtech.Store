const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://muhammedsoubanbi:mzee@souban.rmwzbs7.mongodb.net/?retryWrites=true&w=majority4qx', { useNewUrlParser: true });

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('./config/session');

app.use(session)
const nocache = require("nocache");
app.use(nocache());

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
app.use('/admin', adminRoute);

app.listen(3000, function () {
  console.log('Server is running...');
});
