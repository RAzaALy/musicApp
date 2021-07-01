//add loader
var loader = document.getElementById("loading");

function load() {
  document.querySelector('.main').style.display= 'none'
  setTimeout(() => {
    loader.style.display = "none";
    document.querySelector('.main').style.display = 'flex';
  }, 1300);
}

const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
let totalDuration = document.getElementById("duration");
let initialTime = document.getElementById("currentTime");
const progressDiv = document.getElementById('progressDiv');
const songs = [
  {
    name: "music",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img.jpg",
  },
  {
    name: "music2",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img (2).jpg",
  },
  {
    name: "music3",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img (3).jpg",
  },
  {
    name: "music4",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img (4).png",
  },
  {
    name: "music5",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img (5).png",
  },
  {
    name: "music6",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img (6).png",
  },
  {
    name: "music7",
    title: "Lotus Lane",
    artist: "The Loyal",
    image: "img (7).png",
  },
];
let playing = false;
//for play functionality
const playMusic = () => {
  playing = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("animate");
};
//for pause functionality
const pauseMusic = () => {
  playing = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("animate");
};

play.addEventListener("click", () => {
  // if (playing) {
  //     pauseMusic();
  // } else {
  //     playMusic();
  // }
  playing ? pauseMusic() : playMusic();
});
//Changing the music Data:
const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  img.src = `images/${songs.image}`;
};
songIndex = 0;
// loadSong(songs[5]);
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};
const previousSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);

//progress timeline:
music.addEventListener("timeupdate", (e) => {
  // console.log(e);
  const { currentTime, duration } = e.srcElement;
  // console.log(currentTime,duration);
  let progressTime = (currentTime / duration) * 100;
  // console.log(progressTime);
  progress.style.width = `${progressTime}%`;

  // musicTotalDuration upate
  let minDuration = Math.floor(duration / 60);
  let secDuration = Math.floor(duration % 60);
  // console.log(minDuration, secDuration);
  if(secDuration < 10){
    secDuration = `0${secDuration}`;
  }
  if (duration) {
    totalDuration.textContent = `${minDuration}:${secDuration}`;
  }
  // musicCurrentDuration upate

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  
  // console.log(currentMin, currentSec);
  if(currentSec < 10){
    currentSec = `0${currentSec}`;
  }
  initialTime.textContent = `${currentMin}:${currentSec}`;
});
//Add onclick event on progress div:
progressDiv.addEventListener('click',(e) => {
  // console.log(e);
  const { duration } = music;
  let moveProgress = (e.offsetX / e.srcElement.clientWidth) * duration;
  // console.log((e.offsetX / e.srcElement.clientWidth) * duration);
  // console.log(moveProgress);
  music.currentTime= moveProgress;
});
//When one song is ended than nextsong played
music.addEventListener('ended',nextSong);