		function guardarNombre() {
			let nombre = document.getElementById("nombre").value;
			localStorage.setItem("nombre", nombre);
			mostrarNombre();
		}

		function mostrarNombre() {
			let nombreGuardado = localStorage.getItem("nombre");
			let seccionResultado = document.getElementById("resultado");
			if (nombreGuardado) {
				seccionResultado.innerHTML = "El nombre guardado es: " + nombreGuardado;
			} else {
				seccionResultado.innerHTML = "No hay datos guardados.";
			}
		}

		function borrarNombre() {
			localStorage.removeItem("nombre");
			mostrarNombre();
		}