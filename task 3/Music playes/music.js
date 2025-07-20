const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

// Playlist Array
const songs = [
  { title: "Mood", artist: " 24kGoldn ft. Iann Dior", src: "music/song1.mp3" },
  { title: "PUT4 RARA, PUT MEXICANA[Tomato Tomato]", artist: "DJ Jeeh FDC, MC Menor MT, Yuri Redicopa e MC Pelé", src: "music/song2.mp3" },
  { title: "Childhood", artist: "Rauf & Faik", src: "music/song3.mp3" }
];

let currentSong = 0;

// Load a song
function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  audio.load();
  updatePlaylistHighlight();
}

// Play or pause
function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// Next & Previous
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

// Update progress
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  updateTime();
});

// Seek
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Time display
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

// Autoplay next
audio.addEventListener('ended', nextSong);

// Generate Playlist UI
function createPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      playBtn.textContent = "⏸";
    });
    playlistEl.appendChild(li);
  });
}

// Highlight current song
function updatePlaylistHighlight() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentSong);
  });
}

// Initialize
createPlaylist();
loadSong(currentSong);
