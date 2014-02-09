var express = require("express"),
	jade = require("jade"),
	i18n = require("i18next"),
	logfmt = require("logfmt"),
	app = express(),
	passport = require("passport"),
	BasicStrategy = require("passport-http").BasicStrategy

passport.use(new BasicStrategy({}, function(username, password, done) {
    if (password == process.env.PASSWORD) {
    	console.log("PASSWORD: " + password + " is correct")
    	return done(null, "cuicca")
    } else {
    	console.log("PASSWORD: " + password + " is incorrect")
    	return done(null, false)
    }
}))	

app.configure(function () {
	app.set("views", __dirname + "/views")
	app.set("view engine", "jade")

	i18n.init({
		lng: "fi",
		useCookie: true,
		detectLngFromHeaders: false,
		supportedLngs: ["fi", "se", "en"],
		cookieName: "locale",
		fallbackLng: "fi",
		resGetPath: __dirname + "/locales/__lng__.json",
		debug: false
	})

	app.use(express.cookieParser())
	app.use(passport.initialize())
	app.use(i18n.handle)
	app.use(logfmt.requestLogger())
	app.use(express.static(__dirname + "/public"))
})
i18n.registerAppHelper(app)

app.get("/",
	passport.authenticate("basic", { session: false }),
	function (req, res) {
		res.render("index", { pretty: true })
	}
)

app.get("/login", function(req, res) {
	res.render("")
})

app.get("/locale/:locale", function (req, res) {
  res.cookie("locale", req.params.locale)
  res.redirect("/")
})

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port)
})
