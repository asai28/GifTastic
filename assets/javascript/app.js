$(document).ready(function () {
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", 'ferret', "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
    animals.forEach(function(value, index){
        renderButtons(animals[index]);
    });
    $(".btn-primary").on("click", function (e) {
        e.preventDefault();
        $("#displayGIF").empty();
        renderButtons($("#animalText").val());
    });

    function renderButtons(buttonName) {
        if(buttonName !== ""){
            var newButton = $("<button>");
            newButton.attr("data-value", buttonName);
            newButton.addClass("btn btn-success");
            newButton.text(buttonName);
            $("#buttonContainer").append(newButton);
            newButton.on("click", function () {
                var apikey = "VWuNi5tVha38LEi7NRZD21gojDjQ5wyQ";
                //var limit = 5;
                var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + "&api_key=" + apikey; // + "&limit=" + limit
                console.log(queryUrl);
                $.ajax({
                    url: queryUrl,
                    method: 'GET'
                }).then(function (response) {
                    $("#displayGIF").empty();
                    for (var i = 0; i < response.data.length; ++i) {
                        var imageContainer = $("<div>");
                        imageContainer.attr("id","imageContainer");
                        imageContainer.append("Rating: " + response.data[i].rating+"<br>");
                        var img = $("<img>");
                        img.attr("image-still", response.data[i].images.fixed_height_still.url);
                        img.attr("image-moving", response.data[i].images.fixed_height.url);
                        img.attr("movement", "still");
                        img.attr("src", $(img).attr("image-still"));
                        img.attr("id","image");
                        img.on("click", function () {
                            var state = $(this).attr("movement");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("image-moving"));
                                $(this).attr("movement", "moving");
                            }
                            else {
                                $(this).attr("src", $(this).attr("image-still"));
                                $(this).attr("movement", "still");
                            }
                        });
                        imageContainer.append(img);
                        $("#displayGIF").append(imageContainer);
                    }
                });
            });
        }
    }
});