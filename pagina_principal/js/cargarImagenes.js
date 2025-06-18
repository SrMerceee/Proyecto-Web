// Función para cargar las imágenes al cargar la página
window.onload = function () {
    fetch('/imagenes')
    .then(response => response.json())
    .then(data => {
        const imagenesDiv = document.getElementById('imagenesSubidas');
        data.forEach(imagen => {
        const imgDiv = document.createElement('div');
            imgDiv.innerHTML = 
                '<h3>' + imagen.nombre + '</h3>' +
                '<p>' + imagen.descripcion + '</p>' +
                '<img src="/imagenes/' + imagen.imagen + '" alt="' + imagen.nombre + '" width="200">';
            imagenesDiv.appendChild(imgDiv);
        });
    });
};