// Datos de ejemplo de canciones
const canciones = {
    "Imagine": {
        titulo: "Imagine",
        artista: "John Lennon",
        letra: `Imagine there's no heaven\nIt's easy if you try\nNo hell below us\nAbove us only sky...`,
        imagen: "imagenes/imagine.jpg"
    },
    "Yesterday": {
        titulo: "Yesterday",
        artista: "The Beatles",
        letra: `Yesterday\nAll my troubles seemed so far away...`,
        imagen: "imagenes/yesterday.jpg"
    },
    // Agrega más canciones aquí
};

// Obtener el nombre de la canción de la URL
function getParametro(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

window.addEventListener('DOMContentLoaded', function() {
    const nombreCancion = getParametro('nombre');
    const contenedor = document.getElementById('contenido-cancion');
    if (nombreCancion && canciones[nombreCancion]) {
        const cancion = canciones[nombreCancion];
        contenedor.innerHTML = `
            <h1>${cancion.titulo}</h1>
            <h2>${cancion.artista}</h2>
            <img src="${cancion.imagen}" alt="${cancion.titulo}" style="max-width:300px;display:block;margin:20px auto;">
            <pre style="white-space:pre-wrap;font-size:1.2em;">${cancion.letra}</pre>
        `;
    } else {
        contenedor.innerHTML = `<h2>Canción no encontrada</h2>`;
    }
});
