class GameOver {

    constructor(window, canvas, boardGame) {
        this.canvas = canvas;
        this.boardGame = boardGame;

        this.btnRestart;
        this.btnMainMenu;



    }

    setup() {



        // restart
        this.btnRestart = createButton('Restart');
        this.btnRestart.parent('container');
        this.btnRestart.position(WIDTH_MAP / 6 - 12, HEIGHT_MAP / 3 + 80);
        this.btnRestart.mousePressed(this.restart.bind(this));

        // main menu
        this.btnMainMenu = createButton('Main menu');
        this.btnMainMenu.parent('container');
        this.btnMainMenu.position(WIDTH_MAP / 6 - 12, HEIGHT_MAP / 3 + 80 * 2);
        this.btnMainMenu.mousePressed(this.main_menu.bind(this));


    }

    showEle() {
        this.btnRestart.show();
        this.btnMainMenu.show();
        noLoop();
    }

    hideEle() {
        this.btnRestart.hide();
        this.btnMainMenu.hide();

    }


    restart() {
        this.hideEle();
        boardGame.clear();
        
        console.log(beginGame.levels);
        time = 0;

        //block
        randomBlock = Math.floor(random(0, 7))
        tBlock = switchBlocks(randomBlock);

        //next block
        randomBlock = Math.floor(random(0, 7))
        demoBlock = switchBlocks(randomBlock);
        blockAlign(randomBlock, demoBlock)

        sumScores = 0;
        isMusic = 0;


        btnMusic.elt.src = 'images/speaker.png';
        mySound.volume = 0.2;
        mySound.load();
       
        loop();
    }



    main_menu() {
        console.log(beginGame.levels);
        this.hideEle();
        boardGame.clear();
        mySound.pause();

        beginGame.isPlay = false;
        beginGame.showEle();
        beginGame.levels = 100;
        beginGame.levelUp();

        btnPause.hide();
        btnMusic.hide();

        time = 0;

        //block
        randomBlock = Math.floor(random(0, 7))
        tBlock = switchBlocks(randomBlock);

        //next block
        randomBlock = Math.floor(random(0, 7))
        demoBlock = switchBlocks(randomBlock);
        blockAlign(randomBlock, demoBlock)

        sumScores = 0;
        isMusic = 0;


        btnMusic.elt.src = 'images/speaker.png';
        mySound.volume = 0.2;
        mySound.load();
        blockFallSound.volume = 0.2;
      
        loop();
    }
}