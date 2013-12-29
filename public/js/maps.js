$(function(){
	new google.maps.Map($('#map-johanneksenkirkko')[0], {
		center: new google.maps.LatLng(60.162319, 24.945177),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	})

	new google.maps.Map($('#map-g18')[0], {
		center: new google.maps.LatLng(60.165543, 24.942108),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	})
	new google.maps.Map($('#map-hotels')[0], {
		center: new google.maps.LatLng(60.164486,24.933901),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	})
	$('#navigation').localScroll();
})
