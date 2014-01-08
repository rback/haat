var express = require('express');
var jade = require('jade');
var i18n = require("i18next");
var logfmt = require("logfmt");
var app = express();

app.configure(function () {
	app.set('views', __dirname + "/views");
	app.set('view engine', 'jade');

	i18n.init({
		lng: "fi",
		useCookie: true,
		detectLngFromHeaders: false,
		supportedLngs: ['fi', 'se', 'en'],
		cookieName: 'locale',
		fallbackLng: 'fi',
		resGetPath: __dirname + '/locales/__lng__.json',
		debug: true
	});

	app.use(express.cookieParser());
	app.use(i18n.handle);
	app.use(logfmt.requestLogger());
	app.use(express.static(__dirname + '/public'));
});
i18n.registerAppHelper(app)

app.get('/', function (req, res) {
	res.render('index',	{ pretty: true })
});

app.get('/:locale', function (req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect("/");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
