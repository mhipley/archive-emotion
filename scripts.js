    
    var v = document.getElementById('video');
    var a = document.getElementById('audio');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');
    var cw,ch,scale;
    var img = document.getElementById("preload");
    cw = window.innerWidth;
    ch = window.innerHeight;

  
    var preload = new Image();
    preload.onload = function() {
        context.drawImage(preload, 0, 0, cw, ch);
    };
    preload.src = "images/still.jpeg";
    

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

    const initIndex = 0;
    var curIndex = initIndex;
    var song = content.songs[initIndex];
    var aFile = song.audio;
    var vFile = song.video;
    v.src = vFile;
    a.src = aFile;

    v.addEventListener('play', () => {
        
        if (cw >= ch) {
            console.log("landscape");
            scale = ch;
            draw(v,context,backcontext,scale);
            playMusic();
        }
        else {
            console.log("portrait");
            scale = cw;
            draw(v,context,backcontext,scale);
            playMusic();
        }

        
    },false);

    window.addEventListener('resize', () => {
        console.log('resized');
        cw = window.innerWidth;
        ch = window.innerHeight;
        if (cw >= ch) {
            console.log("landscape");
            scale = ch;
            draw(v,context,backcontext,scale);
            playMusic();
        }
        else {
            console.log("portrait");
            scale = cw;
            draw(v,context,backcontext,scale);
            playMusic();
        }

    });

    v.addEventListener('pause', () => {
        pauseMusic();
    },false);



    
    function playMusic() {
        a.play();
    }

    function pauseMusic() {
        a.pause();
    }

    
    function draw(v,c,bc,scale) {
        canvas.width = scale;
        canvas.height = scale;
        back.width = scale;
        back.height = scale;
        if(v.paused || v.ended) return false;
        // First, draw it into the backing canvas
        bc.drawImage(v,0,0,scale,scale);
        // Grab the pixel data from the backing canvas
        var idata = bc.getImageData(0,0,scale,scale);
        var data = idata.data;
        // Loop through the pixels, turning them grayscale
        for(var i = 0; i < data.length; i+=4) {
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
        c.putImageData(idata,0,0);
        // Start over!
        setTimeout(function(){ draw(v,c,bc,scale,scale); }, 0);
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
    } 
    else {
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
    } 
    else {
        curIndex = 6;
    }

    var song = content.songs[curIndex];
    var aFile = song.audio;
    var vFile = song.video;
    v.src = vFile;
    a.src = aFile;
    v.play();

}

