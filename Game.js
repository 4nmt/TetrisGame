class Game {

    constructor() {
        this.thistBlock
        this.demoBlock;
        this.boardGame;
        this.fr;
        this.randomBlock;
        this.mySound;
        this.blockFallSound;
        this.isPressed;
        this.play = false;
        this.pause = 0;

        this.gamePlay;
        this.WIDTH_MAP = 450;
        this.HEIGHT_MAP = 560;

        this.btnPause;
        this.btnQuit;

        this.myCanvas;

    }

    setup() {

        //sound
        this.mySound = new Audio("sounds/Tetris.mp3");
        this.blockFallSound = new Audio("sounds/SFX_PieceHardDrop.ogg")
        // mySound.volume = 0.2;
        // mySound.play();
        // mySound.loop = true
        this.myCanvas = createCanvas(WIDTH_MAP, HEIGHT_MAP);
        this.myCanvas.parent('container');
        //board
        this.boardGame = new Board(10, 20);

        //block
        this.randomBlock = Math.floor(random(0, 7))
        this.tBlock = switchBlocks(randomBlock);

        //next block
        this.randomBlock = Math.floor(random(0, 7))
        this.demoBlock = switchBlocks(randomBlock);
        this.gamePlay.blockAlign(randomBlock, demoBlock)

        // menu
        this.btnPause = createButton('Pause');
        this.btnPause.parent('container');
        this.btnPause.position(WIDTH_MAP - 100, HEIGHT_MAP - 50);
        this.btnPause.mousePressed(pauseGame);
        //  btnPause.parent('canvas');
    }

    run() {
         this.isPressed = false;
         this.fr = 20;

        background('#34495e');

        // demo text
        textSize(30);
        fill(255);
        textFont('century gothic');
        text('Next', 340, 30);

        //demo block
        noFill();
        rect(320, 40, 120, 120);



        frameRate(this.fr);

        if (frameCount % 20 == 0 && this.isPressed == false)
            tBlock.move(1, 0)

         this.demoBlock.draw();
         this.boardGame.drawBoard();
         this.keyMove();
         this.tBlock.draw();

        if (this.pause % 2)
             this.boardGame.pause();


        if (this.boardGame.collide(tBlock)) {
             this.blockFallSound.play();
             this.boardGame.merge(tBlock);


             this.tBlock = switchBlocks(this.randomBlock);
             this.randomBlock = Math.floor(random(0, 7))
             this.demoBlock = switchBlocks(this.randomBlock);
             this.gamePlay.blockAlign(this.randomBlock, this.demoBlock)
             this.boardGame.getScores();

            if (this.boardGame.collide(this.tBlock)) {
                 this.boardGame.clear();
            }

        }
    }
    pauseGame() {

        if (++this.pause % 2) {
             this.boardGame.pause();
            noLoop()
        } else loop();
    }
    blockAlign(key, block) {
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
    switchBlocks(key) {
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
    keyMove() {

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

}