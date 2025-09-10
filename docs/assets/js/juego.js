const miModulo = (() => {

    'use strict'
    
    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias de HTML
    const btnPedir             = document.querySelector('#btnPedir'),
          btnDetener           = document.querySelector('#btnDetener'),
          btnNuevo             = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        //   divCartasJugador     = document.querySelector('#jugador-cartas'),
        //   divCartasComputadora = document.querySelector('#computadora-cartas'),
          puntosHtmlSmall      = document.querySelectorAll('small');


    //Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2) => {

        deck = crearDeck();//Llamado a la función para crear un deck
        puntosJugadores = [];
        console.clear();

        for(let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        
        puntosHtmlSmall.forEach(element => element.innerText = 0);
        divCartasJugadores.forEach(element => element.innerText = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    //Esta funcion crea un nuevo Deck
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ){
            for( let tipo of tipos){
                deck.push( i + tipo );
            }
        }

        for( let tipo of tipos){
            for (const esp of especiales) {
                deck.push( esp + tipo );
            }
        }

        return deck = _.shuffle( deck );
    }

    //Esta función me permite pedir una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    //Esta funcion sirve para obtener el valor de la carta
    const valorCarta = ( carta ) => {

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

    //Turno: 0 = primer jugador y el ultimo sera el computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtmlSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

            const imgCarta = document.createElement('img'); //Aqui creo el elmento HTML img
            imgCarta.src = `assets/cartas/${ carta }.png`; //Aqui se crea la carta
            imgCarta.classList.add('carta'); //classList devuelve un objeto especial que contiene todas las clases CSS que tiene ese elemento.
            //.add('carta') → agrega la clase carta a ese elemento. en mi index.html sería tener: <img class="carta" src="assets/cartas/10C.png" alt="">  
            divCartasJugadores[turno].append( imgCarta ); //En esta linea es donde le digo que en el div donde esta las cartas del jugador cree el elemento img

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if ( puntosMinimos === 21 ) {
                console.warn('21, Ganaste!!');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert('Ganaste!!')
            } else if ((puntosComputadora === puntosMinimos) && puntosComputadora <= 21){
                console.warn('Nadie gana');
                alert('Nadie gana')
            } else if (puntosComputadora === 21) {
                console.warn('21, Gano Computador!!'); //
                alert('21, Gano Computador!!')
            } else if (puntosComputadora > puntosMinimos && puntosComputadora < 21) {
                console.warn('21, Gano Computador!!');
                alert('21, Gano Computador!!')
            } else if (puntosComputadora > 21 ) {
                console.warn('Ganaste!!, Perdio Computadora');
                alert('Ganaste!!, Perdio Computadora')
            }  
        }, 400);

    }

    //TURNO de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        
        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1);

            if ( puntosMinimos > 21 ) {
                break;
            }

        }while( puntosComputadora < puntosMinimos && ( puntosComputadora <= 21 ) );

        determinarGanador();

    }

    //EVENTOS
    //Pedir Carta
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);
        
        setTimeout(() => {
            if ( puntosJugador > 21 ) {
                alert('Perdiste');
                console.warn('Perdiste :c');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            } else if ( puntosJugador === 21 ) {
                console.warn('21, Dale en botón detener para que juegue la computadora!!');
                btnPedir.disabled = true;
                turnoComputadora(puntosJugador);
                // btnDetener.disabled = true;
            }
        }, 100);
    });



    btnDetener.addEventListener('click', () => {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            //console.log(`puntos jugador ${puntosJugador}`)
            turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();

    });

    return {
       nuevoJuego: inicializarJuego 
    }

})();





