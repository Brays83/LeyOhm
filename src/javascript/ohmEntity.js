// ========== Entidad (Dominio) ==========
// Ley de Ohm: funciones puras
export function calcularVoltaje(corriente, resistencia) {
    return corriente * resistencia;
}
export function calcularCorriente(voltaje, resistencia) {
    if (resistencia === 0) throw new Error("La resistencia no puede ser 0");
    return voltaje / resistencia;
}
export function calcularResistencia(voltaje, corriente) {
    if (corriente === 0) throw new Error("La corriente no puede ser 0");
    return voltaje / corriente;
}
