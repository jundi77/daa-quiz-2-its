import NQueenSolver from './NQueenSolver.js'
/*
New at connector.js:
    - setMove, to get string position
    - at succesCallBack added step for conversion (node) & showing result to the myBoard
*/
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
    orientation: 'black',
    sparePieces: true
}

var myBoard = Chessboard('myBoard', config)
let inputChess = new NQueenSolver(solverNode)

// To only show the black pieces
var pieces = document.getElementsByClassName("spare-pieces-7492f")
pieces[0].style.visibility="hidden"
pieces[1].style.paddingRight="5px"

// Wildcard to only show one queen pieces
var pieceColor = ["[id^=bK-]","[id^=bQ-]","[id^=bP-]","[id^=bB-]","[id^=bN-]"]
var test 

pieceColor.forEach(function(item){
    test = $(item)
    test[0].style.visibility="hidden"
}
)

function errorCallback(err) {
    alert(err.message)
    reStart()
}

function successCallback(node) {
    alert(JSON.stringify(node))
    reStart()
    
    node.posisi_queen = node.posisi_queen.forEach(function(item,index){
        node.posisi_queen[index] = item.join('')
        node.posisi_queen[index] = setMove(node.posisi_queen[index])
    })
    node.posisi_queen = node.posisi_queen.join('/')

    myBoard.position(uji)
}

function failedCallback() {
    alert("Algo fail")
    reStart()
}

function setMove(item){
    if(item.charAt(1)=='0'){
        item="n"// cat N
        item=item.concat("7")// cat 7
    }else if(item.charAt(1)=='0'||item.charAt(1)=='7'){
        item=item.charAt(1)
        item=item.concat("N")// cat N
        item=item.concat((7-parseInt(item.charAt(1))).toString())
    }else{
        item="7"// cat 7
        item=item.concat("n")// cat N
    }
    return item
}

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

