var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cart', function(request, response) {
  response.render('pages/index');
});

//these are used to get the data that is posted to sendmail
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/sendmail', function(req, res) {

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'greystonepieces@gmail.com',
	        pass: '------'
	    }
	});
	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	   from: req.body.name, // sender address
	   to: 'greystonepieces@gmail.com', // list of receivers
	   subject: 'Message from shop', // Subject line
	   text: req.body.message, // plaintext body
	   html: '<b> Message from : ' + req.body.name +'</b>\n\n<b> Email address : '+ req.body.email +'</b>\n\n<b> Message'+ req.body.message +'</b>\n\n<b> Phone Number : '+ req.body.phone +'</b>' // html body
	};

	// // send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	res.end('{"error" : "Message Failed to Send"}');
	        return console.log(error);
	    }else{
	    	res.end('{"success" : "Message Sent", "status" : 200}');
	    	console.log('Message sent: ' + info.response);
	    }	    

	});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


