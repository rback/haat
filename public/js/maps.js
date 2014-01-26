var showMap;

$(function() {
    var locations = {
        johanneksenkirkko: new google.maps.LatLng(60.162319, 24.945177),
        g18: new google.maps.LatLng(60.165543, 24.942108),
        hotels: new google.maps.LatLng(60.164486,24.933901)
    }

    showMap = function showMap(location) {
        var mapElement = $("#map-" + location)
        mapElement.find('i').click(function(event) {
            mapElement.hide()
        })
        mapElement.show()
        var map = new google.maps.Map(mapElement.find('.google-maps')[0], {
            center: locations[location],
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        })
    }

	$('#navigation').localScroll();
})
