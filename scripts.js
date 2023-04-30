var a = document.getElementById("audio");
var v = document.getElementById("video");
var vPrev = document.getElementById("video-prev");
var vNext = document.getElementById("video-next");
var canvas = document.getElementById("c");
var lightsCanvas = document.getElementById("l");
var context = canvas.getContext("2d");
var back = document.createElement("canvas");
var backcontext = back.getContext("2d");
var transCanvas = document.getElementById("cX");
var cXcontext = transCanvas.getContext("2d");
var audioContext = new AudioContext();
var audioSrc = audioContext.createMediaElementSource(a);
var active = 0;

var cw, ch, cx, scale;

function fitCanvas() {
  cw = window.innerWidth;
  ch = window.innerHeight;
  
  if (cw >= ch) {
    canvas.width = cw;
    canvas.height = ch;
    transCanvas.width = cw;
    transCanvas.height = ch;
    scale = canvas.height;
  } else {
    canvas.width = cw;
    canvas.height = cw;
    transCanvas.width = cw;
    transCanvas.height = cw;
    scale = canvas.width;
  }
}


function cloneLights(lightsCanvas) {

  //create a new canvas
  var newCanvas = document.getElementById("l-rev");
  var context = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = lightsCanvas.width;
  newCanvas.height = lightsCanvas.height;

  //apply the old canvas to the new one
  context.drawImage(lightsCanvas, 0, 0);

  //return the new canvas
  return newCanvas;
}

window.addEventListener("resize", () => {
  fitCanvas();
});

fitCanvas();

let start = Date.now();

function loadImage(v, start) {
  fitCanvas();
  if (v.paused) {
    let MAX_ZOOM = 1;
    let MIN_ZOOM = .01;
    let now = Date.now();
    let elapsed = now - start;
    let multiplier = MIN_ZOOM + (elapsed/2000);
    let zoom = 1;
    if (multiplier <= 1) {
      zoom = multiplier;
    } else {
      zoom = 1;
    }
    let scaledSize = canvas.width * zoom;
    let margin = ((canvas.width - scaledSize) / 2)/zoom;
    var bumper;
    if (cw >= ch) {
      bumper = (canvas.width - canvas.height)/2;
    } else {
      bumper = (canvas.height - canvas.width)/2;
    }

    
    let cameraOffset = { x: (margin + bumper), y: margin };
    context.scale(zoom, zoom);
    context.drawImage(preload, cameraOffset.x, cameraOffset.y, canvas.height, canvas.height);
  }
  else {
    return false;
  }
  

  // Start over!
  setTimeout(function () {
    loadImage(v, start);
  }, 0);

}

var preload = new Image();
preload.src = "https://marthahipley.com/archive-emotion/images/still.png";
preload.onload = function () {
  loadImage(v, start);
};    
    

