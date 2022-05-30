
var music_filename = '01.Broken Marionette.mp3'
// var music_filename = 'Myosotis (feat  Guriri, Lucy)_M2U & NICODE_Myosotis.mp3'
var music_map   = '../../maps/1-map'
var music
// Load music
function loadMusic(map){
    // let m = JSON.parse()
    music = new Howl({
        src : [`${music_map}/${music_filename}`],
        volume: music_volume/100,
        // html5 : true,
        onload: function() {
            console.log("LOADED");
        },
        onloaderror: function(){
            console.log()
        },
        onplay:function(){
            console.log(`Playing ${music_filename}`)
        },
        onplayerror: function(){
            console.log('some error happen')
        },
        onpause: function(){
            console.log(`Pausing ${music_filename}`)
        },
        onresume: function(){
            console.log(`Resuming ${music_filename}`)
        },
        onend: function() {
              console.log(`Ending ${music_filename}`);
        }
    })

}
