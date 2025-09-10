
/**
 * 
 * @param {String} carta recibe un string 
 * @param {Number} turno recibe el turno del jugador
 * @param {NodeList} divCartasJugadores referencia a los divs donde se insertan las cartas
 */

export const crearCarta = ( carta, turno, divCartasJugadores ) => {

    if (!carta ) throw new Error('La carta es un documento obligatorio');

    const imgCarta = document.createElement('img'); //Aqui creo el elmento HTML img
    imgCarta.src = `assets/cartas/${ carta }.png`; //Aqui se crea la carta
    imgCarta.classList.add('carta'); //classList devuelve un objeto especial que contiene todas las clases CSS que tiene ese elemento.
    //.add('carta') → agrega la clase carta a ese elemento. en mi index.html sería tener: <img class="carta" src="assets/cartas/10C.png" alt="">  
    divCartasJugadores[turno].append( imgCarta ); //En esta linea es donde le digo que en el div donde esta las cartas del jugador cree el elemento img

}