const content = {
    songs: [
        {
            video: "videos/Video1.mp4",
            blendMode: "screen",
            filter: "blur(15px) drop-shadow(0 0 30px rgba(51,180,172,1)",
            audio: "audio/01.wav",
            baseColor: "rgb(255, 200, 220)",
            opacity: "1",
            title: "Opening",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 0
        },
        {
            video: "videos/Video2.mp4",
            blendMode: "screen",
            filter: "blur(15px) drop-shadow(0 0 30px #e47e30) hue-rotate(210deg)",
            baseColor: "rgb(255, 200, 220)",
            opacity: "1",
            audio: "audio/02.wav",
            title: "Dreams",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 0
        },
        {
            video: "videos/Video3.mp4",
            blendMode: "screen",
            filter: "blur(15px) drop-shadow(0 0 30px #33B4AC) hue-rotate(45deg)",
            baseColor: "rgb(255, 200, 220)",
            opacity: "1",
            audio: "audio/03.wav",
            title: "Home",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 0
        },
        {
            video: "videos/Video4.mp4",
            blendMode: "hard-light",
            filter: "blur(15px) drop-shadow(0 0 30px rgba(51,180,172,1)",
            baseColor: "rgb(255, 200, 220)",
            opacity: "1",
            audio: "audio/04.wav",
            title: "Rest Rework",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 1
        },
        {
            video: "videos/Video7.mp4",
            blendMode: "screen",
            filter: "blur(15px) drop-shadow(0 0 30px #A7FFFA) hue-rotate(45deg)",
            baseColor: "rgb(255, 200, 220)",
            opacity: "1",
            audio: "audio/05.wav",
            title: "Gentle Night",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 0
        },
        {
            video: "videos/Video5.mp4",
            blendMode: "screen",
            filter: "blur(15px) drop-shadow(0 0 30px #A7FFFA) hue-rotate(45deg)",
            baseColor: "rgb(255, 200, 220)",
            opacity: "1",
            audio: "audio/06.wav",
            title: "Lost in Time",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 0
        },
        {
            video: "videos/Video6.mp4",
            blendMode: "normal",
            filter: "blur(15px) drop-shadow(0 0 30px rgba(51,180,172,1)",
            baseColor: "rgb(255, 200, 220)",
            opacity: ".5",
            audio: "audio/07.wav",
            title: "Rest",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
            maxOffset: 0
        },
    ]
}

    v.addEventListener(
      "play",
      () => {

        if (cw >= ch) {
          scale = canvas.height;

        } else {
          scale = canvas.width;
        }

          
        
          analyser = audioContext.createAnalyser();
          audioSrc.connect(analyser);
          analyser.connect(audioContext.destination);
          analyser.fftSize = 32;
          drawVideo(v, context, backcontext, cXcontext);
          audioContext.resume();
          playMusic();
      },
      false
    );
    
    v.addEventListener(
      "pause",
      () => {
        pauseMusic();
      },
      false
    );
    
    function playMusic() {
      a.play();
    }
    
    function pauseMusic() {
      a.pause();
    }
    
    function drawVideo(v, c, bc, cx, a) {

      fitCanvas();
      scale = canvas.height;

      cloneLights(lightsCanvas);

      // audio analyser
      const bufferLength = analyser.frequencyBinCount;
      const freqArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(freqArray);

      const waveArray = new Float32Array(bufferLength);
      analyser.getFloatTimeDomainData(waveArray);


      var maximum;

      if (content.songs[active].maxOffset === 0 )
      {
        maximum = 10;

      } else {
        maximum = canvas.width/4;
      }
    
      function convertRange( value, r1, r2 ) { 
        return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
      }
      var offset = convertRange(waveArray[0], [0, 1], [0 , maximum]);

      back.width = canvas.width;
      back.height = canvas.height;
      if (v.paused || v.ended) return false;

      var bumper;
      if (cw >= ch) {
        bumper = (canvas.width - canvas.height)/2;
      } else {
        bumper = (canvas.height - canvas.width)/2;
      }

      
      // First, draw it into the backing canvases
      bc.drawImage(v, 0, 0, scale, scale);
      // Grab the pixel data from the backing canvas
      var idata = bc.getImageData(0, 0, scale, scale);
      var data = idata.data;
      var glitchData = idata.data;
      // Loop through the pixels, turning them grayscale
      for (var i = 0; i < glitchData.length; i += 4) {
        // var r = glitchData[i];
        // var g = glitchData[i+1];
        // var b = glitchData[i+2];
        // var brightness = (3*r+4*g+b)>>>3;
        // glitchData[i] = brightness;
        // glitchData[i+1] = brightness;
        // glitchData[i+2] = brightness;
      }
      idata.data = data;
      // Draw the pixels onto the visible canvas
      c.putImageData(idata, (bumper + offset), 0);
      cx.putImageData(idata, (bumper - offset), 0);


      
      // Start over!
      setTimeout(function () {
        drawVideo(v, c, bc, cx);
      }, 0);
    }

    
    //toggle display of text modal
    function toggleText() {
      var x = document.getElementById("text-modal");
      if (x.style.top === "0px") {
        x.style.top = "-100vh";
      } else {
        x.style.top = "0px";
      }
      typewriter.start();
    }

    function toggleMenu() {
      var x = document.getElementById("ui");
      x.classList.toggle("active");
    }

    function reset() {
      pauseMusic();
      var reset = document.getElementById("reset");
      reset.classList.remove("active");
      var x = document.getElementById("l");
      x.classList.remove("active");
      var y = document.getElementById("l-rev");
      y.classList.remove("active");
      v.pause();
      loadImage(v, start);

    }

    function play(songId) {      
      v.src = content.songs[songId].video;
      a.src = content.songs[songId].audio;
      v.play();
      var x = document.getElementById("l");
      x.classList.add("active");
      x.style.mixBlendMode = content.songs[songId].blendMode;
      x.style.filter = content.songs[songId].filter;
      x.style.opacity = content.songs[songId].opacity;
      var y = document.getElementById("l-rev");
      y.classList.add("active");
      y.style.mixBlendMode = content.songs[songId].blendMode;
      y.style.filter = content.songs[songId].filter;      
      y.style.opacity = content.songs[songId].opacity;
      y.style.opacity = content.songs[songId].opacity;
      var reset = document.getElementById("reset");
      reset.classList.add("active");
  }

