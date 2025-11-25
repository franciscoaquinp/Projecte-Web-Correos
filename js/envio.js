document.getElementById("form-envio").addEventListener("submit", function(e) {
    e.preventDefault();

    const dni = document.getElementById("dni").value.trim();
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const resultado = document.getElementById("resultado");

    // Validación del DNI (8 dígitos + letra)
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
        return mostrarMensaje("❌ El DNI no es válido.");
    }

    // Validar peso
    if (isNaN(peso) || peso <= 0) {
        return mostrarMensaje("❌ El peso debe ser un número válido.");
    }

    // Cálculo de precio base por ciudades
    let precio = 0;

    if (origen === destino) precio = 5;
    else if (origen === "Palma" || destino === "Palma") precio = 9;
    else precio = 7;

    // Ajustes por peso
    if (peso >= 20) precio *= 2;
    else if (peso >= 10) precio *= 1.5;

    mostrarMensaje(`✔ Precio final del envío: <strong>${precio.toFixed(2)} €</strong>`);
});

function mostrarMensaje(msg) {
    const resultado = document.getElementById("resultado");
    resultado.style.display = "block";
    resultado.innerHTML = msg;
}
