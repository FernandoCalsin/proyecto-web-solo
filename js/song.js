document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const nombreBusqueda = params.get("nombre")?.toLowerCase();

    const songData = cancionesDB[nombreBusqueda];

    const titleEl = document.getElementById("song-title");
    const lyricsEl = document.getElementById("song-lyrics-text");

    if (songData) {
        titleEl.textContent = songData.title;
        document.getElementById("song-artist").textContent = songData.artist;
        document.getElementById("song-album").textContent = "Álbum: " + songData.album;
        lyricsEl.innerText = songData.lyrics;
    } else {
        titleEl.textContent = "No encontrada";
        lyricsEl.textContent = "Letra no disponible.";
    }

    document.getElementById("btn-translation")?.addEventListener("click", () => {
        if (songData && songData.translation) {
            
            lyricsEl.innerText = (lyricsEl.innerText === songData.lyrics) 
                ? songData.translation 
                : songData.lyrics;
        }
    });
  
    document.getElementById("btn-back")?.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});