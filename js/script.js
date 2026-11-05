
//AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1500,
  });
  document.getElementById("only-section").classList.add("visible");
});

$(document).ready(function() {

    // Abrir y cerrar el menú móvil
    $("#boton-menu").click(function() {

        $("#nav-principal").toggleClass("max-h-0 max-h-[500px] opacity-0 opacity-100");

        // Actualizar el estado del botón
        let abierto = $(this).attr("aria-expanded") === "true";

        $(this).attr("aria-expanded", !abierto);

    });


    // Cerrar el menú al seleccionar una opción
    $("#menu a").click(function() {

        $("#nav-principal")
            .removeClass("max-h-[500px] opacity-100")
            .addClass("max-h-0 opacity-0");

        $("#boton-menu").attr("aria-expanded", "false");

    });

});

// ===== INDICADORES DE SECCIONES =====

$(document).ready(function() {

    // Seleccionar las secciones y sus indicadores
    let secciones = $("main section[id]");
    let indicadores = $("#indicadores-secciones a");

    // Actualizar el indicador según la sección visible
    function actualizarIndicadores() {

        let posicion = $(window).scrollTop() + ($(window).height() * 0.4);

        let seccionActual = secciones.first();

        // Detectar la sección actual
        secciones.each(function() {

            if ($(this).offset().top <= posicion) {
                seccionActual = $(this);
            }

        });

        // Obtener el ID de la sección
        let idActual = seccionActual.attr("id");

        // Actualizar el atributo del indicador correspondiente
        indicadores.each(function() {

            if ($(this).attr("href") === "#" + idActual) {

                $(this).attr("aria-current", "location");

            } else {

                $(this).removeAttr("aria-current");

            }

        });

    }


    // Actualizar al hacer scroll o cambiar el tamaño de pantalla
    $(window).on("scroll resize", actualizarIndicadores);


    // Comprobar el indicador al cargar la página
    actualizarIndicadores();


    // Navegación al pulsar los indicadores
    indicadores.on("click", function(e) {

        e.preventDefault();

        // Obtener el destino del enlace
        let destino = $($(this).attr("href"));

        // Comprobar que la sección existe
        if (destino.length) {

            // Desplazamiento suave hasta la sección
            $("html, body").stop().animate({

                scrollTop: destino.offset().top

            }, 700);

        }

    });

});