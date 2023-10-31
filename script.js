console.log("welcome");

let songIndex = 0;
let progress;
let audioElement = new Audio("songsList/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let songItem;
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

function updateMasterPlayButton() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  } else {
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  }
}

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    // masterPlay.classList.remove("fa-circle-pause");
    // masterPlay.classList.add("fa-circle-play");
  } else {
    audioElement.pause();
    // masterPlay.classList.remove("fa-circle-play");
    // masterPlay.classList.add("fa-circle-pause");
  }
  updateMasterPlayButton();
});

audioElement.addEventListener("timeupdate", () => {
  progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

function makeAllPlaying() {
  songItem.forEach((element) => {
    element.querySelector(".songItemplay").classList.remove("fa-circle-pause");
    element.querySelector(".songItemplay").classList.add("fa-circle-play");
  });
}

songItem.forEach((element, i) => {
  element.querySelector(".songItemplay").addEventListener("click", () => {
    if (songIndex === i) {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    } else {
      makeAllPlaying();
      element.querySelector(".songItemplay").classList.remove("fa-circle-play");
      element.querySelector(".songItemplay").classList.add("fa-circle-pause");

      masterSongName.innerText = songs[i].songName;
      songIndex = i;
      audioElement.src = songs[i].filePath;
      audioElement.play();
    }
    updateMasterPlayButton();
  });
});

previous.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  updateMasterPlayButton();
});

next.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  updateMasterPlayButton();
});
