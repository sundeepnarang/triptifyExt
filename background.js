//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
urlObject = window.location;
if(urlObject.host=="www.expedia.com"){
    switch (urlObject.pathname){
        case "/Hotel-Search":
            //var hotelOptions=setHotelOption(urlObject.hash);
            $("body").livequery( ".hotelWrapper", function(elem){
                $(elem).find("article").prepend("<div class='triptify-plus'>+</div>");
            } );
            break;
    }
}