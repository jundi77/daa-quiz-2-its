import NQueenSolver from './NQueenSolver.js'

//pencet -> cek objek NQueenSolver (haveserach true/false) true =buat objek baru, else = msg gagal [true]-> 
// todo saat tombol dipilih, koordinatLama -> koordinatBaru [freeze piece agar tidak bergerak], objek NQueenSolver (test) memanggil method (search)  -> setelah search objek akan menjadi NULL
// harus dibuat objek baru lagi diakhri (pakai doneSearch)


var config = {
    pieceTheme:"/assets/img/chesspieces/wikipedia/{piece}.png",
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
}
var myBoard = Chessboard('myBoard', config)

let solverNode = {
    panjang: 5,
    lebar: 5,
    posisi_queen: []
}

let test = new NQueenSolver(solverNode)

document.querySelector('.board-b72b1').querySelectorAll('.piece-417db').forEach(el => {
    // console.log(el.parentNode.getAttribute('data-square'))
    solverNode.posisi_queen.push(el.parentNode.getAttribute('data-square'))
  })

window.test=solverNode