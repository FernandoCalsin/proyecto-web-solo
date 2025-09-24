// Datos de ejemplo de canciones
const canciones = {
    "Imagine": {
        titulo: "Imagine",
        artista: "John Lennon",
        letra: `Imagine there's no heaven\nIt's easy if you try\nNo hell below us\nAbove us only sky...`,
        imagen: "imagenes/imagine.jpg",
        youtube: "09LTT0xwdfw",
        pronunciacion: `Imáyin derz no jeven\nIts isi if yu trai\nNo jel bilou as\nAbov as onli skai...`
    },
    "Yesterday": {
        titulo: "Yesterday",
        artista: "The Beatles",
        letra: `Yesterday\nAll my troubles seemed so far away...`,
        imagen: "imagenes/yesterday.jpg",
        youtube: "NrgmdOz227I",
        pronunciacion: `Yésterdei\nOl mai trobols simd so far awéi...`
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
        <div class="contenedor-video">
            <iframe width="500" height="280" src="https://www.youtube.com/embed/${cancion.youtube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="caja-letra-pron">
            <div class="caja-letra">
                <h3>letra de la cancion</h3>
                <pre style="white-space:pre-wrap;font-size:1.1em;text-align:left;">${cancion.letra}</pre>
            </div>
            <div class="caja-pron">
                <h3>pronunciacion</h3>
                <pre style="white-space:pre-wrap;font-size:1.1em;text-align:left;">${cancion.pronunciacion}</pre>
            </div>
        </div>
        `;
    } else {
        contenedor.innerHTML = `<h2>Canción no encontrada</h2>`;
    }
});
