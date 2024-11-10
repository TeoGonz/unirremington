let expresion = 'a=b+c';
let caracteres = expresion.split('');
let pila = ['A'];
let i = 0;

console.log("Estado inicial de la pila:", pila);

while (i < caracteres.length) {
    let caracter = caracteres[i];
    let ultimoElemento = pila[pila.length - 1];
    let avanzar = true; // Por defecto, avanzamos al siguiente carácter

    console.log(`\nProcesando carácter '${caracter}' de la cadena:`);

    switch (ultimoElemento) {
        case 'A': // #1: Replace (D=I), Retenga

            // Validar si el carácter de entrada es inválido
            if (['+', '-', '*', '/', '(', ')', '=', 'FIN'].includes(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'A'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            console.log("#1: Replace (D=I), Retenga");
            pila.pop();
            pila.push('D', '=', 'I');
            avanzar = false; // Retener en el mismo carácter
            console.log("Estado de la pila:", pila);
            break;

        case 'I': // #2: Desapile, Avance

            // Validar si el carácter de entrada es inválido
            if (['+', '-', '*', '/', '(', ')', '=', 'FIN'].includes(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            console.log("#2: Desapile, Avance");
            pila.pop();
            avanzar = true; // Avanzar al siguiente carácter
            console.log("Estado de la pila:", pila);
            break;

        case '=': // Desapile y avance si el carácter es '='
            // Validar si el carácter de entrada es inválido
            if (['+', '-', '*', '/', '(', ')', 'FIN'].includes(caracter) || /[a-z]/i.test(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            if (caracter === '=') {
                console.log("Desapile y avance para '='");
                pila.pop();
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            }
            break;

        case ')': // Desapile y avance si el carácter es ')'

            if (['+', '-', '*', '/', '(', 'FIN'].includes(caracter) || !/[a-z]/i.test(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            if (caracter === ')') {
                console.log("Desapile y avance para ')'");
                pila.pop();
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            }
            break;

        case 'D':

            // Validar si el carácter de entrada es inválido
            if (['+', '*', '/', ')', '=', 'FIN'].includes(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            if (caracter === '-') { // Replace (LT), Avance
                console.log("Replace (LT), Avance para '-'");
                pila.pop();
                pila.push('L', 'T');
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            } else if (caracter === '(') { // Replace (LT), Retenga
                console.log("Replace (LT), Retenga para '('");
                pila.pop();
                pila.push('L', 'T');
                avanzar = false; // Retener en el mismo carácter
                console.log("Estado de la pila:", pila);
            } else if (caracter >= 'a' && caracter <= 'z') { // Replace (LT), Retenga para letras 'a' a 'z'
                console.log("Replace (LT), Retenga para letra de 'a' a 'z'");
                pila.pop();
                pila.push('L', 'T');
                avanzar = false; // Retener en el mismo carácter
                console.log("Estado de la pila:", pila);
            } else { // Caso por defecto para 'D' (podemos manejar otros casos si se requiere)
                console.log("No se realiza ninguna acción específica para este carácter con 'D'");
            }
            break;

        case 'L':

            if (['*', '/', '(', '='].includes(caracter) || /[a-z]/i.test(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            if (caracter === '+') { // #5: Replace (IT), Avance
                console.log("#5: Replace (LT), Avance");
                pila.pop();
                pila.push('L', 'T');
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            } else if (caracter === '-') { // #6: Replace (IT), Avance
                console.log("#6: Replace (IT), Avance");
                pila.pop();
                pila.push('I', 'T');
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            } else { // #7: Desapile, Retenga
                console.log("#7: Desapile, Retenga");
                pila.pop();
                avanzar = false; // Retener en el mismo carácter
                console.log("Estado de la pila:", pila);
            }
            break;

        case 'T':

            // Validar si el carácter de entrada es inválido
            if (['-', '*', '/', '(', ')', '=', 'FIN'].includes(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            console.log("#8: Replace (SF), Retenga");
            pila.pop();
            pila.push('S', 'F');
            avanzar = false; // Retener en el mismo carácter
            console.log("Estado de la pila:", pila);
            break;

        case 'F': // #12: Replace (P), Retenga

            // Validar si el carácter de entrada es inválido
            if (['+', '-', '*', '/', ')', '=', 'FIN'].includes(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            console.log("#12: Replace (P), Retenga");
            pila.pop();
            pila.push('P');
            avanzar = false; // Retener en el mismo carácter
            console.log("Estado de la pila:", pila);
            break;

        case 'S':
            if (caracter === '*') { // #9: Replace (ST), Avance
                console.log("#9: Replace (ST), Avance");
                pila.pop();
                pila.push('S', 'T');
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            } else if (caracter === '/') { // #10: Replace (ST), Avance
                console.log("#10: Replace (ST), Avance");
                pila.pop();
                pila.push('S', 'T');
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            } else { // #11: Desapile, Retenga
                console.log("#11: Desapile, Retenga");
                pila.pop();
                avanzar = false; // Retener en el mismo carácter
                console.log("Estado de la pila:", pila);
            }
            break;

        case 'P':

            // Validar si el carácter de entrada es inválido
            if (['+', '-', '*', '/', ')', '=', 'FIN'].includes(caracter)) {
                console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'I'`);
                rechazado = true; // Marcar como rechazo
                break;
            }

            if (caracter === '(') { // #13: Replace (D), Avance
                console.log("#13: Replace (D), Avance");
                pila.pop();
                pila.push('D');
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            }
            if (caracter >= 'a' && caracter <= 'z') { // Replace (LT), console.log("#14: Desapile, Avance");
                pila.pop();
                avanzar = true; // Avanzar al siguiente carácter
                console.log("Estado de la pila:", pila);
            }
            break;
        default:
            break;
    }

    // Avanzar solo si `avanzar` es `true`
    if (avanzar) {
        i++;
    }
}

const acciones = {
    L: () => console.log("Elemento 'L' procesado: #7Desapilado y retenido."),
    S: () => console.log("Elemento 'S' procesado: #11Desapilado y retenido."),
};

while (pila.length > 0) {
    const elemento = pila[pila.length - 1];
    if (acciones[elemento]) {
        pila.pop(); // Desapilamos el elemento
        acciones[elemento](); // Ejecutamos la acción correspondiente
    } else {
        console.log(`Rechazo: El elemento '${elemento}' no es válido.`);
        pila = []; // Vaciamos la pila para indicar rechazo y salir del ciclo
    }
}

// Verificar si la pila quedó vacía después de procesar
if (pila.length == 0) {
    console.log("\nLa pila está vacía después de procesar la cadena. La cadena fue aceptada.");
} else {
    console.log("\nLa pila no está vacía después de procesar la cadena. La cadena fue rechazada.");
}

console.log("\nResultado final de la pila:", pila);
