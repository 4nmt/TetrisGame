class Menu {

    constructor(window, canvas, boardGame) {
        this.canvas = canvas;
        this.boardGame = boardGame;

        this.btnOption;
        this.btnQuit;
        this.btnResume;
        this.btnHelp;

        this.isPause = 0;


        this.window = window;

    }

    setup() {

        // resume
        this.btnResume = createButton('Resume');
        this.btnResume.parent('container');
        this.btnResume.position(WIDTH_MAP / 6, HEIGHT_MAP / 3);
        this.btnResume.mousePressed(this.resume.bind(this));

        // options
        this.btnOption = createButton('Options');
        this.btnOption.parent('container');
        this.btnOption.position(WIDTH_MAP / 6, HEIGHT_MAP / 3 + 80);
        this.btnOption.mousePressed(this.options.bind(this));

        // helps
        this.btnHelp = createButton('Help');
        this.btnHelp.parent('container');
        this.btnHelp.position(WIDTH_MAP / 6, HEIGHT_MAP / 3 + 80 * 2);
        this.btnHelp.mousePressed(this.help.bind(this));

        // quit
        this.btnQuit = createButton('Quit');
        this.btnQuit.parent('container');
        this.btnQuit.position(WIDTH_MAP / 6, HEIGHT_MAP / 3 + 80 * 3);
        this.btnQuit.mousePressed(this.quit.bind(this));

    }

    showEle() {
        this.btnOption.show();
        this.btnQuit.show();
        this.btnResume.show();
        this.btnHelp.show();
    }

    hideEle() {
        this.btnOption.hide();
        this.btnQuit.hide();
        this.btnResume.hide();
        this.btnHelp.hide();
    }


    resume() {

        this.hideEle();
        pauseGame();
    }

    options() {
        this.menu.hide();
        loop();
    }

    help() {
        this.menu.hide();
        loop();
    }

    quit() {
         remove();
        this.hideEle();
        boardGame.clear();
        
        setup();
        pauseGame();
        noLoop();
        
    }

}