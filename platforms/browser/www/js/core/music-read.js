
var music_filename = 'Myosotis (feat  Guriri, Lucy)_M2U & NICODE_Myosotis.mp3'
var music_map   = '../../0-map'

// Load music
var music = new Howl({
    src : [`${music_map}/${music_filename}`],
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

