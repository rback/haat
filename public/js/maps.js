var showMap;

$(function() {
    var locations = {
        johanneksenkirkko: {
            center: new google.maps.LatLng(60.16184, 24.945013),
            icon: "/img/rings.png"
        },
        g18: {
            center: new google.maps.LatLng(60.165733, 24.941905),
            icon: "/img/party.png"
        },
        radisson: {
            center: new google.maps.LatLng(60.161628, 24.924819),
            icon: "/img/hotel.png"
        },
        glo: {
            center: new google.maps.LatLng(60.164222, 24.932082),
            icon: "/img/hotel.png"
        }
    }

    showMap = function showMap(location) {
        var mapElement = $("#map-" + location)
        var center = locations[location].center
        mapElement.find('i').click(function(event) {
            mapElement.fadeOut()
        })
        mapElement.fadeIn()
        var map = new google.maps.Map(mapElement.find('.google-maps')[0], {
            center: center,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        })
        var image = {
            url: locations[location].icon,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(30, 83)
        };
        var marker = new google.maps.Marker({
            position: center,
            map: map,
            icon: image
        });
    }

	$('#navigation').localScroll();
})
