!function(e,n,t,a,r,o,s){e.GoogleAnalyticsObject=r,e[r]=e[r]||function(){(e[r].q=e[r].q||[]).push(arguments)},e[r].l=1*new Date,o=n.createElement(t),s=n.getElementsByTagName(t)[0],o.async=1,o.src=a,s.parentNode.insertBefore(o,s)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-48158060-1","auto"),ga("send","pageview"),window.onerror=function(e,n){var e="Error: "+e+". URL: "+n+". User-agent: "+navigator.userAgent;ga("send","event","Exceptions","JS errors",e)};

$(function(){var n=$(".language"),a=n.find(".dropdown");n.click(function(){a.toggleClass("expanded")}),a.click(function(n){window.location="locale/"+$(n.target).data("language")})});
$(function(){$(".loginbutton").click(function(){$("form").submit()})});
var showMap;$(function(){var n={johanneksenkirkko:{center:new google.maps.LatLng(60.16184,24.945013),icon:"/img/rings.png"},g18:{center:new google.maps.LatLng(60.165733,24.941905),icon:"/img/party.png"},radisson:{center:new google.maps.LatLng(60.161628,24.924819),icon:"/img/hotel.png"},glo:{center:new google.maps.LatLng(60.164222,24.932082),icon:"/img/hotel.png"}};showMap=function(o){var e=$("#map-"+o),g=n[o].center;e.find("i").click(function(){e.fadeOut()}),e.fadeIn();{var a=new google.maps.Map(e.find(".google-maps")[0],{center:g,zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP}),i={url:n[o].icon,origin:new google.maps.Point(0,0),anchor:new google.maps.Point(30,83)};new google.maps.Marker({position:g,map:a,icon:i})}},$("#navigation").localScroll()});
var popup;$(function(){popup=function(n,c){n.click(function(){c.fadeIn()}),c.find("i").click(function(){c.fadeOut()})}});