// Variables
var global_offset = 0;      //Input calibration in milisecond
var global_margin = 250;     //in milisecond
var master_volume = 20;    // max scale 100
var music_volume = 100;     // max scale 100
var sfx_volume = 50;        // max scale 100
var play_video = false;
var dim_video = 0;          // max scale 100, 0 means 0 transparancy
var approach_rate = 8;      // max fixed 10
var visibility_range = 300  // in miliseconds
var window_width = 1360;
var window_height = 765;
var perf2 = 0
var perf1 = 0
var to_render     // Containers that act as a page
var current_bpm = 160
var timekeeper = new AudioContext()
    if (timekeeper.state == "suspended") {
      timekeeper.resume()
    }
var debug_message = ''

// Main menu UI things
var selected_ratings,
    selected_diff,
    selected_art,
    selected_track
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

    var gameplay_field = new PIXI.Container()
        gameplay_field.name = 'gameplay_field'
        gameplay_field.x = window.screen.width/2
        gameplay_field.y = window.screen.height * 48/100

    var gameplay_approachField = new PIXI.Container()
        gameplay_approachField.name = 'gameplay_approachField'
        gameplay_approachField.x = window.screen.width/2
        gameplay_approachField.y = window.screen.height * 48/100

    var gameplay_slideField = new PIXI.Container()
        gameplay_slideField.name = 'gameplay_slideField'
        gameplay_slideField.x = window.screen.width/2
        gameplay_slideField.y = window.screen.height * 48/100

    var gameplay_timerField = new PIXI.Container()
        gameplay_timerField.name = 'gameplay_timerField'
        gameplay_timerField.x = window.screen.width/2
        gameplay_timerField.y = window.screen.height * 48/100


var mainmenu = new PIXI.Container()
    mainmenu.name = 'mainmenu'

var pause = new PIXI.Container()
    pause.name = 'pause'

var settings = new PIXI.Container()
    settings.name = 'settings'

var calibration = new PIXI.Container()
    calibration.name = 'calibration'
    var calibration_field = new PIXI.Container()
        calibration_field.name = 'calibration_field'
        calibration_field.x = window.screen.width/2
        calibration_field.y = window.screen.height * 48/100

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

// BPM to seconds
function deltaHit(bpm){
    return 60/bpm
}

// This should make tick sound every beat per minute
function metronome(bpm){

}

// Scaling window
function window_scale(){
    let w = window.screen.availWidth / window_width;
    let h = window.screen.availHeight/ window_height;
    // console.log(`scaling window w:${w} h:${h}`);
    return (Math.min(w,h));
}

let arr = []
let total = 0

// Set BPM
function setBPM() {
  // let arr = []
  // let total = 0
  if (timekeeper.state == "suspended") {
    timekeeper.resume()
  }

  arr.push(new Date().getTime())
  console.log(new Date().getTime());
  // arr.push(Number(timekeeper.currentTime.toFixed(4)))
  // console.log(timekeeper.currentTime);
  if (arr.length > 1 ){
    total += Number((arr[arr.length - 1] - arr[arr.length - 2]).toFixed(4))
    let tempo = total/arr.length
    console.log(Number((arr[arr.length - 1] - arr[arr.length - 2]).toFixed(4))+" "+60/tempo);
    current_bpm = 60/tempo * 1000;
  }
  perf2 = performance.now()
}


function hitTiming(timestamp) {
  return Math.abs((timestamp * 60/current_bpm) - music.seek() + global_offset )
}


function accuracy(timinghit){
  if (timinghit <= (global_margin*2/3)/1000) {
    console.log('Perfect');
    // return 3
  } else if (timinghit <= global_margin/1000) {
    console.log('Okay');
    // return 2
  } else if (timinghit <= (global_margin * 3/2)/1000) {
    console.log('Miss');
    // return 1
  } else {
    console.log('Unregister');
    // return 0
  }
}


function visibility(pos) {

  let op100 = visibility_range/1000
  let op0 = 1
  let start = pos[0] * 60/current_bpm
  let end = pos[pos.length - 1] * 60/current_bpm
  let buffer = (end - start)/2
  let x = Math.abs(start + buffer - music.seek())

  if (x <= op100 + buffer) {
    return 1
  } else if (x <= op0 + buffer) {
    return 1 - (x - op100 + buffer)/(op0 - op100 + 2*buffer)
  } else {
    return 0
  }
}

function approachVisibility(pos) {
  let x = pos*60/current_bpm - music.seek()
  let op100 = visibility_range/1000
  let op0 = 1

  if (x < -op100/8) {
    return 0
  } else if (x <= op100) {
    return 1
  } else if (x <= op0) {
    return 1 - (x - op100)/(op0 - op100)
  } else {
    return 0
  }
}

