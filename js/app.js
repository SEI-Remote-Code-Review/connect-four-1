/*---------------------------- Constants ------------------------------*/
const winCombos = [
  [0,1,2,3],
  [6,7,8,9],
  [12,13,14,15],
  [18,19,20,21],
  [24,25,26,27],
  [30,31,32,33],
  [1,2,3,4],
  [7,8,9,10],
  [13,14,15,16],
  [19,20,21,22],
  [25,26,27,28],
  [31,32,33,34],
  [2,3,4,5],
  [8,9,10,11],
  [14,15,16,17],
  [20,21,22,23],
  [26,27,28,29],
  [32,33,34,35],
  [0,6,12,18],
  [1,7,13,19],
  [2,8,14,20],
  [3,9,15,21],
  [4,10,16,22],
  [5,11,17,23],
  [6,12,18,24],
  [7,13,19,25],
  [8,14,20,26],
  [9,15,21,27],
  [10,16,22,28],
  [11,17,23,29],
  [12,18,24,30],
  [13,19,25,31],
  [14,20,26,32],
  [15,21,27,33],
  [16,22,28,34],
  [17,23,29,35],
  [8,13,3,18],
  [24,19,14,9],
  [19,14,9,4],
  [30,25,20,15],
  [25,20,15,10],
  [20,15,10,5],
  [11,16,21,26],
  [16,21,26,31],
  [17,22,27,32],
  [2,9,16,23],
  [1,8,15,22],
  [8,15,22,29],
  [0,7,14,21],
  [7,14,21,28],
  [14,21,28,35],
  [6,13,20,27],
  [13,20,27,34],
  [12,19,26,33],
]

/*-------------------------- Variables (state) ------------------------*/

let playerTurn, isWinner, boardSqr

/*--------------------- Cached Element References ---------------------*/

const lightDarkBtn = document.querySelector("#light-dark-button")
const replayBtn = document.querySelector("#replay")
const sqrs = document.querySelectorAll(".sqrs")
const mssgs = document.querySelector("#message")
const body = document.querySelector("body")

/*--------------------------- Event Listeners -------------------------*/

replayBtn.addEventListener("reset", init)
sqrs.forEach(square => square.addEventListener("click", handleClick))

/*------------------------------ Functions ----------------------------*/

init()


function init(){
  isWinner = null
  boardSqr = new Array(36).fill(null)
  playerTurn = 1
  replayBtn.setAttribute("hidden", true)
  render()
  mssgs.innerText = "Player 1, you are up first!"
}


function handleClick (evt){
  let index = parseInt(evt.target.id)
  if (isWinner !== null || boardSqr[index] !== null){
    return
  }
  else{
    let add = 30
    while (boardSqr[index + add] !== null){
      add -= 6
    }
    boardSqr[index + add] = playerTurn
  }
  playerTurn *= -1
  replayBtn.removeAttribute("hidden")
  render()
}


function render(){
  for (let i = 0; i < boardSqr.length; i++){
    if (boardSqr[i] === 1){
      sqrs[i].style.background = "Red"
    }
    else if (boardSqr[i] === -1){
      sqrs[i].style.background = "Yellow"
    }
  }
  getWinner()
  getMssgs()
}