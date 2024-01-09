console.log("welcome");

// DOM
let songIndex = 0;
let progress;
let audioElement = new Audio("songsList/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let songItem;

// Songs : Name, Song, cover
let songs = [
  {
    songName: "Khaab - Akhil",
    filePath: "songsList/0.mp3",
    coverPath: "coversList/10.jpg",
  },

  {
    songName: "Nira Ishq - Guri",
    filePath: "songsList/12.m4a",
    coverPath: "coversList/5.jpg",
  },
  {
    songName: "lehenga - Jass Manak",
    filePath: "songsList/13.m4a",
    coverPath: "coversList/0.png",
  },
  {
    songName: "Sayad",
    filePath: "songsList/11.mp3",
    coverPath: "coversList/4.jpg",
  },
  {
    songName: "Kinna sona",
    filePath: "songsList/1.mp3",
    coverPath: "coversList/1.jpg",
  },
  {
    songName: "Tu Jo Mili - HinaKhan",
    filePath: "songsList/2.mp3",
    coverPath: "coversList/2.jpg",
  },
  {
    songName: "Tu Laung Main Elaachi",
    filePath: "songsList/3.mp3",
    coverPath: "coversList/3.jpg",
  },
  {
    songName: "Photo - Luka chuppi",
    filePath: "songsList/4.mp3",
    coverPath: "coversList/4.jpg",
  },

  {
    songName: "Duniaa - Luka chuppi",
    filePath: "songsList/5.mp3",
    coverPath: "coversList/5.jpg",
  },
  {
    songName: "Mummy nu pasnd nai tu",
    filePath: "songsList/6.mp3",
    coverPath: "coversList/6.jpg",
  },
  {
    songName: "Ranjha",
    filePath: "songsList/7.mp3",
    coverPath: "coversList/7.jpg",
  },

  {
    songName: "Rataan Lambiaa",
    filePath: "songsList/8.mp3",
    coverPath: "coversList/8.jpg",
  },
  {
    songName: "Sakhiyaan 2.0",
    filePath: "songsList/9.mp3",
    coverPath: "coversList/9.jpg",
  },
  {
    songName: "Saaho - Bad Boy",
    filePath: "songsList/10.mp3",
    coverPath: "coversList/0.png",
  },
];

function initialize() {
  songItem = Array.from(document.getElementsByClassName("songItem"));
  songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songNametitle")[0].innerText =
      songs[i].songName;
  });
}

initialize();

// The songItemPlay
function updateSongItemPlayButtonState(index) {
  const songItemPlayButtons = document.querySelectorAll(".songItemplay");
  const currentButton = songItemPlayButtons[index];

  if (
    !audioElement.paused &&
    audioElement.currentTime > 0 &&
    songIndex === index
  ) {
    // Update songItemPlay button
    currentButton.classList.remove("fa-circle-play");
    currentButton.classList.add("fa-circle-pause");
  } else {
    currentButton.classList.remove("fa-circle-pause");
    currentButton.classList.add("fa-circle-play");
  }
}

// The masterPlay button
function updateMasterPlayButton() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.body.classList.add("playing"); // Add 'playing' class to body
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    document.body.classList.remove("playing"); // Add 'playing' class to body
  }
}

// masterPlay Event Handler
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.setAttribute("title", "Pause");
  } else {
    masterPlay.setAttribute("title", "Play");
  }
  updateMasterPlayButton();
  updateSongItemPlayButtonState(songIndex);
});

// Progress Bar and the time update
audioElement.addEventListener("timeupdate", () => {
  progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;

  // Update the current time display
  const currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
  const currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
  document.getElementById("current-time").innerText =
    currentTimeMinutes +
    ":" +
    (currentTimeSeconds < 10 ? "0" : "") +
    currentTimeSeconds;
  updateSongItemPlayButtonState(songIndex);
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// songItemPlay button for the current song
function makeAllPlaying() {
  songItem.forEach((element) => {
    element.querySelector(".songItemplay").classList.remove("fa-circle-pause");
    element.querySelector(".songItemplay").classList.add("fa-circle-play");
  });
}

// The songItemsPlay  Update
songItem.forEach((element, i) => {
  element.querySelector(".songItemplay").addEventListener("click", () => {
    if (songIndex === i) {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateMasterPlayButton();
      } else {
        audioElement.pause();
        updateMasterPlayButton();
      }
    } else {
      makeAllPlaying();
      masterSongName.innerText = songs[i].songName;
      songIndex = i;
      audioElement.src = songs[i].filePath;
      audioElement.play();
    }
    updateMasterPlayButton();
    updateSongItemPlayButtonState(i);
  });
});

// Update Master Play when clicked on forward and backward  buttons
let updateMasterPlayFB = function () {
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  document.body.classList.add("playing"); // Add 'playing' class to body
};

// next and previous buttons
previous.addEventListener("click", () => {
  let prevIndex = songIndex;
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  updateMasterPlayFB();
  updateSongItemPlayButtonState(songIndex);
  updateSongItemPlayButtonState(prevIndex); // Update the previous song's button
});

let nextSong = () => {
  let prevIndex = songIndex;
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  updateMasterPlayFB();
  updateSongItemPlayButtonState(songIndex);
  updateSongItemPlayButtonState(prevIndex); // Update the previous song's button
};
next.addEventListener("click", nextSong);

// Play the next song when the current song is end
audioElement.addEventListener("ended", () => {
  nextSong();
  updateSongItemPlayButtonState(songIndex);
});

// skip 10 second buttons
function skipBackward() {
  audioElement.currentTime -= 10;
}
function skipForward() {
  audioElement.currentTime += 10;
}
document.getElementById("previousSec").addEventListener("click", skipBackward);
document.getElementById("nextSec").addEventListener("click", skipForward);

// // ////////////////////////////////////////////////////////////////////
