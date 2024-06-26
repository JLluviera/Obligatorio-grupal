function cargarJuegoStorage(juego) {
    let juegosStorage = localStorage.getItem("juegosGuardados");
    if (juegosStorage != null){
        juegosStorage = JSON.parse(juegosStorage);
        juegosStorage.push(juego);
        juegosStorage = JSON.stringify(juegosStorage);
        localStorage.setItem("juegosGuardados", juegosStorage)
    } else {
        juego = [juego];
        juego = JSON.stringify(juego);
        localStorage.setItem("juegosGuardados", juego);
            
    }
}

function obtenerArrayJuegos() {
    let array = localStorage.getItem("juegosGuardados");
    array = JSON.parse(array);
    return array
}

function cargarAlCarrito(tituloACarrito, precioACarrito) {
    let carritoStorage = localStorage.getItem("carrito");
    let carritoGuardar = {
        titulo : tituloACarrito,
        precio : precioACarrito,
        cant : 1,
    }
    if (carritoStorage != null) {
        if (buscarEnCarritoStorage(tituloACarrito) === null) {
            carritoStorage = JSON.parse(carritoStorage);
            carritoStorage.push(carritoGuardar);
            carritoStorage = JSON.stringify(carritoStorage);
            localStorage.setItem("carrito", carritoStorage);
        } else {
            actualizarCarrito(tituloACarrito);
        }
    } else {
        carritoGuardar = [carritoGuardar];
        carritoGuardar = JSON.stringify(carritoGuardar);
        localStorage.setItem("carrito", carritoGuardar);
    }
    
}

function buscarEnCarritoStorage(tituloBuscado) {
    let carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage != null) {
        carritoStorage = JSON.parse(carritoStorage);
        if (Array.isArray(carritoStorage)) {
            let producto = carritoStorage.find(obj => obj.titulo === tituloBuscado);
            return producto
        }
    } else {return null}
}


function actualizarCarrito(tituloACarrito) {
    let carritoStorage = localStorage.getItem("carrito");
    let productoEnCarrito = buscarEnCarritoStorage(tituloACarrito);
    if (productoEnCarrito != null) {
        productoEnCarrito.cant = parseInt(productoEnCarrito.cant) + 1;
        if (Array.isArray(productoEnCarrito)){
            let productoEnCarritoIndex = carritoStorage.findIndex(obj => obj.titulo === tituloACarrito);
            carritoStorage[productoEnCarritoIndex] = productoEnCarrito;
            carritoStorage = JSON.stringify(carritoStorage);
            localStorage.setItem("carrito", carritoStorage);
        }
    }
}

function buscarJuegoStorage(tituloBuscado) {
    let JUEGOS = localStorage.getItem("juegosGuardados");
    if (JUEGOS != null)  {
        JUEGOS = JSON.parse(JUEGOS);
        tituloBuscado = tituloBuscado.toLowerCase();
        let juegoBuscar = JUEGOS.find(obj => obj.titulo === tituloBuscado);
        return juegoBuscar
    } else {return null}
}

function buscarIndexJuego(tituloBuscado) {
    let JUEGOS = localStorage.getItem("juegosGuardados");
    if (JUEGOS != null)  {
        JUEGOS = JSON.parse(JUEGOS);
        const indice = JUEGOS.findIndex(obj => obj.titulo === tituloBuscado);
        return indice;
    } else {return null}
}

function borrarDeStorage(tituloABorrar) {
    let indexABorrar = buscarIndexJuego(tituloABorrar);
    if ((indexABorrar != null) && (indexABorrar != -1)) {
        let JUEGOS = localStorage.getItem("juegosGuardados");
        JUEGOS = JSON.parse(JUEGOS);
        JUEGOS.splice(indexABorrar, 1);
        JUEGOS = JSON.stringify(JUEGOS);
        localStorage.setItem("juegosGuardados", JUEGOS);
    }
}

function mostrarCarritoStorage() {
    let carritoStorageMostrar = localStorage.getItem("carrito");
    if ((carritoStorageMostrar != null)) {
        let titulosTodos = carritoStorageMostrar.map(carritoStorageMostrar => carritoStorageMostrar.titulo);
        let preciosTodos = carritoStorageMostrar.map(carritoStorageMostrar => carritoStorageMostrar.precio);
        for (let i = 0; i < carritoStorageMostrar.length; i++) {
            aniadirAlCarrito(titulosTodos[i], preciosTodos[i]);
        }
    }
}