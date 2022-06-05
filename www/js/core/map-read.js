
// Map testing bakal dihapus /////////////
map_to_read = [
  // ["hit timestamp","type",["arrays of timestamp"],["arrays of position"]]
  [8,0,[[8]],[[0,0]]],
  [12,0,[[12]],[[30,-40]]],
  [16,0,[[16]],[[130,-40]]],
  [20,0,[[20]],[[30,-240]]],
  [32,0,[[32]],[[0,0]]],
  [34,0,[[34]],[[20,0]]],
  [36,0,[[36]],[[30,0]]],
  [38,0,[[38]],[[30,100]]],
  [40,0,[[40]],[[30,0]]],
  [42,0,[[42]],[[30,100]]],
  [46,3,[[46]],[[30,-110]]],
  [46,3,[[46]],[[30,100]]],


]
// ///////////////////////////////////////

async function readMap(m) {
  // maps.hitobjects as m
  for (var i = 0; i < m.length; i++) {
    let x = new PIXI.Container
    x.data = m[i]
    x.timestamp = m[i][0]
    x.type = m[i][1]
    x.x = m[i][3][0][0]
    x.y = m[i][3][0][1]
    x.timingPos =(timing)=>{
      return timing - (x.timestamp * (60/current_bpm))
    }
    x.clicked = !false

    let hitobject = new PIXI.Sprite(hittexture)
        hitobject.anchor.set(0.5)
        hitobject.interactive = false
        hitobject.hitArea = new PIXI.Circle(0,0, 60)


    let x2 = new PIXI.Container
        x2.timestamp = m[i][0]
        x2.x = m[i][3][0][0]
        x2.y = m[i][3][0][1]
    let approachobject = new PIXI.Sprite(approachtexture)
        approachobject.anchor.set(0.5)
        approachobject.interactive = false
        approachobject.width *= 1.5
        approachobject.height *= 1.5

    switch (m[i][1]) {
      case 0:
        hitobject.tint = 0xc7e5ff;
        approachobject.tint = 0xc7e5ff;

        hitobject.on('pointertap', ()=>{
          tickSFX.play()
          accuracy(hitTiming(x.timestamp))
          console.log(x.timestamp+" "+ hitTiming(x.timestamp));
          debug_message = x.timestamp;
          x.clicked = !true
        })
        break;

      case 1:
        hitobject.tint = 0xe27ce2;
        approachobject.tint = 0xe27ce2;
        break;

      case 2:
        hitobject.tint = 0xe27ce2;
        approachobject.tint = 0xe27ce2;
        break;

      case 3:
        hitobject.tint = 0xffd966;
        approachobject.tint = 0xffd966;
        break;

      default:
      hitobject.tint = 0xFFFFFF;
      approachobject.tint = 0xFFFFFF;
    }




    x.addChild(hitobject)
    x.width *= 1.5
    x.height *= 1.5
    gameplay_field.addChildAt(x, 0)





    x2.addChild(approachobject)
    gameplay_approachField.addChildAt(x2, 0)
  }
}


function objectVisibilty(m) {
  // gameplay_field.children as m
  m.forEach((item, i) => {
    item.alpha = visibility(item.timestamp * 60/current_bpm)
    item.alpha == 1 ? item.children[0].interactive = true : item.children[0].interactive = false
  });
}


function approachScaleVisibilty(m) {
  // gameplay_approachField.children as m
  m.forEach((item, i) => {
    item.alpha = visibility(item.timestamp * 60/current_bpm)
    item.scale.x = scale(item.timestamp * 60/current_bpm)
    item.scale.y = scale(item.timestamp * 60/current_bpm)
  });
}