/* NORTHERN LIGHTS */

/**
 *  Makes a Canvas element that simulates Northern Lights
 */

// settings
var DEBUG = false; // draw the debug line so we can see what it's doing, helps if you turn off the blur filter, too
var CURVE_POINTS = 5; // curve control points, not counting vanishingPoint
var CURVE_POINT_X_JITTER = 1.5; // how far off the base location a point can go, in percentage of difference from previous point
var CURVE_POINT_Y_JITTER = 3.5;
var CURVE_POINT_MAX_FLOAT_X_DIST = 270; // farthest a curve point can float per keyframe
var CURVE_POINT_MAX_FLOAT_Y_DIST = 80;
var CURVE_POINT_MIN_FLOAT_DIST = 15;
var CURVE_POINT_MAX_FLOAT_TIME = 9000; // longest a curve point can take to get to next keyframe
var CURVE_POINT_MIN_FLOAT_TIME = 3000; // shortest a curve point can take to get to next keyframe
var BRUSH_COUNT = 150;
var BRUSH_WIDTH = 100;
var BRUSH_HEIGHT = 500;
var BRUSH_MIN_SCALE_Y = .02;
var BRUSH_MAX_SCALE_Y_VARIANCE = .5;
var BRUSH_MAX_ALPHA_VARIANCE = .7;
var BRUSH_MAX_ANIM_TIME = 7000;
var BRUSH_MIN_ANIM_TIME = 1500;
var BRUSH_MAX_Z_ANIM_TIME = 80000;
var BRUSH_MIN_Z_ANIM_TIME = 58000;
var BRUSH_ALPHA_DROPOFF = .07;
var MOUSE_X_OFFSET = 50;
var MOUSE_Y_OFFSET = 25;
var mouseXPercentage = .5;
var mouseYPercentage = .5;

/**
 * get point in bezier curve
 * @param point0 X
 * @param point0 Y
 * @param control point 0 X
 * @param control point 0 Y
 * @param control point 1 X
 * @param control point 1 Y
 * @param point 1 X
 * @param point 1 Y
 * @param percentage on path to get point of
 *
 * see http://stackoverflow.com/questions/14174252/how-to-find-out-y-coordinate-of-specific-point-in-bezier-curve-in-canvas
 */
