//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.

urlObject = window.location;
if(urlObject.host=="www.expedia.com"){
    switch (urlObject.pathname){
        case "/Hotel-Search":
            //var hotelOptions=setHotelOption(urlObject.hash);
            $("body").livequery( ".hotelWrapper", function(elem){
                $(elem).find("article").prepend("<div class='triptify-plus')'>+</div>");
                $(elem).find("article").find(".triptify-plus").click(function(){
                    var hotelData= {}
                    var hoteldiv = $(this).parent();
                    hotelData.hotelId = hoteldiv.attr('data-hotelid');
                    hotelData.link = hoteldiv.find('.target').attr('href');
                    hotelData.picture = "http:" + hoteldiv.find('.target').find('.thumbnail').attr('data-image');
                    hotelData.name = hoteldiv.find('.target').find('span.hotelName').text();
                    hotelData.rating = hoteldiv.find('.target').find('li.starRating').find('.visuallyhidden').text();
                    hotelData.price = hoteldiv.find('.target').find('.infoCol').find('.actualPrice').text();
                    that = this;
                    chrome.storage.sync.get('id',function(data){
                        var form = {id:data.id,data:hotelData};
                        var xmlhttp=new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function()
                        {
                            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                            {

                                $(that).html("&#10004;");

                            }
                        };
                        xmlhttp.open("POST","http://triptify.co:3000/save",true);
                        xmlhttp.setRequestHeader('Content-type', 'application/json');
                        form = JSON.stringify(form);
                        xmlhttp.send(form);
                    })
                })
            } );
            break;
    }
}