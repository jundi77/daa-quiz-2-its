/**
 * Contoh cara panggil kelas NQueenSolver
 */

import NQueenSolver from './NQueenSolver.js'
let test = new NQueenSolver({
    panjang: 8,
    lebar: 8,
    posisi_queen: [
        [0,0],
        [1,0],
        [2,0],
        [3,0],
        [4,0],
        [5,0],
        [6,0],
        // [1,1],
        // [1,1],
        // [1,1],
        // [1,1],
        // [1,1],
        // [1,1],
        // ...
    ]
})

window.test = test

function errorCallback(err) {
    alert(err.message)
}

function successCallback(node) {
    alert(JSON.stringify(node))
}

function failedCallback() {
    alert("Algo fail")
}

test.search(errorCallback, failedCallback, successCallback) // contoh cara panggil, fungsi ini async
// test.stop() // contoh cara stop

/**
 * Available methods:
 * 
 * - constructor (ofcourse :) )
 * - search (async)
 * - stop
 * - getFinishedNode
 * 
 * ! Highly recommended memakai syntax autocomplete untuk
 * ! memudahkan dirimu :)
 */