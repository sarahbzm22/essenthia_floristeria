
// AOS: animaciones al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 1500,
    });
});


// INTERACCIONES CON JQUERY
$(document).ready(function () {

    // ABRIR Y CERRAR EL MENÚ MÓVIL
    $("#boton-menu").click(function () {
        $("#nav-principal").toggleClass("max-h-0 max-h-[500px] opacity-0 opacity-100");

        let abierto = $(this).attr("aria-expanded") === "true";
        $(this).attr("aria-expanded", !abierto);
    });


    // CERRAR EL MENÚ AL SELECCIONAR UNA OPCIÓN
    $("#menu a").click(function () {
        $("#nav-principal")
            .removeClass("max-h-[500px] opacity-100")
            .addClass("max-h-0 opacity-0");

        $("#boton-menu").attr("aria-expanded", "false");
    });


    // CAMBIAR ENTRE MODO CLARO Y OSCURO
$("#boton-tema").click(function () {

    $("html").toggleClass("dark");

    let modoOscuro = $("html").hasClass("dark");

    if (modoOscuro) {
        $("#icono-luna").hide();
        $("#icono-sol").show();
    } else {
        $("#icono-luna").show();
        $("#icono-sol").hide();
    }

    $(this).attr("aria-pressed", modoOscuro);

    $(this).attr(
        "aria-label",
        modoOscuro ? "Activar modo claro" : "Activar modo oscuro"
    );

});

});


// INDICADORES DE SECCIONES
$(document).ready(function () {

    let secciones = $("main section[id]");
    let indicadores = $("#indicadores-secciones a");

    // Detectar qué sección está visible
    function actualizarIndicadores() {
        let posicion = $(window).scrollTop() + ($(window).height() * 0.4);
        let seccionActual = secciones.first();

        secciones.each(function () {
            if ($(this).offset().top <= posicion) {
                seccionActual = $(this);
            }
        });

        let idActual = seccionActual.attr("id");

        // Actualizar el indicador activo
        indicadores.each(function () {
            if ($(this).attr("href") === "#" + idActual) {
                $(this).attr("aria-current", "location");
            } else {
                $(this).removeAttr("aria-current");
            }
        });
    }

    $(window).on("scroll resize", actualizarIndicadores);
    actualizarIndicadores();


    // DESPLAZAMIENTO SUAVE AL PULSAR UN INDICADOR
    indicadores.on("click", function (e) {
        e.preventDefault();

        let destino = $($(this).attr("href"));

        if (destino.length) {
            $("html, body").stop().animate({
                scrollTop: destino.offset().top
            }, 700);
        }
    });

});
