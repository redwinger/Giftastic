$(document).ready(function(){

	//
	var topics = ["chicken parm", "steak", "ice cream", "tacos", "nachos", "grilled cheese", "cheesesteak", "carnitas", "mac and cheese", "salmon", "mashed potatoes"];

	function createButtons() {
		
		$("#buttonDisplay").empty();

		for (var i = 0; i < topics.length; i++) {

			var button = $("<button>");

			button.addClass("buttonDesign");
			button.attr("data-name", topics[i]);
			button.text(topics[i]);
			$("#buttonDisplay").append(button);

		}
	};

	//Calling the functon to creat buttons
	createButtons();

	$("#add-food").on("click", function(event) {

		event.preventDefault();

		var food = $("#food-input").val().trim();

		topics.push(food);

		createButtons();
	});



	//	Doing the ajax search when the button is clicked on and assigning the attributes neccessary
	//	to do the animation process
	function ajaxCall () {

		$("#gifDisplay").empty();

		var term = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		        term + "&api_key=dc6zaTOxFJmzC&limit=10";
		       
		        

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {

			var result = response.data;

				for (var i = 0; i < result.length; i++) {

					var gifRating = result[i].rating;

					var ratingText = $("<p>").text("Rating: " + gifRating);

					var GIFimage = $("<img>");
					
					GIFimage.attr("src", result[i].images.fixed_height_still.url);
					GIFimage.attr("data-still", result[i].images.fixed_height_still.url);
					GIFimage.attr("data-animate", result[i].images.fixed_height.url);
					GIFimage.attr("data-state", "still");
					GIFimage.addClass("clickableImage");
					$("#gifDisplay").append(GIFimage);
					$("#gifDisplay").append(ratingText);
				};


			$("img").on("click", function() {
		        
		        var state = $(this).attr("data-state");

		        if (state === "still") {
		          $(this).attr("src", $(this).attr("data-animate"))
		          $(this).attr("data-state", "animate")
		        }

		        else {
		          $(this).attr("src", $(this).attr("data-still"))
		          $(this).attr("data-state", "still")
		        }

			});
		});	
	};

	$(document).on("click", ".buttonDesign", ajaxCall);


	// tried to make a random food gif appear when the random button was clicked but ran into isses

	$("#random").on("click", function(event) {


		var queryRandomURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=junk food";

		$.ajax({

			url: queryRandomURL,
			method: "GET"	
		})
		.done(function(response){

		

			var randomFood = $("<img>");

			randomFood.attr("src", response.data.images.fixed_height.url);
			$("#gifDisplay").prepend(randomFood);
			
		});


	});
});

