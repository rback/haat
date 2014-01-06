var express = require('express');
var exphbs  = require('express3-handlebars');
var i18n = require('i18n');
var logfmt = require("logfmt");
var app = express();


app.configure(function () {
	app.engine('.hbs', exphbs({
		defaultLayout: 'default',
		extname: '.hbs'
	}));
	app.set('views', "" + __dirname + "/views");
	app.set('view engine', '.hbs');

	i18n.configure({
		locales: ['en', 'fi', 'se'],
		cookie: 'locale',
		updateFiles: false,
		defaultLocale: 'fi',
		directory: "" + __dirname + "/locales"
	});

	app.use(express.cookieParser());
	app.use(i18n.init);
	app.use(logfmt.requestLogger());
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
    res.render('main', {
    	helpers: {
            __: function (key) { return res.__(key); }
        }
    });
});

app.get('/:locale', function (req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect("/");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
