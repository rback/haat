(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48158060-1', 'heidi-ja-rasm.us');
ga('send', 'pageview');

window.onerror = function(message, url) {
  var message = 'Error: ' + message
    + '. URL: ' + url
    + '. User-agent: ' + navigator.userAgent
  ga('send', 'event', 'Exceptions', 'JS errors',  message);
};