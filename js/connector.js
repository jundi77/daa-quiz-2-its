import NQueenSolver from './NQueenSolver.js'
/*
Modification at connector.js:
    - fixed coordinate + fixed FEN positioning for result
*/
var timeStart;
var timeStop;

var pieceCount = 0;

var startBtn = document.getElementById("startBtn");
var clearBtn = document.getElementById("clearBtn");
var lockBoard = document.getElementById("lockBoard");

let solverNode = {
    panjang: 8,
    lebar: 8,
    posisi_queen: []
}

var config = {
    pieceTheme:"/assets/img/chesspieces/wikipedia/{piece}.png",
    draggable: true,
    dropOffBoard: 'trash',
    orientation: 'black',
    sparePieces: true,
    onDrop: onDrop
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

// querySelectorAll('row-5722c')[].querySelectorAll('square-55d63')[]//dapat area yang bisa diinjeksi

function onDrop(piece,target,newPos, oldPos){
    if(target != "offboard" && newPos == oldPos){
        pieceCount+=1;
        console.log("ok")
    }
    if(pieceCount == 8){
        $("[id^=bR-]")[0].style.visibility="hidden"
    }
}

function errorCallback(err) {
    timeStop = Math.floor(Date.now() / 1000);
    alert(err.message+ " at "+ (timeStop-timeStart)+"sec")
    reStart()
}

function successCallback(node) {
    timeStop = Math.floor(Date.now() / 1000);
    reStart()
    node.posisi_queen = setMove(...node.posisi_queen)
    myBoard.position(node.posisi_queen)
    alert(JSON.stringify(node)+" for "+ (timeStop-timeStart)+"sec")
}

function failedCallback() {
    timeStop = Math.floor(Date.now() / 1000);
    alert("Algo fail, running for "+ (timeStop-timeStart)+"sec")
    reStart()
}

function setMove(...item){
    var mv = []
    var y

    for(var i=0;i<item.length;i++){
        item[i] = item[i].join('')
        y = parseInt(item[i].charAt(1))
        if(item[i].charAt(0)=='0'){
            item[i]="n"
            item[i]=item[i].concat("7")
        }else if(item[i].charAt(0)!='0'&&item[i].charAt(0)!='7'){
            item[i]=item[i].charAt(0)
            item[i]=item[i].concat("n")
            item[i]=item[i].concat((7-parseInt(item[i].charAt(0))).toString())
        }else{
            item[i]="7"
            item[i]=item[i].concat("n")
        }
        mv[y] = item[i]
    }
    for(i = 0;i<8;i++){
        if(mv[i]!=null){
            continue
        }else{
            mv[i]='8'
        }
    }
    mv = mv.join('/')
    console.log(mv)

    return mv
}

function getKoor(item,index){
    solverNode.posisi_queen[index] = [(104%(item.charCodeAt(0))),(parseInt(item.charAt(1))-1)];
}

function reStart(){
    pieceCount = 0;
    myBoard.clear();
    lockBoard.className = ""
    startBtn.innerHTML = "Start Position";
    inputChess = new NQueenSolver(solverNode);
    $("[id^=bR-]")[0].style.visibility="visible"
    document.getElementById("clearBtn").style.visibility = "visible";
}

// var sg = [[0,6],[1,4],[2,2],[3,0],[4,5],[5,7],[6,1],[7,3]]

startBtn.onclick = function(){

    timeStart = Math.floor(Date.now() / 1000);

    // uncoment bellow & "var sg" to "how to use setMove()""
    // sg = setMove(...sg)
    // myBoard.position(sg)  

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
            console.log(solverNode.posisi_queen)
            
            window.inputChess=solverNode;
            
            inputChess.search(errorCallback, failedCallback, successCallback);
    
        }
    }
    //else if the algo took longertime to finish
    else if(lockBoard.className == "Freeze"){
        timeStop = Math.floor(Date.now() / 1000);
        inputChess.stop();
        inputChess = new NQueenSolver(solverNode);
        reStart();
        alert("Algorithm Timeout "+ (timeStop-timeStart)+"sec")
    }  
};

clearBtn.onclick = function(){
    myBoard.clear
    reStart()
}
