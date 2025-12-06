

// Importar casos de uso
import { obtenerResultado } from './ohmUseCases.js';

// ========== Controlador/Interfaz ==========
let currentChart = null;
let lastResult = null;


document.addEventListener('DOMContentLoaded', () => {
    updateInputs();
    loadHistory();
});

// UI
function updateInputs() {
    const type = document.getElementById('calcType').value;
    const label1 = document.getElementById('label1');
    const label2 = document.getElementById('label2');

    
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    
    if (type === 'voltage') {
        label1.innerText = "Corriente (I) en Amperios:";
        label2.innerText = "Resistencia (R) en Ohmios:";
    } else if (type === 'current') {
        label1.innerText = "Voltaje (V) en Voltios:";
        label2.innerText = "Resistencia (R) en Ohmios:";
    } else if (type === 'resistance') {
        label1.innerText = "Voltaje (V) en Voltios:";
        label2.innerText = "Corriente (I) en Amperios:";
    }
}

// Cálculo 
function calculate() {
    const type = document.getElementById('calcType').value;
    const val1 = parseFloat(document.getElementById('input1').value);
    const val2 = parseFloat(document.getElementById('input2').value);
    if (isNaN(val1) || isNaN(val2) || val1 < 0 || val2 < 0) {
        alert("Por favor ingresa valores numéricos positivos válidos.");
        return;
    }
    let resultado;
    try {
        resultado = obtenerResultado(type, val1, val2);
    } catch (e) {
        alert(e.message);
        return;
    }
    // Gráfico
    if (type === 'voltage') {
        generateChart(val2, 'voltage', val1);
    } else if (type === 'current') {
        generateChart(val2, 'current', val1);
    } else if (type === 'resistance') {
        generateChart(val2, 'resistance', resultado.result);
    }
    document.getElementById('resultValue').innerText = resultado.result.toFixed(2) + " " + resultado.unit;
    document.getElementById('formulaDisplay').innerText = resultado.formulaStr;
    document.getElementById('saveBtn').disabled = false;
    lastResult = {
        type: type,
        inputs: `${val1}, ${val2}`,
        result: resultado.result.toFixed(2) + " " + resultado.unit,
        date: new Date().toLocaleTimeString()
    };
}

//Gráficos 
function generateChart(constant, type, markerX) {
    const ctx = document.getElementById('ohmChart').getContext('2d');
    
    
    if (currentChart) {
        currentChart.destroy();
    }

  
    let xValues = [];
    let yValues = [];
    let label = "";

   
    for(let i = 0; i <= markerX * 2; i += (markerX * 2)/10) {
        let x = i;
        if(x === 0 && type !== 'voltage') x = 0.1; 

        xValues.push(x.toFixed(1));
        
        if (type === 'voltage') {
           
            yValues.push(x * constant);
            label = "Voltaje vs Corriente (R cte)";
        } else if (type === 'current') {
            
            yValues.push(x / constant);
            label = "Corriente vs Voltaje (R cte)";
        } else {
           
            yValues.push(x * markerX); 
            label = "Relación V-I de la Resistencia Resultante";
        }
    }

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: label,
                data: yValues,
                borderColor: '#4f46e5',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Local Storage
function saveCalculation() {
    if (!lastResult) return;

    let history = JSON.parse(localStorage.getItem('ohmHistory')) || [];
    history.push(lastResult);
    localStorage.setItem('ohmHistory', JSON.stringify(history));
    
    loadHistory();
    alert("Cálculo guardado exitosamente.");
}

function loadHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = "";
    const history = JSON.parse(localStorage.getItem('ohmHistory')) || [];

    history.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${item.type.toUpperCase()}</strong>: ${item.result}</span>
            <small>${item.date}</small>
        `;
        list.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('ohmHistory');
    loadHistory();
}