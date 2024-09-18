console.log("Hello");
var num = 3;
let x = 4;
const y = 5;

console.log(num+x+y);

let items = [];
function Bon_Dia() {
    console.log("Helloo world");
    let inputValue = document.getElementById("Bon_Dia").value;  // Obtén el valor de l'input
    if (inputValue) {  // Assegura't que no s'afegeixin valors buits
        items.push(inputValue);  // Afegeix el valor a l'array items
        document.getElementById("mostra").innerHTML = items.length;  // indica la quantitat de vegades que es introdueix text al input 
        
    }
}

function mostra2(){
    var html = "<ul>";
    for (var i = 0; i < items.length; i++) {  // Recorre la llista d'elements
        html += "<li>" + items[i] +  " <button onclick='elimina("+i+")'>Eliminar</button></li>" ;  // Crea un element de llista per a cada element
    }
    html += "</ul>";
    document.getElementById("resultat").innerHTML = html;  // Mostra la llista d'elements de el text que se indica al input 
}


function elimina(){
    if (items.length > 0) {
    items.pop();  // Elimina l'últim element de l'array o la llista que guarda la informacio
    document.getElementById("mostra").innerHTML = items.length;  // Actualitza el nombre d'elements en la llista per eliminarlos 
    mostra2();  // Torna a mostrar la llista actualitzada
        } else {
             alert("No hi ha elements per eliminar");
}
}

function Comprovacio(e) {
    tecla = (document) ? e.keyCode : e.which; // Obté el codi de la tecla pressionada

    patron = /[^<>]/; // Defineix el patró per permetre només caràcters diferents de '<' i '>'
    tecla_final = String.fromCharCode(tecla); // Converteix el codi numèric de la tecla en el seu caràcter corresponent

    // Obté l'element on mostrar el missatge d'error
    var errorMessageElement = document.getElementById('error-message');

    if (!patron.test(tecla_final)) {
        // Si el caràcter no passa la comprovació (és '<' o '>'), actualitza el missatge d'error
        errorMessageElement.textContent = "No es permet este simbol";
        return false; // Bloqueja l'entrada del caràcter
    } else {
        // Si el caràcter és vàlid, esborra el missatge d'error
        errorMessageElement.textContent = "";
    }

    return true; // Permet l'entrada del caràcter si passa la comprovació
}


