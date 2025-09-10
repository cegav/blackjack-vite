

/**
 * Obtener el valor de la carta
 * @param {String} carta recibe un string 
 * @returns {NUmber} Retorna un numero que es el valor de la carta
 */

//Esta funcion sirve para obtener el valor de la carta
export const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    // console.log(`clg en funcion valorCarta: ${valor}`)
    return (valor === 'A') ? 11 
        : (isNaN(valor) &&  (valor != 'A'))  ? 10 
        : parseInt( valor );

    // let puntos = 0 //FORMA DE REALIZARLO CON UN IF PERO ARRIBA USAMOS EN UN RETURN EL OPERADOR TERNARIO
    // if ( isNaN( valor ) ) {
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    // } else {
    //     puntos = parseInt(valor);
    // }
    //console.log({valor, puntos});
}