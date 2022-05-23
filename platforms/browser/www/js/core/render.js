const renderer = new PIXI.Renderer({
    antialias:true,
    // width:window.screen.availWidth,
    // height:window.screen.availHeight,
    width:720,
    height:400,
    backgroundColor:0xeeeeee,
})


var camera = new PIXI.Container()

document.body.appendChild(renderer.view)

ticker.add(function (delta) {
    renderer.render(camera)
    console.log(Date());
})

ticker.start()
