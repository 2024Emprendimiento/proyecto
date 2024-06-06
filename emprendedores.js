const emprendedor = {
    nombreEmp: undefined,
    nombre: undefined,
    producto: undefined,
    contacto: undefined,
    redesSociales: undefined,
    directorio: undefined
};

const emprendedores = CargarDatos("emprendedores");

// Obtener referencia al formulario Emprendedores
var formularioEmprendedores = document.getElementById("frmEmprendedores");

// Agregar evento de envío al formulario
formularioEmprendedores.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Validar los campos del formulario Emprendedores
    emprendedor.nombreEmp = document.getElementById("nombreEmp").value;
    emprendedor.nombre = document.getElementById("nombre").value;
    emprendedor.producto = document.getElementById("producto").value;
    emprendedor.contacto = document.getElementById("contacto").value;
    emprendedor.redesSociales = document.getElementById("redes").value;
    emprendedor.directorio = document.getElementById("directorioEmp").value;

    if (!soloLetrasExp.test(emprendedor.nombreEmp)) {
        alert("El campo Nombre del emprendimiento solo debe contener letras y espacios.");
        return;
    }

    if (!soloLetrasExp.test(emprendedor.nombre)) {
        alert("El campo Nombre solo debe contener letras y espacios.");
        return;
    }

    if (!soloLetrasExp.test(emprendedor.producto)) {
        alert("El campo Producto solo debe contener letras y espacios.");
        return;
    }

    if (!soloNumerosExp.test(emprendedor.contacto)) {
        alert("El campo Contacto debe contener números válidos.");
        return;
    }

    if (!redSoscialExp.test(emprendedor.redesSociales)) {
        alert("El campo redes sociales debe contener solo letras.");
        return;
    }

    var registro = {
        nombreEmp: emprendedor.nombreEmp,
        nombre: emprendedor.nombre,
        producto: emprendedor.producto,
        contacto: emprendedor.contacto,
        redes: emprendedor.redesSociales,
        directorio: emprendedor.directorio
    };

    emprendedores.push(registro);
    EscribirArchivo("emprendedores", emprendedores)

    formularioEmprendedores.reset();
    MostrarDatosEmprendedores()
});

function MostrarDatosEmprendedores() {
    clearBox("listaEmprendimiento");

    var myTableDiv = document.getElementById("listaEmprendimiento");

    var table = document.createElement('TABLE');
    table.id = "table";
    //table.border = '1';
    //table.classList.add("table"); 

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var trh = document.createElement('TR');
    tableBody.appendChild(trh);
    AdicionarCampoEncabezado("Nombre Emprendimiento", trh);
    AdicionarCampoEncabezado("Nombre", trh);
    AdicionarCampoEncabezado("Producto", trh);
    AdicionarCampoEncabezado("Contacto", trh);
    AdicionarCampoEncabezado("Redes Sociales Instagram", trh);
    AdicionarCampoEncabezado("Directorio", trh);

    emprendedores.forEach(emprendedor => {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        AdicionarCampo(emprendedor.nombreEmp, tr);
        AdicionarCampo(emprendedor.nombre, tr);
        AdicionarCampo(emprendedor.producto, tr);
        AdicionarCampo(emprendedor.contacto, tr);
        AdicionarCampo(emprendedor.redes, tr);
        AdicionarCampo(emprendedor.directorio, tr);
    });

    myTableDiv.appendChild(table);
}

MostrarDatosEmprendedores();

/*
    Pasar a una librería
 */
// Expresiones regulares para validación
var soloLetrasExp = /^[A-Za-zÁÉÍÓÚáéíóúñÑ.\s]+$/;
var soloNumerosExp = /^\d+$/;
var emailExp = /^\S+@\S+\.\S+$/
var redSoscialExp = /@([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)/;


function EscribirArchivo(tipoPersona, datos) {
    localStorage.setItem(tipoPersona, JSON.stringify(datos))
}

function CargarDatos(tipoPersona) {
    const datos = localStorage.getItem(tipoPersona)

    if (!datos) {
        return []
    }

    return JSON.parse(datos)
}

function AdicionarCampo(valor, tr) {
    var td = document.createElement('TD');
    td.appendChild(document.createTextNode(valor));
    tr.appendChild(td);
}

function AdicionarCampoEncabezado(valor, tr) {
    var th = document.createElement('TH');
    th.appendChild(document.createTextNode(valor));
    tr.appendChild(th);
}

function clearBox(elementID) {
    var div = document.getElementById(elementID);

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function LeerArchivoEmprendedores() {
    const filename = 'emprendedores.json';

    fetch(filename)
        .then(resultado => resultado.json())
        .then(datos => {
            emprendedores = datos
        })
        .catch(error => console.log(error))
}

LeerArchivoEmprendedores()

var table = document.getElementById('table');
var selected = table.getElementsByClassName('active-row');
table.onclick = highlight;

function highlight(e) {
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'active-row';
}

function fnselect() {
    var element = document.querySelectorAll('.active-row');
    if (element[0] !== undefined) { //it must be selected
        alert(element[0].children[0].firstChild.data);
    }
}