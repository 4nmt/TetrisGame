class Begin {

    constructor(window, canvas, boardGame) {
        this.canvas = canvas;
        this.boardGame = boardGame;

        this.btnLevels;
        this.btnPlay;
        this.banner;

        this.levels = 0
        this.isPlay = false;


    }

    setup() {

        this.banner = createImg('images/banner.jpg')
        this.banner.parent('container');
        this.banner.position(WIDTH_MAP / 5, 80);



        this.btnLevels = createButton('Level: Easy');
        this.btnLevels.parent('container');
        this.btnLevels.position(WIDTH_MAP / 3.5, HEIGHT_MAP / 3 + 80);
        this.btnLevels.mousePressed(this.levelUp.bind(this));
        this.btnLevels.style('width', 200 + "px");

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

      
        this.levels = ++this.levels <= 2 ? this.levels : 0;
        this.btnLevels.elt.innerHTML = `Level: ${levelOptions[ this.levels]}`;

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