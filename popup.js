/**
 * Created by Sundeep on 3/14/2015.
 */
$(function(){
    $( "form#triptify" ).submit(function( event ) {

        event.preventDefault();
        var form = $( this ).serialize();
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {

                chrome.storage.sync.set({'id': xmlhttp.responseText},function(){
                    $('#uid').append("<h1>Thanks!</h1>");
                });

            }
        };
        xmlhttp.open("POST","http://triptify.co/extLogin",true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xmlhttp.send(form);
    });
});