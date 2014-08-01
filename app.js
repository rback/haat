var express = require("express"),
	jade = require("jade"),
	i18n = require("i18next"),
	logfmt = require("logfmt"),
	app = express(),
	passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy

var staticDir = process.env.NODE_ENV === "production" ? "/dist" : "/public"
var user = { id: 1, username: "cuicca", password: process.env.PASSWORD }

passport.use(new LocalStrategy(function(username, password, done) {
    if (password == user.password) {
    	return done(null, user)
    } else {
        logfmt.log({action: "login", success: false, password: password})
    	return done(null, false)
    }
}))

passport.serializeUser(function(user, done) { done(null, user.id) })
passport.deserializeUser(function(id, done) { done(null, user) })

function ensureAuthenticated(req, res, next) {
  if (process.env.NODE_ENV != "production" || req.isAuthenticated()) { return next() }
  var language = "fi"
  if (req.header("host") && req.header("host").indexOf("heidi-och-rasm.us") != -1) {
    language = "sv"
  }
  res.redirect("/" + language + '/login')
}

app.set("views", __dirname + "/views")
app.set("view engine", "jade")

i18n.init({
    lng: "fi",
    useCookie: true,
    detectLngFromHeaders: false,
    supportedLngs: ["fi", "sv"],
    preload: ["fi", "sv"],
    cookieName: "locale",
    fallbackLng: "fi",
    resGetPath: __dirname + "/locales/__lng__.json",
    detectLngFromPath: 0,
    debug: false
})
app.use(express.cookieParser('S3CRE7'))
app.use(express.cookieSession())
app.use(express.urlencoded())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + staticDir))
app.use(i18n.handle)
app.use(logfmt.requestLogger(function(req, res) {
    var format = logfmt.requestLogger.commonFormatter(req, res)
    format["user-agent"] = req.headers['user-agent']
    return format
}))

i18n.registerAppHelper(app)

app.get("/", ensureAuthenticated, function (req, res) {
	res.render("index", { pretty: true })
})

app.get("/:locale/login", function(req, res) {
	res.render("login", { pretty: true })
})

app.post("/login", passport.authenticate("local", { failureRedirect: "/", successRedirect: "/" }))

app.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/")
})

app.get("/locale/:locale", function (req, res) {
  res.cookie("locale", req.params.locale)
  res.redirect("/")
})

app.get("/seating", function(req,res) {
  res.render("seating", { pretty: true })
})

app.get("/foton", photosRedirect)
app.get("/kuvat", photosRedirect)
function photosRedirect(req,res) {
  res.redirect("https://www.flickr.com/gp/53542562@N06/4913J7")
}

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port)
})
