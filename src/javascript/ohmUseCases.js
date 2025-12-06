// ========== Casos de Uso ==========
import { calcularVoltaje, calcularCorriente, calcularResistencia } from './ohmEntity.js';

export function obtenerResultado(tipo, val1, val2) {
    let result = 0;
    let unit = "";
    let formulaStr = "";
    if (tipo === 'voltage') {
        result = calcularVoltaje(val1, val2);
        unit = "V";
        formulaStr = "V = I × R";
    } else if (tipo === 'current') {
        result = calcularCorriente(val1, val2);
        unit = "A";
        formulaStr = "I = V / R";
    } else if (tipo === 'resistance') {
        result = calcularResistencia(val1, val2);
        unit = "Ω";
        formulaStr = "R = V / I";
    }
    return { result, unit, formulaStr };
}
