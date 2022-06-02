
// Map testing bakal dihapus /////////////
map_to_read = [
  // ["hit timestamp","type",["arrays of timestamp"],["arrays of position"]]
  [19,1,[[19]],[[0,0]]],
  [20,0,[[20]],[[-30,-50]]],
  [21,2,[[21]],[[100,200]]],
  [22,3,[[21]],[[200,100]]],
]
// ///////////////////////////////////////

async function readMap(m) {
  // maps.hitobjects as m
  for (var i = 0; i < m.length; i++) {
    let x = new PIXI.Container
    x.timestamp = m[i][0]
    x.type = m[i][1]
    x.x = m[i][3][0][0]
    x.y = m[i][3][0][1]

    // x.interactive = true
    // x.on('pointertap', ()=>{
    //   tickSFX.play()
    //   console.log(x.timestamp);
    // })

    let hitobject = new PIXI.Sprite(hittexture)
        hitobject.anchor.set(0.5)
        // hitobject.interactive = true

    switch (m[i][1]) {
      case 0:
        hitobject.tint = 0xc7e5ff;
        break;
        case 1:
          hitobject.tint = 0xe27ce2;
          break;
          case 2:
            hitobject.tint = 0xe27ce2;
            break;
            case 3:
              hitobject.tint = 0xffd966;
              break;
      default:
      hitobject.tint = 0xFFFFFF;
    }

    x.hitarea = new PIXI.Graphics()
    x.hitarea.lineStyle(0);
    x.hitarea.beginFill(0x000000, 1/255);
    x.hitarea.drawCircle(0, 0, hittexture.width/2 - 2);
    x.hitarea.endFill();
    x.hitarea.interactive = true

    x.hitarea.on('pointertap', ()=>{
      tickSFX.play()
      console.log(x.timestamp);
      debug_message = x.timestamp;
    })


    x.addChild(hitobject, x.hitarea)
    x.width *= 1.5
    x.height *= 1.5
    gameplay_field.addChildAt(x, 0)
  }
}