function deCasteljau (p0x, p0y, cp0x, cp0y, cp1x, cp1y, p1x, p1y, t) {
  // In the first step of the algorithm we draw a line connecting p0 and cp0,
  // another line connecting cp0 and cp1, and another still connecting cp1 and p1.
  // Then for all 3 of these lines we're going to find the point on them that is
  // t % from the start of them.
  var Ax = p0x + (t * (cp0x - p0x)),
      Ay = p0y + (t * (cp0y - p0y)),
      Bx = cp0x + (t * (cp1x - cp0x)),
      By = cp0y + (t * (cp1y - cp0y)),
      Cx = cp1x + (t * (p1x - cp1x)),
      Cy = cp1y + (t * (p1y - cp1y));
  // The second step is very much like the first. In the first we connected the
  // four points with lines and then found 3 new points on them. In this step
  // we'll connect those 3 points with lines find 2 new points on them. I'll
  // call these two new points D and E.
  var Dx = Ax + (t * (Bx - Ax)),
      Dy = Ay + (t * (By - Ay)),
      Ex = Bx + (t * (Cx - Bx)),
      Ey = By + (t * (Cy - By));
  // Finally, we can connect these last two points with another line, and find
  // the last point on it which will give us the point on the bezier curve for
  // that t. I'll call this point P.
  var Px = Dx + (t * (Ex - Dx)),
      Py = Dy + (t * (Ey - Dy));

  return {
    x: Px,
    y: Py
  };
}

/**
 * curve controller
 * @param vanishingPoint X (where the first point locks)
 * @param vanishingPoint Y
 * @param endPoint X (where the last point starts, but it floats)
 * @param endPoint Y
 * [@param brushCount] how many brushes to put on the curve
 * [@param maxBrushAlpha] maximum alpha for brushes, defaults to 1
 * [@param fill] color or canvasGradient to fill the brushes with
 */
var Curve = function (vpX, vpY, vpZ, epX, epY, epZ, brushCount, maxBrushAlpha, fill) {
  // define where the point locks
  this.vanishingPoint = {
    x: vpX,
    y: vpY,
    z: vpZ
  };
  this.endPoint = {
    x: epX,
    y: epY,
    z: epZ
  }
  this.brushCount = brushCount || BRUSH_COUNT;
  this.maxBrushAlpha = maxBrushAlpha || 1;

  this.points = [
    new CurvePoint (this.vanishingPoint.x, this.vanishingPoint.y, this.vanishingPoint.z, 0)
  ];
  // add in-between points
  for (var i = 0; i < CURVE_POINTS - 1; i++) {
    // modifier to fake distance
    var mod = (i + 1) / CURVE_POINTS;
    mod *= mod;

    // randomly generate some points
    var xJitter = Math.random() * CURVE_POINT_X_JITTER - CURVE_POINT_X_JITTER / 2;
    var x = this.vanishingPoint.x + mod * (this.endPoint.x - this.vanishingPoint.x);
    x += xJitter * (x - this.points[i].x);
    var yJitter = (1.2 - mod) * (Math.random() * CURVE_POINT_Y_JITTER - CURVE_POINT_Y_JITTER / 2);
    var y = this.vanishingPoint.y + mod * (this.endPoint.y - this.vanishingPoint.y);
    y += yJitter * (y - this.points[i].y);
    var z = mod * (this.endPoint.z - this.vanishingPoint.z) + this.vanishingPoint.z;

    this.points.push(new CurvePoint (x, y, z, ((Math.random() * .33 + .33) * (x - this.points[i].x))));
  }
  // add last point
  this.points.push(new CurvePoint (this.endPoint.x, this.endPoint.y, this.endPoint.z, 0));

  // create brushes
  this.brushes = [];
  for (var i = 0; i < this.brushCount; i++) {
    var noScale = Math.random() < .01;
    this.brushes.push(
      new Brush(
        this,
        (i / this.brushCount) * (this.endPoint.z - this.vanishingPoint.z) + this.vanishingPoint.z,
        noScale ? "rgb(255, 200, 220)" : fill || null,
        noScale
      )
    );
  }
}
Curve.prototype = {
  drawDebug: function (ctx) {
    // mostly just for debug
    ctx.lineWidth = 2;
    // cp lines
    ctx.setLineDash([2,2]);
    ctx.strokeStyle = "#f99";
    for (var i = 1, len = this.points.length; i < len; i++) {
      ctx.beginPath();
      var cps = this.points[i].getCps();
      ctx.moveTo(cps[0].x, cps[0].y);
      //ctx.lineTo(this.points[i].x, this.points[i].y);
      ctx.lineTo(cps[1].x, cps[1].y);
      ctx.stroke();
    }

    // build the bezier paths
    var bezierPoints = [];
    for (var i = 0, len = this.points.length; i < len; i++) {
      var cps = this.points[i].getCps();
      if (i !== 0) {
        bezierPoints.push(cps[0]);
      }
      bezierPoints.push(this.points[i]);
      if (i !== len - 1) {
        bezierPoints.push(cps[1]);
      }
    }
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#c00";
    ctx.moveTo(bezierPoints[0].x, bezierPoints[0].y);
    for (var i = 1, len = bezierPoints.length; i < len; i += 3) {
      ctx.bezierCurveTo(bezierPoints[i].x, bezierPoints[i].y, bezierPoints[i+1].x, bezierPoints[i+1].y, bezierPoints[i+2].x, bezierPoints[i+2].y);
    }
    ctx.stroke();
  },
  draw: function (ctx) {
    for (var i = 0, len = this.brushes.length; i < len; i++) {
      this.brushes[i].draw(ctx);
    }
  },
  getPointAtZ: function (p) {
    if (p <= this.points[0].z) {
      return this.points[0];
    }
    else if (p >= this.points[this.points.length - 1].z) {
      return this.points[this.points.length - 1];
    }
    else {
      var i = 0;
      for (var len = this.points.length; i < len; i++) {
        if (p <= this.points[i].z) {
          break;
        }
      }
      var lastPoint = this.points[i - 1];
      var lastPointCps = lastPoint.getCps();
      var nextPoint = this.points[i];
      var nextPointCps = nextPoint.getCps();
      var t = (p - lastPoint.z) / (nextPoint.z - lastPoint.z);
      return deCasteljau (lastPoint.x, lastPoint.y, lastPointCps[1].x, lastPointCps[1].y, nextPointCps[0].x, nextPointCps[0].y, nextPoint.x, nextPoint.y, t);
    }
  },
  update: function () {
    // update point positions for floating effect
    for (var i = 0, len = this.points.length; i < len; i++) {
      this.points[i].updatePosition();
    }
    // update brush properties for floating effect
    for (var i = 0, len = this.brushes.length; i < len; i++) {
      this.brushes[i].updatePosition();
    }
  },
  setMaxBrushAlpha: function (alpha) {
    this.maxBrushAlpha = alpha;
  }
}

