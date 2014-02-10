var popup
$(function() {
	popup = function(link, element) {
		link.click(function() {
			element.fadeIn()
		})
		element.find('i').click(function() {
			element.fadeOut()
		})
	}
})