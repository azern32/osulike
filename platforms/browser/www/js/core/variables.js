// Variables
var global_offset = 0;      //Input calibration in milisecond
var global_margin = 60;     //in milisecond
var master_volume = 100;    // max scale 100
var music_volume = 100;     // max scale 100
var sfx_volume = 50;        // max scale 100
var play_video = false;
var dim_video = 0;          // max scale 100, 0 means 0 transparancy
var approach_rate = 8;      // max fixed 10
var window_width = 1360;
var window_height = 765;


// Main menu UI things
var selected_ratings,
    selected_diff,
    selected_art,
    selected_track
;

// Object Types
var ot_0,                   // tap
    ot_1,                   // slide
    ot_2,                   // hold
    ot_3                    // twin
;

// Non-interact Object Types
var nio_0,                  // approach
    nio_1                   // hold timer
;


// PIXI's variabels
const renderer = new PIXI.Renderer({
    antialias:true,
    width:window_width,
    height:window_height,
    backgroundColor:0xeeeeee,
})

var camera = new PIXI.Container()
var ticker = new PIXI.Ticker()



// Below this are quick functions 
// ===============================================

// Convert milisecond to second
function ms2s (x){  
    return x *1000;
}

// Convert second to milisecond
function s2ms (x){
    return x /1000;
}

// Scaling window
function window_scale(){
    let w = window.screen.availWidth / window_width;
    let h = window.screen.availHeight/ window_height;
    console.log(`scaling window w:${w} h:${h}`);
    return (Math.min(w,h));
}


// Show Debug
function debug_enabled(x){
    x? $('.debug').css('display','block') : $('.debug').css('display','none');
    return x;
}

function debugmsg(msg){
    $('.debug').append(`<p>${msg}</p>`)
}
window.onerror = function(msg, url, line){
    debugmsg(msg)
}

$('#debug_button').change(function(){
    debug_enabled($( "#debug_button" ).prop('checked'))
})