/**
 * curve points
 * @param startX
 * @param startY
 * @param z (affects how much it moves, 0-1)
 */
var CurvePoint = function (x, y, z, cpLength) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.cpLength = cpLength;
  this.cpYOffset = Math.random() * cpLength - cpLength;

  // set up floating
  this.xAnimTime = Math.random() * (CURVE_POINT_MAX_FLOAT_TIME - CURVE_POINT_MIN_FLOAT_TIME) + CURVE_POINT_MIN_FLOAT_TIME;
  this.xVariance = Math.max(Math.random() * this.z * (CURVE_POINT_MAX_FLOAT_X_DIST), CURVE_POINT_MIN_FLOAT_DIST);
  this.xMin = this.x - this.xVariance / 2;
  this.xAnimOffset = Math.random() * Math.PI;

  this.yAnimTime = Math.random() * (CURVE_POINT_MAX_FLOAT_TIME - CURVE_POINT_MIN_FLOAT_TIME) + CURVE_POINT_MIN_FLOAT_TIME;
  this.yVariance = Math.max(Math.random() * this.z * (CURVE_POINT_MAX_FLOAT_Y_DIST), CURVE_POINT_MIN_FLOAT_DIST);
  this.yMin = this.y - this.yVariance / 2;
  this.yAnimOffset = Math.random() * Math.PI;
}
CurvePoint.prototype = {
  getCps: function () {
    return [
      {
        x: this.x - this.cpLength,
        y: this.y - this.cpYOffset
      },
      {
        x: this.x + this.cpLength,
        y: this.y + this.cpYOffset
      }
    ]
  },
  updatePosition: function () {
    if (!this.startTime)
      this.startTime = new Date().getTime();
    var now = new Date().getTime();
    var deltaTime = now - this.startTime;

    this.x = this.xMin + (Math.sin((deltaTime / this.xAnimTime) * Math.PI + this.xAnimOffset) * .5 + .5) * this.xVariance;
    this.x += this.z * (1 - mouseXPercentage * 2) * MOUSE_X_OFFSET;
    this.y = this.yMin + (Math.sin((deltaTime / this.yAnimTime) * Math.PI + this.yAnimOffset) * .5 + .5) * this.yVariance;
    this.y += this.z * (1 - mouseYPercentage * 2) * MOUSE_Y_OFFSET;
  }
}

