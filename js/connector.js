import NQueenSolver from './NQueenSolver.js'

var startBtn = document.getElementById("startBtn");
var lockBoard = document.getElementById("lockBoard");

let solverNode = {
    panjang: 5,
    lebar: 5,
    posisi_queen: []
}

var config = {
    pieceTheme:"/assets/img/chesspieces/wikipedia/{piece}.png",
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
}

var myBoard = Chessboard('myBoard', config)
let inputChess = new NQueenSolver(solverNode)

function errorCallback(err) {
    alert(err.message)
    reStart()
}

function successCallback(node) {
    alert(JSON.stringify(node))
    reStart()
}

function failedCallback() {
    alert("Algo fail")
    reStart()
}

document.getElementsByClassName
function getKoor(item,index){
    solverNode.posisi_queen[index] = [(item.charCodeAt(0)) % 97,(8 % parseInt(item.charAt(1)))];
}

function reStart(){
    myBoard.clear();
    lockBoard.className = ""
    startBtn.innerHTML = "Start Position";
    inputChess = new NQueenSolver(solverNode);
    document.getElementById("clearBtn").style.visibility = "visible";
}

startBtn.onclick = function(){
    
    document.getElementById("clearBtn").style.visibility = "hidden";

    if(lockBoard.className == ""){
        lockBoard.className = "Freeze";
        startBtn.innerHTML = "Stop";   
        if(inputChess._haveDoneSearched == false){
            solverNode.posisi_queen = []
            document.querySelector('.board-b72b1').querySelectorAll('.piece-417db').forEach(el => {
                // console.log(el.parentNode.getAttribute('data-square'))
                solverNode.posisi_queen.push(el.parentNode.getAttribute('data-square'))
            })
    
            solverNode.posisi_queen.forEach(getKoor);
    
            window.inputChess=solverNode;
            
            // inputChess.search(errorCallback, failedCallback, successCallback);
    
        }
    }
    //else if the algo took longertime to finish
    else if(lockBoard.className == "Freeze"){
        inputChess.stop();
        inputChess = new NQueenSolver(solverNode);
        reStart();
    }    
};

$('#clearBtn').on('click', myBoard.clear)

