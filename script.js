const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

let COMBINATION=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn;
startGame()
restartButton.addEventListener('click',startGame)
function startGame(){
    circleTurn=false;
    winningMessageElement.classList.remove('show')
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener('click',handleClick,{once:true})
    })
    showBoardNextmove()
}

function handleClick(e){
    let cell=e.target
    let currentState=circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentState)

    if(checkWinner(currentState)){
         gameEnd(true)
    }else if(checkDraw()){
       
        gameEnd(false)
    }else{
        changeState() 
        showBoardNextmove()
    }
}

function gameEnd(gameStatus){
    if(gameStatus !== false){
        winningMessageTextElement.innerText=circleTurn ? `O is the winner ` : `X is the winner`
         
    }else{
        winningMessageTextElement.innerText="draw"
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell,currentState){
    cell.classList.add(currentState)
}

function changeState(){
    circleTurn = !circleTurn 
}

function showBoardNextmove(){
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkDraw(){
    return [...cellElements].every(cell=>cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))
}

function checkWinner(currentState){
    return COMBINATION.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentState)
        })
    })
}