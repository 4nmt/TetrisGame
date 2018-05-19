class Begin {

    constructor(window, canvas, boardGame) {
        this.canvas = canvas;
        this.boardGame = boardGame;

        this.btnLevels;
        this.btnPlay;
        this.banner;

        this.levels = 1
        this.isPlay = false;


    }

    setup() {

        this.banner = createImg('images/banner.jpg')
        this.banner.parent('container');
        this.banner.position(WIDTH_MAP / 5, 80);



        this.btnLevels = createButton('Levels: 1');
        this.btnLevels.parent('container');
        this.btnLevels.position(WIDTH_MAP / 3, HEIGHT_MAP / 3 + 80);
        this.btnLevels.mousePressed(this.levelUp.bind(this));

        // helps
        this.btnPlay = createButton('Play');
        this.btnPlay.parent('container');
        this.btnPlay.position(WIDTH_MAP / 3, HEIGHT_MAP / 3 + 80 * 2);
        this.btnPlay.mousePressed(this.play.bind(this));



    }

    showEle() {
        this.btnLevels.show();
        this.btnPlay.show();
        this.banner.show();

    }

    hideEle() {
        this.btnLevels.hide();
        this.btnPlay.hide();
        this.banner.hide();
    }

    levelUp() {

        this.levels = ++this.levels <= 10 ? this.levels : 1;
        this.btnLevels.elt.innerHTML = `Level: ${this.levels}`;

    }

    play() {

        this.isPlay = true
        this.hideEle();

        btnPause.show();
        btnMusic.show();
        mySound.play();
        loop();
    }



}