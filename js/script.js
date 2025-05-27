// Animación de mensajes (usando ChatGPT) ------------------------------------------------------------

function inicializaranimacionmensajes(){
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
}




//-------------------------------------------------------------------------------------------------------


//Cajas de texto tipo acordeon (usando chatgpt) ---------------------------------------------------------

//acordeon uno
function inicializaracordeonuno(){

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
}



//acordeon dos
function inicializaracordeondos(){
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
}


//----------------------------------------------------------------------------------------------------------

//Galeria slider de arrastrar (usando chatgpt) -------------------------------------------------------------

function inicializargaleriaslider(){
  /*Selecciona todos los elementos que tengan clase sliderq
     para guardarlos como una lista (foreEach), con la variable temporal slider
     recorre cada elemento*/
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
}
 

//----------------------------------------------------------------------------------------------------------


//Cartas (usando chatgpt)----------------------------------------------------------------------------------------------------------


function inicializarJuegoCartas() {
  // Variables internas del juego
  let primeraCarta = null;
  let segundaCarta = null;
  let bloqueo = false;

  // Función para reiniciar las cartas
  function reiniciarCartas() {
    primeraCarta = null;/*En una condición el valor null se toma como falso*/
    segundaCarta = null;
    bloqueo = false;
  }

  // Función para mostrar el popup
  function mostrarPopup(pareja) {
    /*También se puede 
    'popup-' + pareja. El ${} es un template literals, 
    Se usa dentro de comillas invertidas: ` `*/
    
    const popup = document.getElementById(`popup-${pareja}`);
    if (popup) popup.style.display = 'flex';/*se cambia la propiedad display del css para 
    que aparezca la ventana emergente*/ 
  }

  // Función para cerrar todos los popups
  window.cerrarPopup = function () {
    /*Selecciona todos los elementos que tengan clase popup
     para guardarlos como un arreglo (foreEach), con la variable temporal p
     recorre cada elemento y cambia la propiedad de display*/
    document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
  }

  // Agrega evento click a todo lo que tenga la clase .carta
  document.querySelectorAll('.carta').forEach(carta => {
    carta.addEventListener('click', () => /* el ()=> es la funcion flecha
    es como decir una función anonima*/{

    /*Condicional que indica que si la carta esta volteada
    o bloqueo = true retorna y no hace lo demas o si no hace la funcion*/
      if (bloqueo || carta.classList.contains('volteada')) return;

      carta.classList.add('volteada');/*Añade al elemento clickeado lo que tiene
      las propiedades de esta clase */

      if (!primeraCarta) {
        primeraCarta = carta;
      } else {
        segundaCarta = carta;
        bloqueo = true;

        /*dataset es una propiedad de los elementos del DOM en JavaScript 
        que te permite acceder a los atributos personalizados 
        que comienzan con data- en el HTML.
        por ejemplo si tienes data-pareja en el html, 
        puedes acceder con el js diciendo data.pareja*/  
        if (primeraCarta.dataset.pareja === segundaCarta.dataset.pareja) {
          const pareja = primeraCarta.dataset.pareja;
          setTimeout(() => {
            mostrarPopup(pareja);
            reiniciarCartas();/*Reinicia las variables para poder seguir seleccionando cartas*/
          }, 600);
        } else {/*El setTimeout es como un tipo de corrutina 1000 = 1 segundo*/
          setTimeout(() => {
            primeraCarta.classList.remove('volteada');
            segundaCarta.classList.remove('volteada');
            reiniciarCartas();
          }, 1000);
        }
      }
    });
  });
}

/*Esto es semejante a lo que hace un Start()
por eso con cada parte de codigo se convierte 
en una funcion para poder inicializarla aqui*/

document.addEventListener("DOMContentLoaded", () => {
  inicializarJuegoCartas();
  inicializargaleriaslider();
  inicializaracordeonuno();
  inicializaracordeondos();
  inicializaranimacionmensajes();
});

//----------------------------------------------------------------------------------------------------------