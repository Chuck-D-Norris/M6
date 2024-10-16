
let invoiceLines = [];
let savedInvoices = [];
let invoiceId = 0;

function agrega_linia() {
    const descripcio  = document.getElementById('descripcio').value;
    const quantitat = parseFloat(document.getElementById('quantitat').value);
    const preu = parseFloat(document.getElementById('preu').value);
    const subtotal = quantitat * preu;

    if (descripcio && quantitat > 0 && preu >= 0) {
        invoiceLines.push({ descripcio, quantitat, preu, subtotal });
        document.getElementById('descripcio').value = '';
        document.getElementById('quantitat').value = '';
        document.getElementById('preu').value = '';
        mostralinia();
        Calcul_Total();
    }
}


function mostralinia() {
    const tbody = document.querySelector('#invoiceLines tbody');
    tbody.innerHTML = '';
    invoiceLines.forEach((line, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${line.descripcio}</td>
            <td>${line.quantitat}</td>
            <td>${line.preu.toFixed(2)} €</td>
            <td>${line.subtotal.toFixed(2)} €</td>
            <td><button onclick="Eliminar(${index})">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function Eliminar(index) {
    invoiceLines.splice(index, 1);
    mostralinia();
    Calcul_Total();
}

function Calcul_Total() {
    let total = invoiceLines.reduce((sum, line) => sum + line.subtotal, 0);
    const discount = parseFloat(document.getElementById('discount').value) / 100;
    total -= total * discount;
    document.getElementById('total').textContent = `Total: ${total.toFixed(2)} €`;
}

function Guarda_Factura() {
    if (invoiceLines.length > 0) {
        const total = parseFloat(document.getElementById('total').textContent.split(' ')[1]);
        savedInvoices.push({ id: ++invoiceId, total, lines: [...invoiceLines] });
        renderSavedInvoices();
        resetInvoice();
    } else {
        alert('Afegiu línies a la factura abans de guardar!');
    }
}

function renderSavedInvoices() {
    const tbody = document.querySelector('#savedInvoices tbody');
    tbody.innerHTML = '';
    savedInvoices.forEach(invoice => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${invoice.total.toFixed(2)} €</td>
            <td>
                <button onclick="Vista_Factura(${invoice.id})">Veure</button>
                <button onclick="Eliminar_Factures(${invoice.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function Vista_Factura(id) {
    const invoice = savedInvoices.find(inv => inv.id === id);
    let invoiceDetails = 'Factura:\n\n';
    invoice.lines.forEach(line => {
        invoiceDetails += `Descripció: ${line.descripcio}\nQuantitat: ${line.quantitat}\nPreu: ${line.preu.toFixed(2)} €\nSubtotal: ${line.subtotal.toFixed(2)} €\n\n`;
    });
    invoiceDetails += `Total: ${invoice.total.toFixed(2)} €`;
    alert(invoiceDetails);
}

function Eliminar_Factures(id) {
    savedInvoices = savedInvoices.filter(inv => inv.id !== id);
    renderSavedInvoices();
}

function resetInvoice() {
    invoiceLines = [];
    document.getElementById('discount').value = 0;
    document.getElementById('total').textContent = 'Total: 0.00 €';
    mostralinia();
}
