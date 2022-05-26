let bol = true;

// create a texture from an image path
var switch0 = PIXI.Texture.from('img/switch0.png');

// create a second texture
var switch1 = PIXI.Texture.from('img/switch1.png');

// create a new Sprite using the texture
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