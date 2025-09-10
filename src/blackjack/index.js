import _ from 'underscore'

import { crearDeck, pedirCarta, valorCarta, crearCarta } from './usecases'

const miModulo = (() => {

    'use strict'
    
    let   deck       = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias de HTML
    const btnPedir           = document.querySelector('#btnPedir'),
          btnDetener         = document.querySelector('#btnDetener'),
          btnNuevo           = document.querySelector('#btnNuevo');

    const puntosHtmlSmall    = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');


    //Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2) => {

        deck = crearDeck(tipos, especiales);//Llamado a la función para crear un deck
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


    //Turno: 0 = primer jugador y el ultimo sera el computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtmlSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
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

            const carta = pedirCarta( deck );
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1, divCartasJugadores);

            if ( puntosMinimos > 21 ) {
                break;
            }

        }while( puntosComputadora < puntosMinimos && ( puntosComputadora <= 21 ) );

        determinarGanador();

    }

    //EVENTOS
    //Pedir Carta
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta( deck );
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0, divCartasJugadores);
        
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





