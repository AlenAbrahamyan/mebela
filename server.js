const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var num = 10;
let port = process.env.PORT || 3000;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gevtest98@gmail.com',
    pass: 'gevor12gevor'
  }
});




const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use('/images', express.static('images'));
app.use('/css', express.static('css'));
app.use('/font', express.static('font'));
app.use('/fonts', express.static('fonts'));
app.use('/fancybox', express.static('fancybox'));
app.use('/jsfiles', express.static('jsfiles'));
app.use('/quiz', express.static('quiz'));
app.use('/img', express.static('img'));
app.use('/libs', express.static('libs'));

app.set('view engine', 'ejs');

var birthday = new Date();
var date1 = birthday.getDate();

app.get('/', (req, res) => {
    res.render('index', {tiv: date1});
});

app.post('/', urlencodedParser, (req, res) => {
    
  res.render('index', {data: req.body, tiv: date1});
 

  num++;

  var mailOptions = {
    from: 'gevtest98@gmail.com',
    to: 'alen.abrahamyan7@tumo.org',
    subject: 'Новые заказы '+num,
    html: '<h1>Новые заказы</h1><p>' + req.body.phone + '</p><p>' + req.body.item11 + '</p>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ');
    }
  
  });
  
});


app.get('/quiz', (req, res) => {
  res.render('quiz');
});


app.get('/test', (req, res) => {
  res.render('test', {tiv: date1, url_code: req.query});
  
});


app.post('/test', urlencodedParser, (req, res) => {
    
  res.render('test', {data: req.body, url_code: req.query});
  num++;


  var mailOptions = {
    from: 'gevtest98@gmail.com',
    to: 'alen.abrahamyan7@tumo.org',
    subject: 'Новые заказы '+num,
    html: '<h1>Новые заказы</h1><p>' + req.body.step1 + '</p><p>' + req.body.step2 + '</p><p>' + req.body.step3 + '</p><p>' + req.body.step4 + '</p><p>' + req.body.step5 + '</p><p>' + req.body.step6 + '</p><p>' + req.body.phone + '</p>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ');
    }
  
  });
 

});










app.listen(port);