/**
 *  Brushes
 *  Jitters are created on init
 *  @param curve - what curve the brush sits on
 *  @param z - where on the line the brush sits
 */
var Brush = function (curve, z, color, noScale) {
  this.curve = curve;
  this.z = z;
  this.alpha = z * Math.random() * .55 + .15;
  this.scaleYMod = (1 - BRUSH_MIN_SCALE_Y) * Math.random();
  this.scaleXMod = .5 * Math.random() * (2 - this.scaleYMod * 2);
  this.noScale = !!noScale;
  this.color1 = color || "rgb(50, 170, 82)";

  // timings
  this.alphaAnimTime = Math.random() * (BRUSH_MAX_ANIM_TIME - BRUSH_MIN_ANIM_TIME) + BRUSH_MIN_ANIM_TIME;
  this.alphaVariance = Math.max(Math.random() * BRUSH_MAX_ALPHA_VARIANCE, this.alpha);
  this.alphaMin = Math.max(this.alpha - this.alphaVariance / 2, 0);
  this.alphaAnimOffset = Math.random() * Math.PI;

  this.scaleYAnimTime = Math.random() * (BRUSH_MAX_ANIM_TIME - BRUSH_MIN_ANIM_TIME) + BRUSH_MIN_ANIM_TIME;
  this.scaleYVariance = Math.random() * BRUSH_MAX_SCALE_Y_VARIANCE;
  this.scaleYMin = this.scaleY - this.scaleYVariance / 2;
  this.scaleYAnimOffset = Math.random() * Math.PI;

  this.zAnimOffset = this.curve.vanishingPoint.z - (z - this.curve.vanishingPoint.z);
  this.zAnimTime = Math.random() * (BRUSH_MAX_Z_ANIM_TIME - BRUSH_MIN_Z_ANIM_TIME) + BRUSH_MIN_Z_ANIM_TIME;

  if (this.noScale) {
    this.alphaMin = 0;
    this.alphaVariance = 1;
  }
}
Brush.prototype = {
  draw: function (ctx) {
    if (this.z < this.curve.vanishingPoint.z || this.z > this.curve.endPoint.z)
      return false;

    var point = this.curve.getPointAtZ(this.z);

    var alpha = ((.5 + .5 * Math.min(this.z, 1)) * this.alpha * this.curve.maxBrushAlpha);
    if (this.z - this.curve.vanishingPoint.z < BRUSH_ALPHA_DROPOFF) {
      alpha *= (this.z - this.curve.vanishingPoint.z) / BRUSH_ALPHA_DROPOFF;
    }
    else if (this.curve.endPoint.z - this.z < BRUSH_ALPHA_DROPOFF) {
      alpha *= (this.curve.endPoint.z - this.z) / BRUSH_ALPHA_DROPOFF;
    }

    if (!this.noScale) {
      var scaleY = this.z * this.scaleYMod + BRUSH_MIN_SCALE_Y;
      var scaleX = this.z * this.scaleXMod + .5;
    }
    else {
      var scaleY = this.scaleYMod + BRUSH_MIN_SCALE_Y;
      var scaleX = this.scaleXMod + .5;
    }

    ctx.fillStyle = this.color1;
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(point.x, point.y - scaleY * BRUSH_HEIGHT);
    ctx.quadraticCurveTo(point.x + scaleX * BRUSH_WIDTH / 2, point.y - scaleY * BRUSH_HEIGHT, point.x + scaleX * BRUSH_WIDTH / 2, point.y);
    ctx.quadraticCurveTo(point.x + scaleX * BRUSH_WIDTH / 2, point.y + scaleY * BRUSH_WIDTH, point.x, point.y + scaleX * BRUSH_WIDTH / 2);
    ctx.quadraticCurveTo(point.x - scaleX * BRUSH_WIDTH / 2, point.y + scaleY * BRUSH_WIDTH, point.x - scaleX * BRUSH_WIDTH / 2, point.y);
    ctx.quadraticCurveTo(point.x - scaleX * BRUSH_WIDTH / 2, point.y - scaleY * BRUSH_HEIGHT, point.x, point.y - scaleY * BRUSH_HEIGHT);
    ctx.fill();

    // ctx.globalAlpha = alpha;
    // ctx.drawImage(this.image, point.x - scaleX * BRUSH_WIDTH / 2, point.y - scaleY * BRUSH_HEIGHT, scaleX * BRUSH_WIDTH, scaleY * BRUSH_HEIGHT);
  },
  updatePosition: function () {
    if (!this.startTime)
      this.startTime = new Date().getTime() - 20000;
    var now = new Date().getTime();
    var deltaTime = now - this.startTime;

    this.alpha = Math.min(this.alphaMin + (Math.sin((deltaTime / this.alphaAnimTime) * Math.PI + this.alphaAnimOffset) * .5 + .5) * this.alphaVariance, 1);
    this.scaleY = this.scaleYMin + (Math.sin((deltaTime / this.scaleYAnimTime) * Math.PI + this.scaleYAnimOffset) * .5 + .5) * this.scaleYVariance;
    //this.z = this.zMin + (Math.sin((deltaTime / this.zAnimTime) * Math.PI + this.zAnimOffset) * .5 + .5) * this.zVariance;
    this.z = ((deltaTime / this.zAnimTime) + this.zAnimOffset) * this.curve.endPoint.z;
    if (this.z > this.curve.vanishingPoint.z)
      this.z *= this.z;
    if (this.z > this.curve.endPoint.z) {
      this.z = (this.z - this.curve.endPoint.z) + this.curve.vanishingPoint.z;
      // reset start time so it doesn't infinitely speed up
      this.startTime = now;
    }
  }
}

