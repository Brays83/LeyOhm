# Calculadora de Ley de Ohm

Una aplicación web interactiva diseñada para ayudar a estudiantes de electrónica y física a comprender y calcular la relación entre **Voltaje**, **Corriente** y **Resistencia**.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-success)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

## Descripción

Esta herramienta permite a los usuarios ingresar dos valores conocidos de la Ley de Ohm para obtener el tercero automáticamente. Además del cálculo numérico, la aplicación genera gráficos en tiempo real para visualizar el comportamiento lineal de los componentes y guarda un historial de los cálculos realizados en el navegador.

## Funcionalidades Principales

1.  **Cálculo Automático:**
    * Calcula Voltaje (V), Corriente (I) o Resistencia (R).
    * Validación de entradas para evitar errores matemáticos (como dividir por cero).

2.  **Visualización Gráfica (Chart.js):**
    * Genera un gráfico lineal dinámico `y = mx` basado en los resultados.
    * Muestra la relación entre las variables manteniendo un valor constante.

3.  **Persistencia de Datos:**
    * Sistema de historial integrado usando **Local Storage**.
    * Los cálculos guardados permanecen disponibles incluso después de cerrar el navegador.



## Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Diseño responsivo, Flexbox y Variables CSS.
* **JavaScript (ES6):** Lógica de cálculo y manipulación del DOM.
* **Chart.js:** Librería externa para renderizado de gráficos.

## Estructura del Proyecto

```text
├── index.html      # Estructura principal 
├── src
    └── script.js       # Lógica, gráficos y manejo de storage
    └── styles.css      # Estilos