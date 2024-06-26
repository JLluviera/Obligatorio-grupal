let BOTON_CARRITO = document.getElementById("botonCarrito");

function setIndex(){
    let juegosAMostrar = localStorage.getItem("juegosGuardados");
    if (juegosAMostrar != null ) {
        juegosAMostrar = JSON.parse(juegosAMostrar);
        for (let i = 0; i < juegosAMostrar.length; i++) {
        mostrarJuegoNuevo(juegosAMostrar[i]);
        }
    }

    BOTON_CARRITO = document.getElementById("botonCarrito");    
    BOTON_CARRITO = document.addEventListener("click", onClickCarrito);

    let BOTONES_OBTENER = document.querySelectorAll('.botonObtener');
    BOTONES_OBTENER.forEach(boton => {
        boton.addEventListener("click", onClickObtener);
    })

    mostrarCarritoStorage();
}

function mostrarJuegoNuevo (juego) {

    let tituloAux = juego.titulo;
    let precioAux = `US$${juego.precio}`; 
    let imgAux = juego.img;
    tituloAux = tituloAux.toLowerCase();
    
    let contenedorHTML = document.getElementById("contenedorJuegos");
    let nuevoJuego = document.createElement("div");
    nuevoJuego.setAttribute("class", "juego")
    nuevoJuego.setAttribute("id", tituloAux);

    let nuevaFoto = document.createElement("img");
    nuevaFoto.setAttribute("source", imgAux);
    nuevaFoto.setAttribute("alt", tituloAux);
    nuevoJuego.appendChild(nuevaFoto);

    let nuevoTitulo = document.createElement("h6");
    nuevoTitulo.innerHTML =  juego.titulo;
    nuevoJuego.appendChild(nuevoTitulo);

    let nuevoPrecio = document.createElement("p");
    nuevoPrecio.innerHTML = precioAux;
    nuevoJuego.appendChild(nuevoPrecio);

    let botonNuevo = document.createElement("button"); 
    botonNuevo.setAttribute("type", "button");
    botonNuevo.setAttribute("class", "botonObtener");
    botonNuevo.setAttribute("data-id", tituloAux);
    botonNuevo.innerHTML = "Obtener";
    nuevoJuego.appendChild(botonNuevo);

    contenedorHTML.appendChild(nuevoJuego);
}

function onClickCarrito() { 
    let carrito = document.getElementById("carritoCard");
    if (carrito.style.display === "none") {
        carrito.style.display = 'block';  
    } else {
        carrito.style.display = 'none'
    }
}     

function aniadirAlCarrito(tituloCarrito, precioCarrito) {
    if (document.getElementById(`${tituloCarrito}Carrito`) === null) {
        let cardCarrito = document.getElementById("listaCarrito");
        let nuevoProd = document.createElement("li");
        let cont = document.createElement("p");
        cont.innerHTML = "1";
        cont.setAttribute("id", `${tituloCarrito}Cont`)
        nuevoProd.setAttribute("id", `${tituloCarrito}Carrito`);
        nuevoProd.innerHTML = `${tituloCarrito} - ${precioCarrito}`;

        cardCarrito.appendChild(nuevoProd);
        cardCarrito.appendChild(cont);
    } else {
        let productoCont = document.getElementById(`${tituloCarrito}cont`);
        productoCont = parseFloat(parseInt(productoCont) + 1); 
    }
}

function onClickObtener(event) {
    const botonClicado = event.target;
    const tituloClick = botonClicado.getAttribute('data-id');
    let juegoAObtener = buscarJuegoStorage(tituloClick);
    if (juegoAObtener != null) {
        aniadirAlCarrito(juegoAObtener.titulo, juegoAObtener.precio);
        cargarAlCarrito(juegoAObtener.titulo, juegoAObtener.precio);
    }    
}

document.addEventListener("DOMContentLoaded", setIndex);

