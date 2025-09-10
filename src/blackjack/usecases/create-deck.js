import _ from 'underscore';

//Esta funcion crea un nuevo Deck

/**
 * 
 * @param {Array<String>} tiposDeCarta Ejemplo: ['C','D','H','S']
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A','J','Q','K']
 * @returns {Array} Retorna un nuevo deck de cartas
 */

export const crearDeck = ( tiposDeCarta, tiposEspeciales ) => {

    if ( !tiposDeCarta || tiposDeCarta.length === 0 ) 
        throw Error('tiposDeCarta es obligatorio como un arreglo de String');

    if ( !tiposEspeciales || tiposEspeciales.length === 0 ) 
    throw Error('tiposEspeciales es obligatorio como un arreglo de String');

    let deck = [];
    
    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tiposDeCarta){
            deck.push( i + tipo );
        }
    }

    for( let tipo of tiposDeCarta){
        for (const esp of tiposEspeciales) {
            deck.push( esp + tipo );
        }
    }

    return deck = _.shuffle( deck );
}