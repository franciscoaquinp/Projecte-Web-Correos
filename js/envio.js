document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("envioForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        clearErrors();
        
        const dni = document.getElementById("dni").value.trim().toUpperCase();
        const origen = document.getElementById("origen").value;
        const destino = document.getElementById("destino").value;
        const pesoInput = document.getElementById("peso").value;

        let valido = true;

        if (!validarDNI(dni)) {
            showError("errorDni", "DNI inválido.");
            valido = false;
        }

        if (origen === "") {
            showError("errorOrigen", "Selecciona ciudad de origen.");
            valido = false;
        }

        if (destino === "") {
            showError("errorDestino", "Selecciona ciudad de destino.");
            valido = false;
        }

        if (pesoInput === "" || isNaN(parseFloat(pesoInput)) || parseFloat(pesoInput) <= 0) {
            showError("errorPeso", "Introduce un peso válido mayor que 0.");
            valido = false;
        }

        if (!valido) return;

        const peso = parseFloat(pesoInput);

        const precio = calcularPrecio(origen, destino, peso);

        document.getElementById("resultado").textContent =
            `Precio total del envío: ${precio.toFixed(2)} €`;
    });

    function showError(id, mensaje) {
        document.getElementById(id).textContent = mensaje;
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(e => e.textContent = "");
        document.getElementById("resultado").textContent = "";
    }

    function validarDNI(dni) {
        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        const regex = /^\d{8}[A-Z]$/;

        if (!regex.test(dni)) return false;

        const numero = parseInt(dni.substring(0, 8), 10);
        const letra = dni[8];

        return letras[numero % 23] === letra;
    }

    function calcularPrecio(origen, destino, peso) {
        let precioBase = 0;

        if (origen === destino) {
            precioBase = 5;
        } else if (origen === "palma" || destino === "palma") {
            precioBase = 9;
        } else {
            precioBase = 7;
        }

        if (peso < 10) {
            return precioBase;
        } else if (peso < 20) {
            return precioBase * 1.5;
        } else {
            return precioBase * 2;
        }
    }
});
