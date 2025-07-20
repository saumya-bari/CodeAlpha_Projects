const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const volume = document.getElementById('volume');

const songs = [
  { title: "Mood", artist: " 24kGoldn ft. Iann Dior", src: "music/song1.mp3" },
  { title: "PUT4 RARA, PUT MEXICANA[Tomato Tomato]", artist: "DJ Jeeh FDC, MC Menor MT, Yuri Redicopa e MC Pelé", src: "music/song2.mp3" },
  { title: "Childhood", artist: "Rauf & Faik", src: "music/song3.mp3" }
];

let currentSong = 0;

function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  audio.load();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
}

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  updateTime();
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

function updateTime() {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('ended', nextSong);
loadSong(currentSong);
