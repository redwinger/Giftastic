$(document).ready(function(){


	var topics = ["chicken parm", "steak", "cheeseburger", "tacos", "nachos", "grilled cheese", "cheesesteak", "carnitas", "mac and cheese", "salmon fillets", "mashed potatoes"];

	function createButtons() {
		
		$("#buttonDisplay").empty();

		for (var i = 0; i < topics.length; i++) {

			var button = $("<button>");

			button.addClass(".buttonDesign");
			button.attr("data-name", topics[i]);
			button.text(topics[i]);
			$("#buttonDisplay").append(button);

		}
	};
	createButtons();

	$("button").on("click", function() {

		var term = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		        term + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {

			console.log(response.data);
		});

	



	});
















});