// make a canvas and do stuff
/**
 *  NorthernLights class
 *  Creates a canvas that immitates the northern lights
 *  @param parentElement - DOMElement to append the canvas to
 *  [@param width] - width of canvas, defaults to window size on creation
 *  [@param height] - height of canvas, defaults to window size on creation
 *  [@param curves] - an array of Curve objects to use, creates one if omitted
 */
var NorthernLights = function (parentElement, width, height, curves) {
  this.parentElement = parentElement;
  this.width = width || window.innerWidth;
  this.height = height || window.innerHeight;
  this.canvas = lightsCanvas;
  this.canvas.width = (this.width / 2);
  this.canvas.height = this.height;
  this.ctx = this.canvas.getContext('2d');
  this.ctx.globalCompositeOperation = "color-dodge";

  // make a new random curve if one wasn't passed
  this.curves = curves || [new Curve (this.width * .1, this.height * .9, this.width * .9, this.height * .4)];

  if (DEBUG) {
    this.fpsDisplay = document.createElement('span');
    this.fpsDisplay.style.position = "fixed";
    this.fpsDisplay.style.top = "0";
    this.fpsDisplay.style.left = "0";
    this.fpsDisplay.style.background = "#333";
    this.fpsDisplay.style.color = "#0f0";
    document.body.appendChild(this.fpsDisplay);
  }

  // auto start
  this.start();

  this.parentElement.appendChild(this.canvas);
  
}


