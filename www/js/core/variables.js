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
var to_render     // Containers that act as a page


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

// Global PIXI Settings
PIXI.settings.RENDER_OPTIONS.antialias = true
PIXI.settings.ROUND_PIXELS = true


// PIXI's variabels
const renderer = new PIXI.Renderer({
    antialias:true,
    width:window_width,
    height:window_height,
    backgroundColor:0xeeeeee,
})

var gameplay = new PIXI.Container()
    gameplay.name = 'gameplay'

var mainmenu = new PIXI.Container()
    mainmenu.name = 'mainmenu'

var pause = new PIXI.Container()
    pause.name = 'pause'

var settings = new PIXI.Container()
    settings.name = 'settings'

var calibration = new PIXI.Container()
    calibration.name = 'calibration'

var account = new PIXI.Container()
    account.name = 'account'


var ticker = new PIXI.Ticker()

// Below this are quick functions 
// ===============================================

// Convert sizes in bytes
function formatBytes(a,b=2,k=1024){with(Math){let d=floor(log(a)/log(k));return 0==a?"0 Bytes":parseFloat((a/pow(k,d)).toFixed(max(0,b)))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}}

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


