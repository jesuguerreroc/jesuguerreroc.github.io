// Primero inicializamos Muuri
const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

// Esperamos a que cargue la página
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // Filtrado por categorías
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('active'));
            evento.target.classList.add('active');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-category]') : grid.filter(`[data-category="${categoria}"]`);
        });
    });

    // Overlay de imágenes
    const overlay = document.getElementById('overlay');
    const imgOverlay = document.querySelector('#overlay img');
    const cerrarOverlay = document.getElementById('btn-cerrar-popup');

    // Agregamos el click a todas las imágenes
    document.querySelectorAll('.grid .item img').forEach((imagen) => {
        imagen.addEventListener('click', () => {
            const ruta = imagen.getAttribute('src');
            imgOverlay.src = ruta;
            overlay.classList.add('activo');
        });
    });

    // Cerrar overlay con el botón
    cerrarOverlay.addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    // Cerrar overlay haciendo click fuera de la imagen
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            overlay.classList.remove('activo');
        }
    });
});
