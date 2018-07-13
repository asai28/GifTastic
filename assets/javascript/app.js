$(document).ready(function () {
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", 'ferret', "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
    animals.forEach(function (value) {
        renderButtons(value);
    });

    $(".btn-primary").on("click", function (e) {
        e.preventDefault();
        $("#displayGIF").empty();
        if (animals.indexOf($("#animalText").val()) === -1) {
            renderButtons($("#animalText").val());
        }
    });

    function renderButtons(buttonName) {

        if (buttonName !== "") {
            var newButton = $("<button>");
            newButton.attr("data-value", buttonName);
            newButton.addClass("btn btn-success");
            newButton.text(buttonName);
            animals.push(newButton);
            $("#buttonContainer").append(newButton);
            newButton.on("click", function () {
                var apikey = "VWuNi5tVha38LEi7NRZD21gojDjQ5wyQ";
                var limit = 10;
                var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + "&api_key=" + apikey + "&limit=" + limit;
                console.log(queryUrl);
                $.ajax({
                    url: queryUrl,
                    method: 'GET'
                }).then(function (response) {
                    $("#displayGIF").empty();
                    console.log(response);
                    for (var i = 0; i < response.data.length; ++i) {
                        //imageContainer contains the rating, favourite and gif
                        var imageContainer = $("<div>");
                        imageContainer.addClass("imageContainer");
                        //imageContainer has an attribute for example imageContainer#1
                        imageContainer.attr("id", "imageContainer" + i);
                        imageContainer.append("Rating: " + response.data[i].rating + " <i class=\"far fa-heart\"></i>" + " <br>");
                        var img = $("<img>");
                        //Code to pause and play GIFs
                        img.attr("image-still", response.data[i].images.fixed_height_still.url);
                        img.attr("image-moving", response.data[i].images.fixed_height.url);
                        img.attr("movement", "still");
                        img.attr("src", $(img).attr("image-still"));
                        img.attr("id", "image");
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
                    $("#displayGIF .fa-heart").on("click", function () {
                        console.log(this);
                        if ($(this).hasClass("far")) {
                            var imageContainerClone = $(this).parent().clone("withDataAndEvents", true);
                            imageContainerClone.find("i").remove();
                            $("#favourite").append(imageContainerClone);
                            $(this).removeClass("far");
                            $(this).addClass("fas");
                        }
                        else {
                            console.log(false);
                            $(this).removeClass("fas");
                            $(this).addClass("far");
                            var imageContainerID = $(this).parent().attr("id");
                            $("#favourite").find("#" + imageContainerID).remove();
                        }
                    });
                });
            });
        }
    }
});


