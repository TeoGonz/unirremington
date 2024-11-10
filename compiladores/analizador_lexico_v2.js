let expresion = 'a=b+c';
let caracteres = expresion.split('');
let pila = ['A'];
let i = 0;

console.log("Estado inicial de la pila:", pila);

const acciones = {
    'A': () => {
        let caracter = caracteres[i];
        if (['+', '-', '*', '/', '(', ')', '=', 'FIN'].includes(caracter)) {
            console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'A'`);
            pila = []; // Vaciar la pila para indicar rechazo
            return true;
        }
        console.log("#1: Replace (D=I), Retenga");
        pila.pop();
        pila.push('D', '=', 'I');
        return false; // Retener en el mismo carácter
    },
    'I': () => {
        pila.pop();
        console.log("#2: Desapile, Avance");
        return true; // Avanzar al siguiente carácter
    },
    '=': () => {
        let caracter = caracteres[i];
        if (caracter === '=') {
            pila.pop();
            console.log("Desapile y avance para '='");
            return true; // Avanzar al siguiente carácter
        }
        console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado '='`);
        pila = [];
        return true;
    },
    'D': () => {
        let caracter = caracteres[i];
        if (caracter === '-') {
            pila.pop();
            pila.push('L', 'T');
            console.log("Replace (LT), Avance para '-'");
            return true;
        } else if (caracter === '(' || /[a-z]/i.test(caracter)) {
            pila.pop();
            pila.push('L', 'T');
            console.log(`Replace (LT), Retenga para '${caracter}'`);
            return false;
        }
        console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'D'`);
        pila = [];
        return true;
    },
    'L': () => {
        let caracter = caracteres[i];
        if (caracter === '+') {
            pila.pop();
            pila.push('L', 'T');
            console.log("#5: Replace (LT), Avance");
            return true;
        } else if (caracter === '-') {
            pila.pop();
            pila.push('I', 'T');
            console.log("#6: Replace (IT), Avance");
            return true;
        }
        pila.pop();
        console.log("#7: Desapile, Retenga");
        return false;
    },
    'T': () => {
        pila.pop();
        pila.push('S', 'F');
        console.log("#8: Replace (SF), Retenga");
        return false;
    },
    'S': () => {
        let caracter = caracteres[i];
        if (caracter === '*' || caracter === '/') {
            pila.pop();
            pila.push('S', 'T');
            console.log(`#${caracter === '*' ? '9' : '10'}: Replace (ST), Avance`);
            return true;
        }
        pila.pop();
        console.log("#11: Desapile, Retenga");
        return false;
    },
    'F': () => {
        pila.pop();
        pila.push('P');
        console.log("#12: Replace (P), Retenga");
        return false;
    },
    'P': () => {
        let caracter = caracteres[i];
        if (caracter === '(') {
            pila.pop();
            pila.push('D');
            console.log("#13: Replace (D), Avance");
            return true;
        } else if (/[a-z]/i.test(caracter)) {
            pila.pop();
            console.log("#14: Desapile, Avance");
            return true;
        }
        console.log(`Rechazo: el carácter '${caracter}' no es válido para el estado 'P'`);
        pila = [];
        return true;
    }
};

// Procesar cada carácter de la expresión
while (i < caracteres.length && pila.length > 0) {
    const ultimoElemento = pila[pila.length - 1];
    console.log(`\nProcesando carácter '${caracteres[i]}' de la cadena:`);
    const avanzar = acciones[ultimoElemento] ? acciones[ultimoElemento]() : true;
    console.log("Estado de la pila:", pila);
    if (avanzar) i++;
}

// Procesar los elementos restantes en la pila
while (pila.length > 0) {
    const elemento = pila[pila.length - 1];
    if (elemento === 'L' || elemento === 'S') {
        pila.pop();
        console.log(`Elemento '${elemento}' procesado y desapilado.`);
    } else {
        console.log(`Rechazo: El elemento '${elemento}' no es válido.`);
        pila = [];
    }
}

// Verificar si la pila quedó vacía después de procesar
if (pila.length === 0) {
    console.log("\nLa pila está vacía después de procesar la cadena. La cadena fue aceptada.");
} else {
    console.log("\nLa pila no está vacía después de procesar la cadena. La cadena fue rechazada.");
}
console.log("\nResultado final de la pila:", pila);