console.log("welcome");

let songIndex = 0;
let progress;
let elem;
let audioElement = new Audio("songsList/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");

let masterSongName = document.getElementById("masterSongName");

let next = document.getElementById("next");
let previous = document.getElementById("previous");

let songButton;

masterSongName.innerText = "LimitLess";

let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "LimitLess",
    filePath: "songsList/0.mp3",
    coverPath: "coversList/0.png",
  },
  {
    songName: "Warrio - Mortal (feat.loura brehm) [NCS Released]",
    filePath: "songsList/1.mp3",
    coverPath: "coversList/1.jpg",
  },
  {
    songName: "Cielo - huma-huma",
    filePath: "songsList/2.mp3",
    coverPath: "coversList/2.jpg",
  },
  {
    songName: "Deaf Kev",
    filePath: "songsList/3.mp3",
    coverPath: "coversList/3.jpg",
  },
  {
    songName: "Different Heaven",
    filePath: "songsList/4.mp3",
    coverPath: "coversList/4.jpg",
  },
];

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songNametitle")[0].innerText =
    songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (
    audioElement.paused ||
    masterPlay.paused ||
    audioElement.currentTime <= 0
  ) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    masterSongName.innerText = songs[songIndex].songName;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlaying = () => {
  Array.from(document.getElementsByClassName("songItemplay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemplay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlaying();

      songButton = e.target;

      elem = element;

      console.log("element", element);

      console.log("songButton", songButton);

      masterSongName.innerText = songs[e.target.id].songName;

      songIndex = parseInt(e.target.id);
      audioElement.src = `songsList/${songIndex}.mp3`;

      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");

      audioElement.play();
      audioElement.currentTime = 0;
      e.target.classList.add("fa-circle-pause");
      e.target.classList.remove("fa-circle-play");

      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

previous.addEventListener("click", () => {
  if (songIndex === 0) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `songsList/${songIndex}.mp3`;

  console.log("songButton :", songButton);

  audioElement.play();
  audioElement.currentTime = 0;

  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  masterSongName.innerText = songs[songIndex].songName;
});

next.addEventListener("click", () => {
  if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `songsList/${songIndex}.mp3`;

  audioElement.play();
  audioElement.currentTime = 0;

  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  masterSongName.innerText = songs[songIndex].songName;
});
