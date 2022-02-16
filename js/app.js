/*---------------------------- Constants ------------------------------*/
const winningCombos = [
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

let boardSlots
let playerTurn 
let forWinner 

/*--------------------- Cached Element References ---------------------*/

const slots = document.querySelectorAll(".slots")
const mssgs = document.querySelector("#message")
const restartBtn = document.querySelector("#restart")
const body = document.querySelector("body")
const darkModeBtn = document.querySelector("#dark-mode-button")

/*--------------------------- Event Listeners -------------------------*/

slots.forEach(circles => circles.addEventListener("click", handleClick))
restartBtn.addEventListener("restart", init)
darkModeBtn.addEventListener("click", toggleLightDark)

/*------------------------------ Functions ----------------------------*/

init()



function init(){
  forWinner = null
  boardSlots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  playerTurn = 1
  restartBtn.setAttribute("hidden", true)
  mssgs.innerText = "Player 1 (RED) goes first!"
  render()
}

function handleClick (evt){
  let index = parseInt(evt.target.id)
  if (forWinner !== null || boardSlots[index] !== null){
    return
  }
  else{
    let add = 30
    while (boardSlots[index + add] !== null){
      add -= 6
    }
    boardSlots[index + add] = playerTurn
  }
  playerTurn *= -1
  restartBtn.removeAttribute("hidden")
  render()
}

function findWinner (){
  for (let i = 0; i < winningCombos.length; i++){
    let total = 0
    let combo = winningCombos[i]
    for (let i = 0; i < combo.length; i++){
      total += boardSlots[combo[i]]
    }
    let winValue = Math.abs(total)
    if(winValue === 4){
      forWinner = boardSlots[combo[i]]
      return forWinner
    }
    else if(winValue !== 4){
      if(boardSlots.includes(null) === false){
        forWinner = "T"
      }
      findMssgs
    }
  }
}

function findMssgs(){
  if (forWinner === 'T'){
    mssgs.innerText = "OH-NO! Looks like we've got a tie."
  }
  else if (forWinner !== null){
    mssgs.innerText = `${playerTurn === 1 ? 'Player 2 (YELLOW)' : 'Player 1 (RED)'} wins the game!`
  }
  else {
    mssgs.innerText = `Next: ${playerTurn === 1 ? 'Player 1 (RED)' : 'Player 2 (YELLOW)'}`
  }
}

function render(){
  for (let i = 0; i < boardSlots.length; i++){
    if (boardSlots[i] === 1){
      slots[i].style.background = "Red"
    }
    else if (boardSlots[i] === -1){
      slots[i].style.background = "Yellow"
    }
  }
  findWinner()
  findMssgs()
}