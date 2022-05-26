// Debug Screen
var debug_screen = new PIXI.Container;


var text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});


var memory_info = new PIXI.Text;
memory_info.x = 3;
memory_info.y = 3;
memory_info.style = text_style;







debug_screen.addChild(memory_info)  
function updateInfo(){
    // Update memory_info
    memory_info.text = `Memory size: ${window.performance.memory.totalJSHeapSize} \n Memory used: ${window.performance.memory.usedJSHeapSize} \n Memory limit: ${window.performance.memory.jsHeapSizeLimit}`
}