NorthernLights.prototype = {
  start: function () {
    this.running = true;
    var _this = this;
    var lastTime = new Date().getTime();
    (function anim () {
      // clear current
      _this.ctx.clearRect(0,0,_this.width,_this.height);
      for (var i = 0, len = _this.curves.length; i < len; i++) {
        // update positions
        _this.curves[i].update();
        // put that bitch on the canvas
        _this.curves[i].draw(_this.ctx);
        // debug line?
        if (DEBUG) {
          _this.ctx.globalCompositeOperation = "source-over";
          _this.ctx.globalAlpha = 1;
          _this.curves[i].drawDebug(_this.ctx);
          _this.ctx.globalCompositeOperation = "color-dodge";

          var now = new Date().getTime();
          _this.fpsDisplay.innerText = Math.round(1000 / (now - lastTime));
          lastTime = now;
        }
      }
      if (_this.running)
        requestAnimationFrame(anim);
    })()
  },
  pause: function () {
    this.running = false;
  },
  getCanvas: function () {
    return this.canvas;
  },
  getCurves: function () {
    return this.curves;
  }
}

var gradCanvas = document.createElement('canvas');
var gradCtx = gradCanvas.getContext('2d');
var grad = gradCtx.createLinearGradient(window.innerWidth * .5, window.innerHeight, window.innerWidth * .35, 0);
grad.addColorStop(.4, "rgb(50, 130, 80)");
grad.addColorStop(.6, "rgba(100, 100, 120, .5)");
var grad2 = gradCtx.createLinearGradient(window.innerWidth * .5, window.innerHeight * .5, window.innerWidth * .3, 0);
grad2.addColorStop(.35, "rgb(50, 130, 140)");
grad2.addColorStop(.7, "rgba(50, 70, 100,.7)");

var curves = [
  new Curve (window.innerWidth * .17, window.innerHeight * .94, .01, window.innerWidth * .8, window.innerHeight * .8, .8, BRUSH_COUNT * .3, .4, "rgb(60, 150, 120)"),
  new Curve (window.innerWidth * .1, window.innerHeight * .9, .05, window.innerWidth * .8, window.innerHeight * .4, 1, null, .8, grad),
  new Curve (window.innerWidth * .25, window.innerHeight * .65, .33, window.innerWidth * .55, 0, 1.1, BRUSH_COUNT * .6, 1, grad2)
]
var nl1 = new NorthernLights (document.body, null, null, curves);

document.body.addEventListener('mousemove', function (e) {
  mouseXPercentage = e.clientX / window.innerWidth;
  mouseYPercentage = e.clientY / window.innerHeight;
})





//typewriter

var animatedText = document.getElementById('animated-text');

var typewriter = new Typewriter(animatedText,
  {
    loop: false,
    delay: 50
  });

typewriter.pauseFor(1000)
  .typeString('Look back to a past moment and the view widens as we keep growing distant. A new topology forms.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('Sometimes this shape gifts deeper understanding, but sometimes we see something that was never real.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('There is nothing solid in sand.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('Maybe archives can help us remember, and shelter our memories from the distorting flow of time.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('Archives transfigure ephemera and trace an outline around the fragments within to give them familiar form.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('This is how the archive becomes a stable location. A firm foundation - from which we can take flight.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('Because archiving is time travel.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString("By holding our memories in time, the archive is a place we can return to - even though there's no way back.")
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('As the past prints the future into the present, this portal also goes forward.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('The archive is an object through which a message can be sent.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('Within a future, and in all the din, one more beacon.')
  .pauseFor(1000)
  .pasteString('<br>')
  .typeString('He was here, and I loved him.');


      //skip text animation
      function fwdText() {
        document.getElementById( 'animated-text' ).style.display = 'none';
        document.getElementById( 'screen-reader' ).style.display = 'block';
        document.getElementById( 'forward' ).style.display = 'none';
      }