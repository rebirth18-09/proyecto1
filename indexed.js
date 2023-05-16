let bd
function iniciar() {
    let boton = document.getElementById("Guardar");
    boton.addEventListener("click", agregardatos, false);
    var solicitud = indexedDB.open("Clinica"); 
    solicitud.onsuccess = function (e) {
        
    bd = e.target.result;
    }

    solicitud.onupgradeneeded = function (e) {
        bd = e.target.result;
        bd.createObjectStore("mascotas", { keyPath: "medico" });
    }
}

function agregardatos() {
    var medico = document.getElementById("medico").value;
    var especie = document.getElementById("especie").value;
    var sexo = document.getElementById("sexo").value;
    var raza = document.getElementById("raza").value;
    var color = document.getElementById("color").value;
    var nombre_mascota = document.getElementById("nombre_mascota").value;
    var fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    var nombre_propietario = document.getElementById("nombre_propietario").value;
    var telefono_propietario = document.getElementById("telefono_propietario").value;

    var transaccion = bd.transaction(["mascotas"], "readwrite");
    var almacen = transaccion.objectStore("mascotas");
    var agregar = almacen.add({
        medico: medico, 
        nombre: nombre_mascota, 
        especie: especie, 
        sexo: sexo, 
        raza: raza, 
        color: color, 
        fecha_nacimiento: fecha_nacimiento, 
        nombre_propietario: nombre_propietario, 
        telefono_propietario: telefono_propietario
    });

    agregar.addEventListener("success", mostrar, false);

    document.getElementById("medico").value = ""
    document.getElementById("raza").value = ""
    document.getElementById("color").value = ""
    document.getElementById("nombre_mascota").value = ""
    document.getElementById("fecha_nacimiento").value = ""
    document.getElementById("nombre_propietario").value = ""
    document.getElementById("telefono_propietario").value=""
}

window.addEventListener("load", iniciar, false);
