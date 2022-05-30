if (PIXI.isMobile.phone){
    // renderer.resize(window.screen.availWidth, window.screen.availHeight);
    renderer.resize(window.screen.width, window.screen.height);
}

// Scaling Camera
// gameplay.scale.x = window_scale();
// gameplay.scale.y = window_scale();

gameplay.addChild(gameplay_field, debug_button, start_button);
gameplay_field.addChild(hitobject[2])

// To be deleted///////////////
hitobject[2].interactive = true
hitobject[2].on('pointertap', () => {
  perf1 = performance.now()
  setBPM()
});

loadMusic()
///////////////////////////////

$('body').prepend(renderer.view)
to_render = gameplay

ticker.add(function (delta) {
    renderer.render(to_render);
    // showDate.text = updateDate() + " " + `${window.screen.width} ${window.screen.height} ${PIXI.isMobile.phone} ${ticker.FPS}`
    updateInfo()

})

ticker.start()
