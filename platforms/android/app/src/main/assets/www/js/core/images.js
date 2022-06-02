let bol = true;

// switch buttons
var switch0 = PIXI.Texture.from('img/switch0.png');

var switch1 = PIXI.Texture.from('img/switch1.png');

var debug_button = new PIXI.Sprite(switch0);
debug_button.anchor.set(.5)

debug_button.interactive = true;
debug_button.buttonMode = true;
debug_button.width = 60
debug_button.height = 30
debug_button.x = 50 ;
debug_button.y = window.screen.height - debug_button.height ;

debug_button.on('pointertap', () => {
    bol = !bol;
    if (bol) {
        debug_button.texture = switch0;
        to_render.removeChildAt(0)
    } else {
        debug_button.texture = switch1;
        to_render.addChildAt(debug_screen,0)
    }
});

var start_texture =  PIXI.Texture.from('img/start.png');
var start_button = new PIXI.Sprite(start_texture);
start_button.interactive = true;
start_button.buttonMode = true;
start_button.anchor.set(.5)
start_button.x = window.screen.width/2;
start_button.y = window.screen.height - start_button.height - 20;
start_pause = false
start_button.on('pointertap', () => {
    start_pause = !start_pause;
    if (start_pause) {
      start_button.tint = 0xffd966;
      music.play()
    } else {
      start_button.tint = 0xFFFFFF;
      music.stop()
    }
});



// ===============================================================================
// ===============================================================================
// ===============================================================================

// Teksture hit object
var hittexture = PIXI.Texture.from('img/hit.png')
