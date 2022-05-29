// Debug Screen
var debug_screen = new PIXI.Container;
debug_screen.name = 'debug_screen'

var text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    dropShadow: true,
    dropShadowColor: '#ffffff',
    dropShadowBlur: 2,
    dropShadowDistance: 1,
});

var text_style2 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    dropShadow: true,
    dropShadowColor: '#ffffff',
    dropShadowBlur: 2,
    dropShadowDistance: 1,
    align: 'right'
});


var debug_info = new PIXI.Text;
debug_info.x = 3;
debug_info.y = 3;
debug_info.style = text_style;

var debug_info2 = new PIXI.Text;
debug_info2.x = window.screen.width - 15;
debug_info2.y = 3;
debug_info2.style = text_style2;

debug_screen.addChild(debug_info, debug_info2)  
function updateInfo(){
    // Update info about device
    debug_info.text = `
    FPS: ${ticker.FPS.toFixed(2)}
    Memory size: ${formatBytes(window.performance.memory.totalJSHeapSize)}
    Memory used: ${formatBytes(window.performance.memory.usedJSHeapSize)}
    Memory limit: ${formatBytes(window.performance.memory.jsHeapSizeLimit)}
    Screen : width ${window.screen.width}, height ${window.screen.height}
    Currently rendering : ${to_render.name}
    `

    // Update info about settings
    debug_info2.pivot.set(debug_info2.width,0)
    debug_info2.text = `
    ${global_offset} = global_offset
    ${global_margin} = global_margin
    ${master_volume} = master_volume
    ${music_volume} = music_volume
    ${sfx_volume} = sfx_volume
    ${play_video} = play_video
    ${dim_video} = dim_video
    ${approach_rate} = approach_rate
    `
}