// Animación de mensajes (usando ChatGPT) ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const cinta = document.querySelector('.cinta');

  // Duplicar imágenes para crear bucle infinito
  cinta.innerHTML += cinta.innerHTML;

  let posX = 0;
  let velocidad = 0.5;
  let velocidadMensajes = 0.5;

  function moverCinta() {
    posX -= velocidad;

    // Reiniciar cuando ha avanzado la mitad del contenido duplicado
    if (Math.abs(posX) >= cinta.scrollWidth / 2) {
      posX = 0;
    }

    cinta.style.transform = `translateX(${posX}px)`;

    // Transición suave
    velocidad += (velocidadMensajes - velocidad) * 0.1;

    requestAnimationFrame(moverCinta);
  }

  // Evento para cada imagen
  const imagenes = cinta.querySelectorAll('img');

  imagenes.forEach(img => {
    img.addEventListener('mouseenter', () => {
      velocidadMensajes = 0.1; // Más lento al pasar el mouse
    });

    img.addEventListener('mouseleave', () => {
      velocidadMensajes = 0.5; // Volver a velocidad normal
    });
  });

  moverCinta();
});

//-------------------------------------------------------------------------------------------------------


//Cajas de texto tipo acordeon (usando chatgpt) ---------------------------------------------------------

//acordeon uno
document.addEventListener('DOMContentLoaded', () => {
  const footers = document.querySelectorAll('.acordeon-footer');

  footers.forEach(footer => {
    footer.addEventListener('click', () => {
      const contenido = footer.nextElementSibling;
      const flecha = footer.querySelector('.flecha');

      const visible = contenido.style.display === 'block';
      contenido.style.display = visible ? 'none' : 'block';
      flecha.textContent = visible ? '▼' : '▲';
    });
  });
});

//acordeon dos
document.addEventListener('DOMContentLoaded', () => {
  const footers = document.querySelectorAll('.acordeond-footer');

  footers.forEach(footer => {
    footer.addEventListener('click', () => {
      const contenido = footer.nextElementSibling;
      const flecha = footer.querySelector('.flecha');

      const visible = contenido.style.display === 'block';
      contenido.style.display = visible ? 'none' : 'block';
      flecha.textContent = visible ? '▼' : '▲';
    });
  });
});


//----------------------------------------------------------------------------------------------------------

//Galeria slider de arrastrar (usando chatgpt) -------------------------------------------------------------

 document.querySelectorAll('.sliderq').forEach(slider => {
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  let velocity = 0;
  let lastX = 0;
  let momentumID = null;

  // Prevenir arrastre de imágenes dentro de este slider
  slider.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    lastX = startX;
    velocity = 0;
    cancelMomentum();
    slider.style.cursor = 'grabbing';
  });

  slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
    applyMomentum();
  });

  slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
    applyMomentum();
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 0.4;
    velocity = x - lastX;
    lastX = x;
    slider.scrollLeft = scrollLeft - walk;
  });

  function applyMomentum() {
    momentumID = requestAnimationFrame(() => {
      velocity *= 0.95;
      if (Math.abs(velocity) > 0.5) {
        slider.scrollLeft -= velocity;
        applyMomentum();
      } else {
        cancelMomentum();
      }
    });
  }

  function cancelMomentum() {
    if (momentumID) {
      cancelAnimationFrame(momentumID);
      momentumID = null;
    }
  }
});

//----------------------------------------------------------------------------------------------------------


//Cartas (usando chatgpt)----------------------------------------------------------------------------------------------------------




//----------------------------------------------------------------------------------------------------------