function scale(pos){
  let x = pos - music.seek()
  let sc2x = 1.5

  if (x > sc2x) {
    return 3
  } else if(x >= 0 ){
    return .95 + (x/1.5 * 3)
  } else {
    return .95
  }
}

function makingHoldTimer(pos){
  let x = new PIXI.Graphics()
  x.data = pos
  x.timestamp = pos[0]
  x.timepoints = pos[2]
  x.coordpoints = pos[3].slice().reverse()
  // x.coordpoints.reverse()
  // gameplay_slideField.addChildAt(x, 0)
  return x
}


// Fungsi untuk bikin garis slider tapi belum digambar
function makingSliderLine(pos) {
  let x = new PIXI.Graphics()
  x.data = pos
  x.timestamp = pos[0]
  x.timepoints = pos[2]
  x.coordpoints = pos[3].slice().reverse()
  // x.coordpoints.reverse()
  // gameplay_slideField.addChildAt(x, 0)
  return x
}


// Fungsi untuk VISIBILITAS slider
function visibilitySlideLine(pos){
  let xy = pos[3]
  let time = pos[2]
  let x = (pos[2][1]*60/current_bpm) - (pos[2][0]*60/current_bpm)

  let timeposStart = Math.abs((time[0]*60/current_bpm) - music.seek())
  let timeposEnd = Math.abs((time[1]*60/current_bpm) - music.seek())
  let timepos = timeposStart + timeposEnd

  if(timepos > x){
    return 1 - timepos/x+(visibility_range/1000)
  } else {
    return 1
  }
  // console.log(timeposStart + timeposEnd)
}


// Fungsi untuk gambar garis slider
function redrawLine(sliderobject){
  // gameplay_slideField.children as sliderobject
  sliderobject.clear()
  sliderobject.lineStyle(16, 0xe27ce2, 1)
  
  let timepoints = sliderobject.timepoints
  let coordpoints = sliderobject.coordpoints
  let pewaktu
  
  if (music.seek() - timepoints[0]*60/current_bpm < 0) {
    pewaktu = 1
  } else if (timepoints[1]*60/current_bpm - music.seek() < 0) {
    pewaktu = 0
  } else {
    pewaktu = 1 - (music.seek() - (timepoints[0]*60/current_bpm)) / (timepoints[1]*60/current_bpm - timepoints[0]*60/current_bpm) 
  }
   
  sliderobject.moveTo(coordpoints[0][0]* window_scale(), coordpoints[0][1]* window_scale())
  
  for (var i = 0; i < pewaktu; i+=.01) {
    sliderobject.lineTo(nBezier(i, coordpoints).x * window_scale(), nBezier(i, coordpoints).y * window_scale())
  }


  // bikin pewaktu dulu baru hitung panjang garis sesuai waktu
}

function redrawTimer(timerObject){
  timerObject.clear()
  sliderobject.lineStyle(16, 0xe27ce2, 1)

  let timepoints = sliderobject.timepoints
  let coordpoints = sliderobject.coordpoints
  let pewaktu

  
}


// Fungsi line interpolation
function lerp(t, pStart, pEnd, power=1) {
  if (t>1) {
    t=1
  } else if (t<0) {
    t=0
  }
  let result = (pStart + (pEnd - pStart)*t)*power
  return result
}


// Fungsi bezier berapapun
function nBezier(t, arrayXY, power=1){
  let tempArr = arrayXY
  let loopArr = []

  if (arrayXY.length < 2) {
    return { //bagian ini return x,y kalau sisa 1 array
      x:arrayXY[0][0],
      y:arrayXY[0][1]
    }
  } else { //bagian ini lakukan lerp untuk setiap pasangan array berurutan
    for (var i = 1; i < tempArr.length; i++) {
      let x = lerp(t, tempArr[i-1][0], tempArr[i][0], power)
      let y = lerp(t, tempArr[i-1][1], tempArr[i][1], power)
      loopArr.push([x,y])
    }
    return nBezier(t, loopArr, power)
  }
}


// Fungsi gambar bezier
function drawnBezier( graphicObject) {
  let acc = .05
  let a = graphicObject
  let arrayXY = graphicObject.data[3]
  let time = graphicObject.data[2]
  let t
  // if (music.seek() < time[0]*60/current_bpm || music.seek()> time[1]*60/current_bpm){
  //   t = 1
  // } else {
  //   t = (time[1]*60/current_bpm -  music.seek())/(time[1]*60/current_bpm - time[0]*60/current_bpm)
  // }

  
  // return a
  // a.clear()
  a.lineStyle(16  , 0xe27ce2, 1)
  a.moveTo(arrayXY[0][0],arrayXY[0][1])
  
  for (var i = 0; i < 1; i+=acc) {
    // console.log(t)
    a.lineTo(nBezier(i,arrayXY).x, nBezier(i,arrayXY).y)
  }
}
