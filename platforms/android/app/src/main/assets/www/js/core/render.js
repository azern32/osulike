if (PIXI.isMobile.phone){
    // renderer.resize(window.screen.availWidth, window.screen.availHeight);
    renderer.resize(window.screen.width, window.screen.height);
}

// Scaling Camera
// gameplay.scale.x = window_scale();
// gameplay.scale.y = window_scale();



//  To be deleted
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 11        
    });

    var showDate = new PIXI.Text()
    showDate.x = 10
    showDate.y = 10
    showDate.style = style
    function updateDate(){
        return Date.now()
    }

    const graphics = new PIXI.Graphics();

    graphics.lineStyle(2, 0xFEEB77, 1);
    graphics.beginFill(0x650A5A, 1);
    graphics.drawCircle(250, 250, 50);
    graphics.endFill();


    gameplay.addChild(showDate, graphics, debug_button);
// 

$('body').prepend(renderer.view)
to_render = gameplay

ticker.add(function (delta) {
    renderer.render(to_render);
    // showDate.text = updateDate() + " " + `${window.screen.width} ${window.screen.height} ${PIXI.isMobile.phone} ${ticker.FPS}`
    updateInfo()
})

ticker.start()




