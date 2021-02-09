const searchSong = async () => {
  const searchInput = document.getElementById("search-input").value;
  const url = `https://api.lyrics.ovh/suggest/${searchInput}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displaySong(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displaySong = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.classList = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
    <div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>
    <audio controls>
    <source src="${song.preview}" type="audio/mp3">
  </audio>
  </div>
  <div class="col-md-3 text-md-right text-center">
    <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
  </div>
    `;
    songContainer.appendChild(songDiv);
  });
};

const getLyric = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayLyric(data.lyrics);
  } catch (error) {
    console.log(error);
  }
};

const displayLyric = (lyrics) => {
  const lyricContainer = document.getElementById("lyrics-container");
  lyricContainer.innerText = lyrics;
};
