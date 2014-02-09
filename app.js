var express = require("express"),
	jade = require("jade"),
	i18n = require("i18next"),
	logfmt = require("logfmt"),
	app = express(),
	passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy

var user = { id: 1, username: "cuicca", password: process.env.PASSWORD }

passport.use(new LocalStrategy(function(username, password, done) {
    if (password == user.password) {
    	console.log("PASSWORD: " + password + " is correct")
    	return done(null, user)
    } else {
    	console.log("PASSWORD: " + password + " is incorrect")
    	return done(null, false)
    }
}))

passport.serializeUser(function(user, done) { done(null, user.id) })
passport.deserializeUser(function(id, done) { done(null, user) })

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/login')
}

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

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: "lolbal" }));
	app.use(passport.initialize());
	app.use(passport.session());
  	app.use(i18n.handle)
	app.use(logfmt.requestLogger())
	app.use(express.static(__dirname + "/public"))
})
i18n.registerAppHelper(app)

app.get("/", ensureAuthenticated, function (req, res) {
	res.render("index", { pretty: true })
})

app.get("/login", function(req, res) {
	res.render("login", { pretty: true })
})

app.post("/login",
	passport.authenticate("local", {failureRedirect: "/login"}),
	function (req, res) {
	  res.redirect("/")
	}
)

app.get("/logout", function(req, res){
  req.logout()
  res.redirect("/")
})

app.get("/locale/:locale", function (req, res) {
  res.cookie("locale", req.params.locale)
  res.redirect("/")
})

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port)
})
