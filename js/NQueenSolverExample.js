/**
 * Contoh cara panggil kelas NQueenSolver
 */

import NQueenSolver from './NQueenSolver.js'
let test = new NQueenSolver({
    panjang: 5,
    lebar: 5,
    posisi_queen: [
        [0,0],
        [1,1]
        // ...
    ]
})

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
test.stop() // contoh cara stop

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