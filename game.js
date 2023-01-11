const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize
let elementsSize
const playerPosition = {
    x: undefined,
    y: undefined
}
const gitPosition = {
    x: undefined,
    y: undefined
}
window.addEventListener('load', resizeWindow)
window.addEventListener('resize', resizeWindow)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
document.addEventListener('keydown', presionarTecla)
function resizeWindow(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    elementsSize = canvasSize / 10
    startGame()
}
function startGame(){
    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'end'
    const map = maps[0]
    const mapsRows = map.trim().split('\n')
    const mapsRowColumns = mapsRows.map(row => row.trim().split(''))
    game.clearRect(0,0, canvasSize, canvasSize)
    mapsRowColumns.forEach((row, rowI) => {
        row.forEach((column, columnI) => {
            const emoji = emojis[column]
            const posX = elementsSize * (columnI + 1)
            const posY = elementsSize * (rowI + 1)
            if(column == 'O') {
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX
                    playerPosition.y = posY
                    console.log(playerPosition)
                }
            } else if(column == 'I'){
                gitPosition.x = posX
                gitPosition.y = posY
            }
            game.fillText(emoji, posX, posY)
        });
    });
    movePlayer() 
    // console.log(mapsRows);
    // console.log(mapsRowColumns);
    // for(let row = 1; row <= 10; row++){
    //     for(let column = 1; column <= 10; column++){
    //         game.fillText(emojis[mapsRowColumns[row - 1][column - 1]], elementsSize * column, elementsSize * row)
    //     }
        
    // }
}
function movePlayer(){
    const colisionRegaloX = playerPosition.x == gitPosition.x
    const colisionRegaloY = playerPosition.y == gitPosition.y
    const colisionRegalo = colisionRegaloX && colisionRegaloY
    if(colisionRegalo){
        console.log('Hubo colisiones')
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)   
}
function presionarTecla(event){
    if(event.key == 'ArrowUp') moveUp()
    else if(event.key == 'ArrowLeft') moveLeft()
    else if(event.key == 'ArrowRight') moveRight()
    else if(event.key == 'ArrowDown') moveDown()
}
function moveUp(){
    if((playerPosition.y - elementsSize) < elementsSize){
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize 
        startGame()
    }
}
function moveLeft(){
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize 
        startGame() 
        console.log(elementsSize)
    }
    
}
function moveRight(){
    if((playerPosition.x + elementsSize) > canvasSize + 11){
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize 
        console.log(playerPosition)
        console.log(canvasSize);
        startGame()
    }
}
function moveDown(){
    if ((playerPosition.y + elementsSize) > canvasSize + 11) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}