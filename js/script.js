// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. LÓGICA DEL BUSCADOR
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = encodeURIComponent(searchInput.value.trim());
            if (nombre) {
                // IMPORTANTE: Como el JS está en la carpeta /js, 
                // la ruta debe apuntar a canciones/cancion.html
                window.location.href = `canciones/cancion.html?nombre=${nombre}`;
            }
        });
    }

    // 2. LÓGICA DE COMENTARIOS (Solo si existen los elementos en el HTML)
    const lista = document.getElementById("listaComentarios");
    const btnEnviar = document.getElementById("btnEnviar");
    const txtComentario = document.getElementById("comentarioTexto");

    if (lista && btnEnviar && txtComentario) {
        let comentarios = JSON.parse(localStorage.getItem("rockComentarios")) || [];
        
        const renderComentarios = () => {
            lista.innerHTML = comentarios
                .map(c => `<div class="comentario">${c}</div>`)
                .join("");
        };

        renderComentarios();

        btnEnviar.addEventListener("click", () => {
            if (txtComentario.value.trim() !== "") {
                comentarios.push(txtComentario.value.trim());
                txtComentario.value = "";
                localStorage.setItem("rockComentarios", JSON.stringify(comentarios));
                renderComentarios();
            }
        });
    }
});
// Botón moderno de opciones: mostrar/ocultar menú
document.addEventListener('DOMContentLoaded', function() {
	var btn = document.getElementById('optionsBtn');
	var dropdown = document.getElementById('optionsDropdown');
	if (btn && dropdown) {
		btn.addEventListener('click', function(event) {
			event.stopPropagation();
			dropdown.classList.toggle('show');
		});
		// Cierra el menú si se hace clic fuera
		document.addEventListener('click', function(event) {
			if (dropdown.classList.contains('show') && !event.target.closest('.options-menu')) {
				dropdown.classList.remove('show');
			}
		});
	}
});

/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/

const lista = document.getElementById("listaComentarios");
const btn = document.getElementById("btnEnviar");
const txt = document.getElementById("comentarioTexto");

// Si quieres guardar para que no se borren al recargar:
let comentarios = JSON.parse(localStorage.getItem("rockComentarios")) || [];

// Mostrar comentarios guardados al cargar
renderComentarios();

btn.addEventListener("click", () => {
  if (txt.value.trim() !== "") {
    comentarios.push(txt.value.trim());
    txt.value = "";

    // Guardar en el navegador
    localStorage.setItem("rockComentarios", JSON.stringify(comentarios));

    renderComentarios();
  }
});

function renderComentarios() {
  lista.innerHTML = comentarios
    .map(c => `<div class="comentario">${c}</div>`)
    .join("");
}
