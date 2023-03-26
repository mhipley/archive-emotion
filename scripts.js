var a = document.getElementById("audio");
var v = document.getElementById("video");
var vPrev = document.getElementById("video-prev");
var vNext = document.getElementById("video-next");
var canvas = document.getElementById("c");
var context = canvas.getContext("2d");
var back = document.createElement("canvas");
var backcontext = back.getContext("2d");
var cw, ch, scale;

function fitCanvas() {
  cw = window.innerWidth;
  ch = window.innerHeight;
  
  if (cw >= ch) {
    canvas.width = ch;
    canvas.height = ch;
  } else {
    canvas.width = cw;
    canvas.height = cw;
  }
}

window.addEventListener("resize", () => {
  console.log("resized");
  fitCanvas();
});

fitCanvas();
// let MAX_ZOOM = 1;
// let MIN_ZOOM = 1;
// let cameraOffset = { x: cw / 2, y: ch / 2 };
// var preload = new Image();
// preload.onload = function () {
//   context.scale(MIN_ZOOM, MIN_ZOOM);
//   context.drawImage(preload, 0, 0, canvas.width, canvas.height);
// };
// preload.src = "/images/still.png";


function loadImage(v) {
  fitCanvas();
  if (v.paused) {
    let MAX_ZOOM = 1;
    let MIN_ZOOM = 1;
    let cameraOffset = { x: cw / 2, y: ch / 2 };

    context.scale(MIN_ZOOM, MIN_ZOOM);
    context.drawImage(preload, 0, 0, canvas.width, canvas.height);
  }
  else {
    return false;
  }
  

  // Start over!
  setTimeout(function () {
    loadImage(v);
  }, 0);

}

var preload = new Image();
preload.src = "/images/still.png";
preload.onload = function () {
  loadImage(v);
};    
    

const content = {
    songs: [
        {
            video: "videos/Video1.mp4",
            audio: "audio/01.wav",
            title: "Opening",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
        {
            video: "videos/Video2.mp4",
            audio: "audio/02.wav",
            title: "Dreams",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
        {
            video: "videos/Video3.mp4",
            audio: "audio/03.wav",
            title: "Home",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
        {
            video: "videos/Video4.mp4",
            audio: "audio/04.wav",
            title: "Rest Rework",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
        {
            video: "videos/Video5.mp4",
            audio: "audio/05.wav",
            title: "Gentle Night",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
        {
            video: "videos/Video5.mp4",
            audio: "audio/06.wav",
            title: "Lost in Time",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
        {
            video: "videos/Video6.mp4",
            audio: "audio/07.wav",
            title: "Rest",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare libero vel erat facilisis facilisis. Aenean tempus augue ante, sit amet lacinia felis semper quis.",
        },
    ]
}

    // const initIndex = 0;
    // var curIndex = initIndex;
    // if (curIndex > 0) {
    //   var prevIndex = curIndex - 1;
    // } else {
    //   var prevIndex = 6;
    // }
    // if (curIndex < 6) {
    //   var nextIndex = curIndex + 1;
    // } else {
    //   var nextIndex = 1;
    // }
    // var song = content.songs[initIndex];
    // var songPrev = content.songs[prevIndex];
    // var songNext = content.songs[nextIndex];
    // var aFile = song.audio;
    // var vFile = song.video;
    // var vFileNext = songNext.video;
    // var vFilePrev = songPrev.video;
    // v.src = vFile;
    // vPrev.src = vFilePrev;
    // vNext.src = vFileNext;
    // a.src = aFile;
    


    v.addEventListener(
      "play",
      () => {
          scale = canvas.width;
          drawVideo(v, context, backcontext, scale);
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
    
    function drawVideo(v, c, bc, scale) {
      fitCanvas();
      console.log(canvas.width);
      // canvas.width = scale;
      // canvas.height = scale;
      back.width = canvas.width;
      back.height = canvas.height;
      if (v.paused || v.ended) return false;

      
      // First, draw it into the backing canvas
      bc.drawImage(v, 0, 0, canvas.width, canvas.height);
      // Grab the pixel data from the backing canvas
      var idata = bc.getImageData(0, 0, canvas.width, canvas.height);
      var data = idata.data;
      // Loop through the pixels, turning them grayscale
      for (var i = 0; i < data.length; i += 4) {
        // var r = data[i];
        // var g = data[i+1];
        // var b = data[i+2];
        // var brightness = (3*r+4*g+b)>>>3;
        // data[i] = brightness;
        // data[i+1] = brightness;
        // data[i+2] = brightness;
      }
      idata.data = data;
      // Draw the pixels onto the visible canvas
      c.putImageData(idata, 0, 0);
      // Start over!
      setTimeout(function () {
        drawVideo(v, c, bc, scale);
      }, 0);
    }
    
    function playVideo() {
      v.play();
    }
    
    function pauseVideo() {
      v.pause();
    }
    
    function next() {
      if (curIndex <= 5) {
        curIndex = curIndex + 1;
      } else {
        curIndex = 0;
      }
    
      console.log(curIndex);
      var song = content.songs[curIndex];
      var aFile = song.audio;
      var vFile = song.video;
      v.src = vFile;
      a.src = aFile;
      v.play();
    }
    
    function prev() {
      if (curIndex > 0) {
        curIndex = curIndex - 1;
      } else {
        curIndex = 6;
      }
    
      var song = content.songs[curIndex];
      var aFile = song.audio;
      var vFile = song.video;
      v.src = vFile;
      a.src = aFile;
      v.play();
    }
    
    //toggle display of text modal
    function toggleText() {
      var x = document.getElementById("text-modal");
      if (x.style.top === "0px") {
        x.style.top = "-100vh";
      } else {
        x.style.top = "0px";
      }
    }


    function play1() {
        v.src = content.songs[0].video;
        a.src = content.songs[0].audio;
        v.play();
    }
    

    function play2() {
        v.src = content.songs[1].video;
        a.src = content.songs[1].audio;
        v.play();
    }
    

    function play3() {
        v.src = content.songs[2].video;
        a.src = content.songs[2].audio;
        v.play();
    }
    
    function play4() {
        v.src = content.songs[3].video;
        a.src = content.songs[3].audio;
        v.play();
    }

    function play5() {
        v.src = content.songs[4].video;
        a.src = content.songs[4].audio;
        v.play();
    }

    function play6() {
        v.src = content.songs[5].video;
        a.src = content.songs[5].audio;
        v.play();
    }

    function play7() {
        v.src = content.songs[6].video;
        a.src = content.songs[6].audio;
        v.play();
    }
    