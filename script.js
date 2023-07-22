const content = document.querySelector(".content"),
      playImage = content.querySelector(".music-image img"),
      songName = content.querySelector(".music-titles .name"),
      album = content.querySelector(".music-titles .album"),
      audio = content.querySelector(".main-song"),
      play = content.querySelector(".play-pause"),
      playIcon = content.querySelector(".bx-play-circle"), 
      prev = content.querySelector("#prev"),
      next = content.querySelector("#next"),
      progress = content.querySelector(".progress"),
      progressBar = content.querySelector(".progress-bar"),
      repeat = content.querySelector("#repeat"),
      shuffle = content.querySelector("#shuffle");

let song = 1;

window.addEventListener("load" , () => {
    loadSong(song);
});

function loadSong(index){
    songName.innerHTML = songs[index-1].name;
    album.innerHTML = songs[index-1].album;
    playImage.src = `images/${songs[index-1].img}`;
    audio.src = `music/${songs[index-1].audio}.mp3`;
    playSong();
}

play.addEventListener("click",() =>{
    const songPaused = content.classList.contains("paused");
    if(songPaused){
        playSong();
    }
    else{
        pauseSong();
    }
})

function playSong(){
    content.classList.remove("paused");
    playIcon.classList.remove("bx-pause");
    playIcon.classList.add("bx-play-circle");
    audio.play();
}
function pauseSong(){
    content.classList.add("paused");
    playIcon.classList.remove("bx-play-circle");
    playIcon.classList.add("bx-pause");
    audio.pause();
}

next.addEventListener("click",()=>{
    nextSong();
});

prev.addEventListener("click", ()=>{
    prevSong();
});

function nextSong(){
    song++;
    if(song > songs.length){
        song=1;
    }

    loadSong(song);
}
function prevSong(){
    song--;
    if(song <= 0){
        song=songs.length;
    }
    
    loadSong(song);
}

audio.addEventListener("timeupdate" , (a)=>{
    const initialTime = a.target.currentTime; // current song timmings
    const totalTime = a.target.duration; // total length of the song;
    
    let barWidth = (initialTime / totalTime) * 100;
    progressBar.style.width = barWidth+"%";

    progress.addEventListener("click" , (a)=>{
        let progVal  = progress.clientWidth;
        let clickedOffset = a.offsetX;
        let songDuration = audio.duration;

        audio.currentTime = (clickedOffset / progVal ) * songDuration;
    });

    //final duration
    audio.addEventListener("loadeddata", ()=>{
        let endTimming = content.querySelector(".end");
        let fmin = Math.floor(audio.duration/60);
        let fsec = Math.floor(audio.duration%60);
        fsec<10?fsec="0"+fsec:fsec;

        endTimming.innerText = fmin+":"+fsec;
    });

    //current duration
    let currentTimming = content.querySelector(".current");
    let currentTime = audio.currentTime;
    let cmin = Math.floor(currentTime/60);
    let csec = Math.floor(currentTime%60);
    csec<10?csec="0"+csec:csec;

    currentTimming.innerText = cmin+":"+csec;

    if(audio.currentTime == audio.duration){
       nextSong();
    }

    repeat.addEventListener("click" , () => {
        audio.currentTime=0;
    });
});

shuffle.addEventListener("click", () => {
    var randomIndex = Math.floor(Math.random() * songs.length ) + 1;
    loadSong(randomIndex);
});

const home = document.querySelector(".home");