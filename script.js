let chartInstance = null; // Variable global para almacenar la instancia del gráfico
    
function funcionMatematica(X, A, B, C, D, E) {
    let fraccion_1 = (Math.sin(A * X) + Math.cos(B * X)) / Math.sqrt(Math.abs(C + Math.pow(X, 2) + 1)); 
    let fraccion_2 = (Math.sin(D * X)) / (Math.sqrt(Math.abs(E) + Math.pow(X, 2) + 1));
    let fraccion_3 = Math.cos(X) / Math.sqrt(Math.pow(X, 2) + 2);
    return fraccion_1 + fraccion_2 + fraccion_3;
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let A = parseFloat(document.getElementById("a").value);
    let B = parseFloat(document.getElementById("b").value);
    let C = parseFloat(document.getElementById("c").value);
    let D = parseFloat(document.getElementById("d").value);
    let E = parseFloat(document.getElementById("e").value);
    let X_ini = parseFloat(document.getElementById("xMin").value);
    let X_fin = parseFloat(document.getElementById("xMax").value);
    let valores_x = [], valores_y = [], cortes_eje = 0;

    for (let i = X_ini; i <= X_fin + 0.05; i += 0.05) {
        valores_x.push(i.toFixed(2));
        valores_y.push(funcionMatematica(i, A, B, C, D, E).toFixed(4));
    }
    
    for(let i = 0; i < valores_y.length - 1; i++){
        // Para calcular los cortes debemos hacerlo de modo que los hallemos si vemos que un valor que era negativo paso a positivo, y visceversa.
        if((valores_y[i] < 0 && valores_y[i+1] > 0) || (valores_y[i + 1] < 0 && valores_y[i] > 0)){
            cortes_eje++;
        }
    }

    document.getElementById("yMinResultado").textContent = Math.min(...valores_y);
    document.getElementById("yMaxResultado").textContent = Math.max(...valores_y);
    document.getElementById("cortes").textContent = cortes_eje;

    // Llenar la tabla con los valores generados
    const tablaDatos = document.getElementById("tabla-datos");
    tablaDatos.innerHTML = ""; // Limpiar la tabla antes de llenarla de nuevo

    for (let i = 0; i < valores_x.length; i++) {
        let fila = document.createElement("tr");
        let celdaX = document.createElement("td");
        let celdaY = document.createElement("td");

        celdaX.textContent = valores_x[i];
        celdaY.textContent = valores_y[i];

        fila.appendChild(celdaX);
        fila.appendChild(celdaY);
        tablaDatos.appendChild(fila);
    }

    const ctx = document.getElementById('grafica').getContext('2d');

    // Si ya hay una gráfica, la destruimos antes de crear una nueva
    if (chartInstance !== null) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: valores_x,  // Eje X
            datasets: [{
                label: 'f(x)',
                data: valores_y,  // Eje Y
                borderColor: 'red',
                borderWidth: 2,
                fill: true,
                pointRadius: 1,  // Sin puntos en la línea
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'X' } },
                y: { title: { display: true, text: 'f(X)' } }
            }
        }
    });
});