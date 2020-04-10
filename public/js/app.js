
//Script for sadding comment
$("#push-comment").on("click", function(event) {
    event.preventDefault();
    console.log("Comment submit button pressed");
    let _id = $("#push-comment").attr("data-id");
    let comment = $("#comment-input").val().trim();

    //If comment field blank
    if (comment === ""){
        console.log("Error: Must enter something in comment field");
    } else {
        //otherwise add to db
        data = { //This sends the data from the fields to the server
        _id: _id,
        comment: comment
        }
        console.log(data);

        // Send the POST request.
        $.ajax("/articles/comment", {
            type: "POST",
            data: data
        }).then(
        function(req) {     
        });
        setTimeout(function() { //In 3 sec, go to post
            //console.log("Countdown fired");
            window.location.reload();
        }, 1000);
    };
});

//Script for deleting comment
$(".delete-comment").on("click", function(event) {
    event.preventDefault();
    console.log("Comment delete button pressed");
    let index = $(this).attr("data-id");
    let comment = $(this).attr("data-comment");
    let _id = $("#push-comment").attr("data-id");

    //otherwise add to db
    data = { //This sends the data from the fields to the server
    _id: _id,
    comment: comment
    }
    //console.log(data);

    // Send the POST request.
    $.ajax("/articles/comment/delete", {
        type: "POST",
        data: data
    }).then(
    function(req) {     
    });
    setTimeout(function() { //In 3 sec, go to post
    //console.log("Countdown fired");
    window.location.reload();
    }, 1000);
});

let dark = false;
//Function to make page dark mode
$(document).on("click", ".toggle-dark", function(event) {
    event.preventDefault();

    //If dark mode is off, change elems to turn it on
    if (dark === false) {
        $('.main-text').css({"color": "white"});
        $('body').css({"background": "url('/images/webb-dark.png')"});
        $('html').css({"background": "url('/images/webb-dark.png')"});
        $('.card').css({
            "background-color": "#333333",
            "color": "#FFFFFF"
        });
        dark = true;
        return;
    }
    //If dark mode is on, change elems to turn it off
    if (dark === true){
        $('.main-text').css({"color": "black"});
        $('body').css({"background": "url('/images/webb.png')"});
        $('html').css({"background": "url('/images/webb.png')"});
        $('.card').css({
            "background-color": "white",
            "color": "black"
        });
        dark = false;
        return;
    }
});