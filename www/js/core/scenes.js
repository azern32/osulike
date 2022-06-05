// Scaling Camera
// gameplay.scale.x = window_scale();
// gameplay.scale.y = window_scale();

to_render = gameplay
loadMusic()


// Gameplay scenes
gameplay.addChild(gameplay_field, gameplay_approachField, start_button);
// gameplay_field.addChild(field)

    // To be deleted///////////////
    // gameplay_field.addChild(hitobject[2])
    // hitobject[2].interactive = true
    // hitobject[2].on('pointertap', () => {
    //   perf1 = performance.now()
    //   setBPM()
    //   tickSFX.play()
    // });
    //
    // loadMusic()
    ///////////////////////////////

// Pause scenes

// Main menu scenes

// Settings scenes

// Calibration scenes
var placement_line = new PIXI.Graphics();
    placement_line.lineStyle(1, 0x000000, 1, 0)
    placement_line.moveTo(0,20)
    placement_line.lineTo(10000,20)
    placement_line.x = window.screen.width/2
    placement_line.y = /*window.screen.height - */50


    for (var i = 0; i < placement_line.width; i++) {
      switch (i%64) {
        case 0:
          placement_line.moveTo(i ,0)
          placement_line.lineTo(i ,40)
          break;

        case (64/2):
          placement_line.moveTo(i ,10)
          placement_line.lineTo(i ,30)
          break;

        case (64/4):
          placement_line.moveTo(i ,15)
          placement_line.lineTo(i ,25)
          break;

        case (64*3/4):
          placement_line.moveTo(i ,15)
          placement_line.lineTo(i ,25)
          break;

        default:
      }
    }

var timestamp_line = new PIXI.Graphics();
    timestamp_line.lineStyle(2, 0xFF0000, 1)
    timestamp_line.moveTo(0,0)
    timestamp_line.lineTo(0,40)
    timestamp_line.x = window.screen.width/2
    timestamp_line.y = /*window.screen.height - */50

calibration.addChild(calibration_field, placement_line, timestamp_line);


// Account scenes
