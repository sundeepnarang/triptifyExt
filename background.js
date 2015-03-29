//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.

urlObject = window.location;
if(urlObject.host=="www.expedia.com"){
    switch (urlObject.pathname){
        case "/Hotel-Search":
            var urlData = {};
            var q = urlObject.hash.replace("#","").split("&");
            q.forEach(function(e,i){urlData[e.split("=")[0]] = e.split("=")[1]});
            //var hotelOptions=setHotelOption(urlObject.hash);
            $("body").livequery( ".hotelWrapper", function(elem){
                $(elem).find("article").prepend("<div class='triptify-plus')'>+</div>");
                $(elem).find("article").find(".triptify-plus").click(function(){
                    var hotelData= {};
                    var hoteldiv = $(this).parent();
                    hotelData.hotelId = hoteldiv.attr('data-hotelid');
                    hotelData.link = hoteldiv.find('.target').attr('href');
                    hotelData.picture = "http:" + hoteldiv.find('.target').find('.thumbnail').attr('data-image');
                    hotelData.name = hoteldiv.find('.target').find('span.hotelName').text();
                    hotelData.rating = hoteldiv.find('.target').find('li.starRating').find('.visuallyhidden').text();
                    hotelData.price = hoteldiv.find('.target').find('.infoCol').find('.actualPrice').text();
                    that = this;
                    chrome.storage.sync.get('id',function(data){
                        var form = {id:data.id,data:hotelData,urlData:urlData};
                        var xmlhttp=new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function()
                        {
                            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                            {

                                $(that).html("&#10004;");

                            }
                        };
                        xmlhttp.open("POST","http://triptify.co/saveh",true);
                        xmlhttp.setRequestHeader('Content-type', 'application/json');
                        form = JSON.stringify(form);
                        xmlhttp.send(form);
                    })
                })
            } );
            break;
        case "/Flights-Search":
            var urlData = {};
            var q = urlObject.href.replace(urlObject.origin+urlObject.pathname+"?","").split("&");
            q.forEach(function(e,i){urlData[e.split("=")[0]] = e.split("=")[1]});
            //var hotelOptions=setHotelOption(urlObject.hash);
            $("body").livequery( "li.segment.segment-result", function(elem){
                $(elem).find("article").prepend("<div class='triptify-plus-flight')'>+</div>");
                $(elem).find("article").find(".triptify-plus-flight").click(function(){
                    var flightData = {};
                    var flightdiv = $(this).parent();
                    flightData.airlineAb = flightdiv.parent().attr('data-filter-airline');
                    flightData.departure_time = flightdiv.find('.departure-time').text();
                    flightData.arrival_time = flightdiv.find('.arrival-time').text();
                    flightData.duration = flightdiv.find('.duration-emphasis').text();
                    flightData.price = flightdiv.find('.price-column').find('.dollars').text()
                        +flightdiv.find('.price-column').find('.cents').text();
                    flightData.picture = 'http:'+flightdiv.find('figure').find('img').attr("src");
                    that = this;
                    chrome.storage.sync.get('id',function(data){
                        var form = {id:data.id,data:flightData,urlData:urlData};
                        var xmlhttp=new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function()
                        {
                            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                            {

                                $(that).html("&#10004;");

                            }
                        };
                        xmlhttp.open("POST","http://triptify.co/savef",true);
                        xmlhttp.setRequestHeader('Content-type', 'application/json');
                        form = JSON.stringify(form);
                        xmlhttp.send(form);
                    })
                })
            } );
            break;
    }
}