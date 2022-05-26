// Show Debug
function debug_enabled(x){
    x? $('.debug').css('display','block') : $('.debug').css('display','none');
    return x;
}

// Making a debug message
function debugmsg(msg){
    $('.debug-err').append(`<p>${msg}</p>`)
}

// Debug button
$('#debug_button').change(function(){
    debug_enabled($( "#debug_button" ).prop('checked'))
})


