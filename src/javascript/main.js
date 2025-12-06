
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

    let result = 0;
    let unit = "";
    let formulaStr = "";
    let labelChart = "";

    // Lógica Ohm: V = I * R
    if (type === 'voltage') {
        // val1 = I, val2 = R
        result = val1 * val2;
        unit = "V";
        formulaStr = "V = I × R";
        generateChart(val2, 'voltage', val1); 
    } else if (type === 'current') {
        // val1 = V, val2 = R
        if (val2 === 0) { alert("La resistencia no puede ser 0"); return; }
        result = val1 / val2;
        unit = "A";
        formulaStr = "I = V / R";
        generateChart(val2, 'current', val1);
    } else if (type === 'resistance') {
        // val1 = V, val2 = I
        if (val2 === 0) { alert("La corriente no puede ser 0"); return; }
        result = val1 / val2;
        unit = "Ω";
        formulaStr = "R = V / I";
        generateChart(val2, 'resistance', result);
    }

    
    document.getElementById('resultValue').innerText = result.toFixed(2) + " " + unit;
    document.getElementById('formulaDisplay').innerText = formulaStr;
    
   
    document.getElementById('saveBtn').disabled = false;
    
    
    lastResult = {
        type: type,
        inputs: `${val1}, ${val2}`,
        result: result.toFixed(2) + " " + unit,
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