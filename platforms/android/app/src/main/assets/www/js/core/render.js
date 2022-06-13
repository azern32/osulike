

// if (PIXI.isMobile.phone){
    // renderer.resize(window.screen.availWidth, window.screen.availHeight);
    renderer.resize(window.screen.width, window.screen.height);
// }

// to be deleted
function moveplacementLine() {
  a = Math.round(music.seek() * (16/(60/current_bpm)))
  placement_line.x = (window.screen.width/2) - a

}



// to be deleted



$('body').prepend(renderer.view)
to_render.addChild(debug_button, placement_line, timestamp_line)


ticker.add(function (delta) {
    renderer.render(to_render);
    // showDate.text = updateDate() + " " + `${window.screen.width} ${window.screen.height} ${PIXI.isMobile.phone} ${ticker.FPS}`
    updateInfo()
    moveplacementLine()
    objectVisibilty(gameplay_field.children)
    approachScaleVisibilty(gameplay_approachField.children)
    // redrawLine()    
})

ticker.start()


readMap(map_to_read).then((x)=>{console.log(`${x} ${gameplay_field.children}`)})
  .then(function(error){
    console.log(error)
    gameplay_field.width *= window_scale()
    gameplay_field.height *= window_scale()
    gameplay_approachField.width *= window_scale()
    gameplay_approachField.height *= window_scale()
  })
