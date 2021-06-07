import NQueenSolver from './NQueenSolver.js'

// todo

var config = {
    pieceTheme:"/assets/img/chesspieces/wikipedia/{piece}.png",
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
}
var myBoard = Chessboard('myBoard', config)

// myBoard.config.

// $('#startBtn').on('click', myBoard.start)
// $('#clearBtn').on('click', myBoard.clear)

let solverNode = {
    panjang: 5,
    lebar: 5,
    posisi_queen: []
}

let test = new NQueenSolver(solverNode)

document.querySelector('.board-b72b1').querySelectorAll('.piece-417db').forEach(el => {
    // console.log(el.parentNode.getAttribute('data-square'))
    test.posisi_queen.push(el.parentNode.getAttribute('data-square'))
  })

window.test=solverNode