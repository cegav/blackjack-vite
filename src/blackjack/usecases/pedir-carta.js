/**
 * 
 * @param {Array<String>} deck Es un arreglo de string
 * @returns {String} Retorna una carta del deck
 */

//Esta función me permite pedir una carta
export const pedirCarta = ( deck ) => {

    if ( !deck || deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    return deck.pop();
}