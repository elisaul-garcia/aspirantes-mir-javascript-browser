function esPalindromo(cadena) {
    cadena = cadena.toLowerCase().replace(/\s/g, ''); // convertir a minúsculas y quitar espacios
    const alReves = cadena.split('').reverse().join(''); // invertir cadena
    return alReves === cadena; // comparar cadena original con invertida
  }

  function comprobarPalindromo() {
    const texto = document.getElementById('texto').value;
    const resultado = document.getElementById('resultado');
    if (esPalindromo(texto)) {
      resultado.textContent = texto + " es un palíndromo";
    } else {
      resultado.textContent = texto + " no es un palíndromo";
    }
  }