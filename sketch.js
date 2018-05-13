let tBlock, demoBlock;
let boardGame;
let fr;
let randomBlock;
let mySound, blockFallSound;
let isPressed;
let play = false;
let pause = 0;

const WIDTH_MAP = 450;
const HEIGHT_MAP = 560;


//const blockInstance = [new TBlock(0, 3), new IBlock(0, 3), new OBlock(0, 3), new LBlock(0, 3)
//  , new JBlock(0, 3), new SBlock(0, 3), new ZBlock(0, 3)]


let btnPause;
let btnQuit;

var myCanvas;




function setup() {

    //sound
    mySound = new Audio("sounds/Tetris.mp3");
    blockFallSound = new Audio("sounds/SFX_PieceHardDrop.ogg")
    mySound.volume = 0.2;
    mySound.play();
    // mySound.loop = true
    myCanvas = createCanvas(WIDTH_MAP, HEIGHT_MAP);
    myCanvas.parent('container');
    //board
    boardGame = new Board(10, 20);

    //block
    randomBlock = Math.floor(random(0, 7))
    tBlock = switchBlocks(randomBlock);

    //next block
    randomBlock = Math.floor(random(0, 7))
    demoBlock = switchBlocks(randomBlock);
    blockAlign(randomBlock, demoBlock)

    // menu
    btnPause = createButton('Pause');
    btnPause.parent('container');
    btnPause.position(WIDTH_MAP - 100, HEIGHT_MAP - 50);
    btnPause.mousePressed(pauseGame);
    //  btnPause.parent('canvas');




}

function pauseGame() {
    if (++pause % 2) {

        boardGame.pause();
        noLoop()
    } else loop();
}

function draw() {


    isPressed = false;
    fr = 20;

    background('#34495e');

    // demo text
    textSize(30);
    fill(255);
    textFont('century gothic');
    text('Next', 340, 30);

    //demo block
    noFill();
    rect(320, 40, 120, 120);



    frameRate(fr);

    if (frameCount % 20 == 0 && isPressed == false)
        tBlock.move(1, 0)

    demoBlock.draw();
    boardGame.drawBoard();
    keyMove();
    tBlock.draw();
    if (pause % 2) {

        boardGame.pause();

    }
    if (boardGame.collide(tBlock)) {
        blockFallSound.play();
        boardGame.merge(tBlock);


        tBlock = switchBlocks(randomBlock);
        randomBlock = Math.floor(random(0, 7))
        demoBlock = switchBlocks(randomBlock);
        blockAlign(randomBlock, demoBlock)
        boardGame.getScores();

        if (boardGame.collide(tBlock)) {
            boardGame.clear();
        }
        console.table(boardGame.matrix)
    }


}
var switchBlocks = function (key) {
    switch (key) {
        case 0:
            return new TBlock(0, 3)
        case 1:
            return new IBlock(0, 3)
        case 2:
            return new OBlock(0, 3)
        case 3:
            return new LBlock(0, 3)
        case 4:
            return new JBlock(0, 3)
        case 5:
            return new SBlock(0, 3)
        default:
            return new ZBlock(0, 3)

    }
}

function blockAlign(key, block) {
    switch (key) {
        case 0:
            block.move(1.5, 9);
            break;
        case 1:
            block.move(2, 8.5);
            break;
        case 2:
            block.move(2.5, 9.5);
            break;
        case 3:
            block.move(2, 8.5);
            break;
        case 4:
            block.move(2, 9.5);
            break;
        case 5:
            block.move(2.5, 9);
            break;
        default:
            block.move(2.5, 9);
            break;

    }
}

function keyMove() {

    if (keyIsDown(DOWN_ARROW)) {
        isPressed = true;
        if (!boardGame.collide(tBlock))
            tBlock.move(1, 0);

    }
    if (keyIsDown(LEFT_ARROW)) {
        tBlock.move(0, -1);
        if (boardGame.collide(tBlock))
            tBlock.move(0, 1);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        tBlock.move(0, 1);
        if (boardGame.collide(tBlock))
            tBlock.move(0, -1);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {

        let tmpArr = tBlock.getMatrix();
        tBlock.rotate();
        if (boardGame.collide(tBlock))
            tBlock.matrix = tmpArr;
    }
}