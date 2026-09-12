 const wrapper = document.getElementById('marqueeWrapper');
    const track = document.getElementById('marqueeTrack');

    let scrollPos = 0;
    let isDragging = false;
    let startX = 0;
    let speed = 1.2; // Velocidad de movimiento automático (puedes subirlo o bajarlo)
    let singleSetWidth = 0;

    // Calcular el ancho real de un grupo de tarjetas para hacer el bucle infinito perfecto
    function updateWidths() {
        // Como tenemos dos grupos iguales, la mitad del ancho del track es el ancho de un grupo
        singleSetWidth = track.scrollWidth / 2;
    }

    window.addEventListener('load', updateWidths);
    window.addEventListener('resize', updateWidths);

    // Bucle de animación automática y física de arrastre
    function step() {
        if (!isDragging) {
            scrollPos += speed; // Se mueve solo
            
            // Si llega al final del primer grupo, reinicia suavemente al principio para crear el bucle infinito
            if (scrollPos >= singleSetWidth) {
                scrollPos = 0;
            }
        }

        // Aplicar la posición
        track.style.transform = `translateX(${-scrollPos}px)`;
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    // Eventos para arrastrar con el Mouse o la mano en pantallas táctiles
    function startDrag(e) {
        isDragging = true;
        startX = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) + scrollPos;
    }

    function duringDrag(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        scrollPos = startX - currentX;

        // Controlar los límites del bucle mientras se arrastra manualmente
        if (scrollPos < 0) {
            scrollPos += singleSetWidth;
            startX += singleSetWidth;
        } else if (scrollPos >= singleSetWidth) {
            scrollPos -= singleSetWidth;
            startX -= singleSetWidth;
        }
    }

    function endDrag() {
        isDragging = false;
    }

    // Mouse events
    wrapper.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', duringDrag);
    window.addEventListener('mouseup', endDrag);

    // Touch events (para celulares)
    wrapper.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', duringDrag);
    window.addEventListener('touchend', endDrag);
