if (PIXI.isMobile.phone){
    // renderer.resize(window.screen.availWidth, window.screen.availHeight);
    renderer.resize(window.screen.width, window.screen.height);
}

// Scaling Camera
// camera.scale.x = window_scale();
// camera.scale.y = window_scale();



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


    camera.addChild(showDate, graphics);
// 

$('body').prepend(renderer.view)

ticker.add(function (delta) {
    renderer.render(camera)
    showDate.text = updateDate() + " " + `${window.screen.width} ${window.screen.height} ${PIXI.isMobile.phone} ${ticker.FPS}`
})

ticker.start()




