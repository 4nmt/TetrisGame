let tBlock, demoBlock;
let boardGame;
let fr;
let randomBlock;
let mySound, blockFallSound;
let isPressed;
let play = false;


let scoreIndex;
let sumScores = 0;

const scoresArray = [40, 100, 400, 1200];
const WIDTH_MAP = 500;
const HEIGHT_MAP = 560;
const levelOptions = ['Easy', 'Normal', 'Hard']

const levelUp = [40, 10, 2]

//const blockInstance = [new TBlock(0, 3), new IBlock(0, 3), new OBlock(0, 3), new LBlock(0, 3)
//  , new JBlock(0, 3), new SBlock(0, 3), new ZBlock(0, 3)]


let btnPause, isPause = 0;
let btnMusic, isMusic = 0;

var myCanvas;

let beginGame, isPlay = false;
let menuGame;

let time = 0;
let timeStr;

let pauseTime;

function setup() {

    //sound
    mySound = new Audio("sounds/Tetris.mp3");
    blockFallSound = new Audio("sounds/SFX_PieceHardDrop.ogg")
    mySound.volume = 0.2;
    mySound.loop = true;

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

    // pause , music
    btnPause = createButton('Pause');
    btnPause.parent('container');
    btnPause.position(WIDTH_MAP - 100, HEIGHT_MAP - 50);
    btnPause.mousePressed(pauseGame);
    btnPause.id('idPause');
    btnPause.hide();

    btnMusic = createImg('images/speaker.png');
    btnMusic.parent('container');
    btnMusic.position(WIDTH_MAP - 180, HEIGHT_MAP - 45);
    btnMusic.mousePressed(musicGame);
    btnMusic.id('idMusic');
    btnMusic.hide();

    //menu
    menuGame = new Menu(this, myCanvas, boardGame);
    menuGame.setup();
    menuGame.hideEle();

    beginGame = new Begin(isPlay, myCanvas, boardGame);
    beginGame.setup();
    beginGame.showEle();

    pauseTime = setInterval(timer, 10);
    noLoop()
}




function draw() {


    isPressed = false;
    fr = 100;

    background('#34495e');

    if (!beginGame.isPlay) {

    } else {

        // demo text
        textSize(30);
        fill(255);
        textFont('century gothic');
        text('Next', 340, 30);

        //demo block
        noFill();
        rect(320, 40, 120, 120);


        // levels text
        textSize(25);
        fill(255);
        textFont('century gothic');
        text('Level:', 300, WIDTH_MAP / 2);


        textSize(25);
        fill(255);
        textFont('century gothic');
        text(levelOptions[beginGame.levels], 400, WIDTH_MAP / 2);
        // scores text
        textSize(25);
        fill(255);
        textFont('century gothic');
        text('Scores:', 300, WIDTH_MAP / 2 + 50);

        textSize(25);
        fill(255);
        textFont('century gothic');
        text(sumScores.toString(), 430, WIDTH_MAP / 2 + 50);

        //
        // scores text
        textSize(25);
        fill(255);
        textFont('century gothic');
        text('Time:', 300, WIDTH_MAP / 2 + 100);

        textSize(25);
        fill(255);
        textFont('century gothic');
        text(timeStr, 370, WIDTH_MAP / 2 + 100);

        keyMove();
        frameRate(fr);
        if (frameCount % levelUp[beginGame.levels] == 0 && isPressed == false)
            tBlock.move(1, 0)

        demoBlock.draw();

        boardGame.drawBoard();

        tBlock.draw();

        if (time % 6000 == 0)
            beginGame.levels++;


        if (isPause % 2) {
            boardGame.pause();

        }
        if (boardGame.collide(tBlock)) {
            blockFallSound.play();
            boardGame.merge(tBlock);


            tBlock = switchBlocks(randomBlock);
            randomBlock = Math.floor(random(0, 7))
            demoBlock = switchBlocks(randomBlock);
            blockAlign(randomBlock, demoBlock)

            scoreIndex = boardGame.getScores();
            if (scoreIndex)
                sumScores += scoresArray[scoreIndex - 1]

            if (boardGame.collide(tBlock))
                boardGame.clear();

            // console.table(boardGame.matrix)
        }
    }

}

// time

function timer() {

    ++time;

    let sec = time % 100;
    let ss = parseInt(time / 100);
    let mm = parseInt(ss / 60);



    timeStr = `${parseInt(mm/10)}${mm%10}:${parseInt(ss/10)}${ss%10}:${sec}`;

}

// btnMusic & btnPause
function musicGame() {

    if (++isMusic % 2) {
        btnMusic.elt.src = 'images/slience.png';
        mySound.volume = 0;
        blockFallSound.volume = 0;
    } else {
        btnMusic.elt.src = 'images/speaker.png';
        mySound.volume = 0.2;
        blockFallSound.volume = 0.2;
    }

}

function pauseGame() {

    clearInterval(pauseTime);

    if (++isPause % 2) {
        menuGame.showEle();
        clearInterval(pauseTime);

        noLoop();
    } else {
        menuGame.hideEle();
        pauseTime = setInterval(timer, 10);
        loop();
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
        fr = 40;
        isPressed = true;
        if (!boardGame.collide(tBlock))
            tBlock.move(1, 0);

    }
    if (keyIsDown(LEFT_ARROW)) {
        fr = 40;
        tBlock.move(0, -1);
        tBlock.move(-1, 0);
        if (boardGame.collide(tBlock))
            tBlock.move(0, 1);
        tBlock.move(1, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        fr = 40;
        tBlock.move(0, 1);
        tBlock.move(-1, 0);
        if (boardGame.collide(tBlock))
            tBlock.move(0, -1);

        tBlock.move(1, 0);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {

        let tmpArr = tBlock.getMatrix();
        tBlock.rotate();
        if (boardGame.collide(tBlock))
            tBlock.matrix = tmpArr;
    }
    if (keyCode === 32) {   
        isPressed = true;
        for (let i = 0; i < 20; i++) {
            if (!boardGame.collide(tBlock))
                tBlock.move(1, 0);
        }
    }

}
