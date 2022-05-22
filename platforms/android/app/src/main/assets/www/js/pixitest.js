// const { Howl } = require("howler");

$('#pixi-test').text(`Is phone? ${PIXI.isMobile.phone}`);

var map = '0-map';
var song = 'Myosotis (feat  Guriri, Lucy)_M2U & NICODE_Myosotis.mp3';
var sound = new Howl({
    src: [`../${map}/${song}`]
  });
  
  sound.play();


