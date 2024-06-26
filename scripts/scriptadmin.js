let JUEGOS = [{}];
const ANIADIR_JUEGO_BOTON = document.getElementById("botonAniadirJuego");
let juegosAux = {};

function aniadirJuego(nombre, precio, imagen, tipo){
    let nuevo = {
        titulo : nombre.toLowerCase(),
        precio : precio,
        img : imagen,
        tipo : tipo
    }
    
    
    cargarJuegoStorage(nuevo);    
}

function onClickAniadirJuego (){
    const formTitulo = document.getElementById("nuevoTitulo");
    const formPrecio = document.getElementById("nuevoPrecio");
    const formImg = document.getElementById("nuevoImg");
    const formTipo = document.getElementById("nuevoTipo");

    let tituloForm = formTitulo.value;
    tituloForm = tituloForm.toLowerCase();
    let precioForm = formPrecio.value;
    let imgForm = formImg.value;
    let tipoForm = formTipo.value;

    aniadirJuego(tituloForm, precioForm, imgForm, tipoForm);
    mostrarEnLista(tituloForm, precioForm, tituloForm);    
}

function mostrarEnLista(tit1, precio1, id1) {
    let tit2 = tit1.toLowerCase();
    let id2 = tit1.replace(/ /g, "");
    id2 = id1.toLowerCase();
    
    let listaAdmin = document.getElementById("listaAdmin");
    let fila = document.createElement("div");
    fila.setAttribute("class", "row");
    fila.setAttribute("id", id2);
    
    let col1 = document.createElement(`div`);
    col1.setAttribute("class", "col");
    col1.innerHTML = tit1;

    let col2 = document.createElement('div');
    col2.setAttribute("class", "col");
    col2.innerHTML = precio1;

    let col3 = document.createElement("div");
    col3.setAttribute("class", "col");
    
    let botonEditar = document.createElement("button");
    botonEditar.setAttribute("id", id2)
    botonEditar.innerHTML = "Editar";
    col3.appendChild(botonEditar);
    
    let botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("class", "botonsEliminar")
    botonEliminar.setAttribute("data-id", id2);
    botonEliminar.innerHTML= "X";
    col3.appendChild(botonEliminar);

    fila.appendChild(col1);
    fila.appendChild(col2);
    fila.appendChild(col3);
    listaAdmin.appendChild(fila);
}

function onClickEliminar(event){
    const botonClicado = event.target;
    const idCLick = botonClicado.getAttribute('data-id');
    let tituloABorrar = document.getElementById(idCLick);
    eliminarDeLista(idCLick);
    borrarDeStorage(idCLick);
}

function alCargar() {
    let JUEGOS = localStorage.getItem("juegosGuardados");
    if (JUEGOS != null) {       
        juegosAux = obtenerArrayJuegos();
        for (let i = 0; i < juegosAux.length; i++){
            let aux2 = juegosAux[i];
            let titAux = aux2.titulo;
            let precioAux = aux2.precio;
            mostrarEnLista(titAux, precioAux, titAux);
        }
    }

    let BOTONES_ELIMINAR = document.querySelectorAll('.botonsEliminar');
    BOTONES_ELIMINAR.forEach(boton => {
            boton.addEventListener("click", onClickEliminar);
        })
        
}

function eliminarDeLista(idLista) {
    let listaAdmin = document.getElementById("listaAdmin");
    let listaAEliminar = document.getElementById(idLista);
    listaAdmin.removeChild(listaAEliminar);
}
document.addEventListener("DOMContentLoaded", alCargar);
ANIADIR_JUEGO_BOTON.addEventListener("click", onClickAniadirJuego); 

