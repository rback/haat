$(function() {
	var menu = $(".language")
	var dropdown = menu.find(".dropdown")
	menu.click(function() {
		dropdown.toggleClass("expanded")
	})
	dropdown.click(function(event) {
		window.location = "locale/" + $(event.target).data("language")
	})
})