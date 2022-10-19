
// Map testing bakal dihapus /////////////
map_to_read = [
  // ["hit timestamp","type",["arrays of timestamp"],["arrays of position"]]
  [4, 2, [4,10], [ [0,0], [100,0], [100,100], [-100,-100]] ],
  [8,0,[8],[[0,0]]],
  [12,1,[12,14],[[-130,-40]]],
  [16,0,[16],[[130,-40]]],
  [20,0,[20],[[30,-240]]],
  [32,0,[32],[[0,0]]],
  [34,0,[34],[[20,0]]],
  [36,0,[36],[[30,0]]],
  [38,0,[38],[[30,100]]],
  [40,0,[40],[[30,0]]],
  [42,0,[42],[[30,100]]],
  [46,3,[46],[[30,-110]]],
  [46,3,[46],[[30,100]]],


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
        x2.data = m[i]
        x2.x = m[i][3][0][0]
        x2.y = m[i][3][0][1]
    let approachobject = new PIXI.Sprite(approachtexture)
        approachobject.anchor.set(0.5)
        approachobject.interactive = false
        approachobject.width *= 1.5
        approachobject.height *= 1.5      

    let x3 = new PIXI.Container
        x3.x = m[i][3][0][0]
        x3.y = m[i][3][0][1]


    switch (m[i][1]) {
      case 0: //simpel tap
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

      case 1: //hold
        hitobject.tint = 0xe27ce2;
        approachobject.tint = 0xe27ce2;

        x3.addChildAt(makingHoldTimer(m[i]), 0)
        gameplay_timerField.addChildAt(x3, 0)

        hitobject.on('pointerdown', ()=>{
          accuracy(hitTiming(x.data[2][0]))
          console.log(x.data[2][0]+" "+ hitTiming(x.data[2][0]));
          debug_message = x.data[2][0];
          x.clicked = !true
        })

        hitobject.on('pointerup', ()=>{
          accuracy(hitTiming(x.data[2][1]))
          console.log(x.data[2][1]+" "+ hitTiming(x.data[2][1]));
          // debug_message = x.data[2][1];
        })

        hitobject.on('pointerupoutside', ()=>{
          accuracy(hitTiming(x.data[2][1]))
          console.log('Miss');
        })

        
        break;

      case 2: //slider
        hitobject.tint = 0xe27ce2;
        approachobject.tint = 0xe27ce2;
        // makingSliderLine(m[i]) // ini baru masukkan slidernya, belum digambar
        x3.addChildAt(makingSliderLine(m[i]), 0)
        gameplay_slideField.addChildAt(x3, 0)

        hitobject.on('pointerdown', ()=>{
          accuracy(hitTiming(x.data[2][0]))
          console.log(x.data[2][0]+" "+ hitTiming(x.data[2][0]));
          hitobject.hitArea.radius = 110
          debug_message = x.data[2][0];
          x.clicked = !true
        })

        hitobject.on('pointerup', ()=>{
          accuracy(hitTiming(x.data[2][1]))
          console.log(x.data[2][1]+" "+ hitTiming(x.data[2][1]));
          // debug_message = x.data[2][1];
        })

        hitobject.on('pointerupoutside', ()=>{
          accuracy(hitTiming(x.data[2][1]))
          console.log('Miss');
        })
        
        // hitobject.on('pointerout', ()=>{
        //   accuracy(hitTiming(x.data[2][1]))
        //   console.log(x.data[2][1]+" "+ hitTiming(x.data[2][1]));
        //   debug_message = x.data[2][1];
        // })
        break;

      case 3: //hit twin
        hitobject.tint = 0xffd966;
        approachobject.tint = 0xffd966;

        hitobject.on('pointertap', ()=>{
          tickSFX.play()
          accuracy(hitTiming(x.timestamp))
          console.log(x.timestamp+" "+ hitTiming(x.timestamp));
          debug_message = x.timestamp;
          x.clicked = !true
        })
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
    item.alpha = visibility(item.data[2])
    item.alpha == 1 ? item.children[0].interactive = true : item.children[0].interactive = false
  });
}

function objectMove(m) {
  // gameplay_field.children as m
  let t = music.seek()
  m.forEach((item, i)=>{
    if (item.data[2].length > 1) {
      let start = item.data[2][0] * (60/current_bpm)
      let end = item.data[2][1] * (60/current_bpm)
      let time = (t - start)/(end - start)
      if (time > 0) {
        item.x = nBezier(time, item.data[3] ).x
        item.y = nBezier(time, item.data[3] ).y
      }
    }
  })
}

function approachScaleVisibilty(m) {
  // gameplay_approachField.children as m
  m.forEach((item, i) => {
    item.alpha = approachVisibility(item.timestamp)
    item.scale.x = scale(item.timestamp * 60/current_bpm)
    item.scale.y = scale(item.timestamp * 60/current_bpm)
  });
}

function approachSlide(m) {
  // gameplay_slideField.children as m
  m.forEach((item, i)=>{
    item.alpha = visibilitySlideLine(item.children[0].data)
    // drawnBezier(item)
    redrawLine(item.children[0])
    // console.log(item)
  })
}


