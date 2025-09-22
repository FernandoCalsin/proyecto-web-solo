// Sistema de búsqueda: alerta con el texto buscado
document.addEventListener('DOMContentLoaded', function() {
	var searchForm = document.getElementById('searchForm');
	var searchInput = document.getElementById('searchInput');
	if (searchForm && searchInput) {
		searchForm.addEventListener('submit', function(e) {
			e.preventDefault();
			var query = searchInput.value.trim();
			if (query) {
				alert('Buscando: ' + query);
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
