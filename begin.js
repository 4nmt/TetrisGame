class Begin {

    constructor(window, canvas, boardGame) {
        this.canvas = canvas;
        this.boardGame = boardGame;
        this.inputPlayerName;
        this.btnLevels;
        this.btnPlay;
        this.banner;
        this.btnBest;
        this.levels = 0
        this.isPlay = false;
        this.playerName = '';
        this.firstLoad = localStorage.getItem("firstLoad");
        this.scoreBoard;

    }

    setup() {

        this.banner = createImg('images/banner.jpg')
        this.banner.parent('container');
        this.banner.position(WIDTH_MAP / 4, 30);

        this.inputPlayerName = createInput('');
        this.inputPlayerName.elt.placeholder = "Player name";
        this.inputPlayerName.parent('container');
        this.inputPlayerName.position(WIDTH_MAP / 3, HEIGHT_MAP / 3 + 30);
        this.inputPlayerName.addClass('form-control')
        this.inputPlayerName.style('width', 200 + "px");
        this.inputPlayerName.style('height', 40 + "px");
        this.inputPlayerName.style('border-radius', 8 + "px");
        this.inputPlayerName.style('text-align', "center");

        this.btnPlay = createButton('Play');
        this.btnPlay.parent('container');
        this.btnPlay.position(WIDTH_MAP / 3, HEIGHT_MAP / 3 + 80);
        this.btnPlay.style('width', 200 + "px");
        this.btnPlay.mousePressed(this.play.bind(this));

        this.btnLevels = createButton('Level: Easy');
        this.btnLevels.parent('container');
        this.btnLevels.position(WIDTH_MAP / 3, HEIGHT_MAP / 3 + 160);
        this.btnLevels.mousePressed(this.levelUp.bind(this));
        this.btnLevels.style('width', 200 + "px");

        this.btnBest = createButton('Best');
        this.btnBest.parent('container');
        this.btnBest.position(WIDTH_MAP / 3, HEIGHT_MAP / 3 + 240);
        this.btnBest.style('width', 200 + "px");
        this.btnBest.mousePressed(this.best.bind(this));

        // helps
        this.scoreBoard = createDiv();
        this.scoreBoard.id('scoreBoard')
        this.scoreBoard.parent('container');
        this.scoreBoard.position(50, 20);
        this.scoreBoard.style('width', 400 + "px");
        this.scoreBoard.style('height', 400 + "px");
        this.scoreBoard.style('background', "white");
        this.scoreBoard.style('box-shadow', "0 0 10px #ecf0f1");
        this.scoreBoard.style('border-radius', 8 + "px");
        var scoreBoardTitleRow = createDiv();
        scoreBoardTitleRow.id("titleRow")
        scoreBoardTitleRow.parent('scoreBoard');
        scoreBoardTitleRow.style('width', "100%");
        var playerNameDiv = createDiv("Player name");
        playerNameDiv.parent('titleRow');
        playerNameDiv.id("playerName")
        playerNameDiv.addClass('col-xs-4');
        var scoreDiv = createDiv("Score");
        scoreDiv.id("playerScore")
        scoreDiv.parent('titleRow');
        scoreDiv.addClass('col-xs-4');
        var timeDiv = createDiv("Time");
        timeDiv.id("time")
        timeDiv.parent('titleRow');
        timeDiv.addClass('col-xs-4');

        this.scoreBoard.hide();


    }

    showEle() {
        this.btnLevels.show();
        this.btnPlay.show();
        this.banner.show();
        this.inputPlayerName.show();
        this.btnBest.show();

    }

    hideEle() {
        this.btnLevels.hide();
        this.btnPlay.hide();
        this.banner.hide();
        this.inputPlayerName.hide();
        this.btnBest.hide();
    }

    levelUp() {


        this.levels = ++this.levels <= 2 ? this.levels : 0;
        this.btnLevels.elt.innerHTML = `Level: ${levelOptions[this.levels]}`;

    }

    play() {
        if (this.inputPlayerName.value() === '') {
            alert("Please enter player name!")
        }
        else {
            this.isPlay = true
            this.playerName = this.inputPlayerName.value();
            this.hideEle();
            btnPause.show();
            btnMusic.show();
            mySound.play();
            loop();
        }
    }
    best() {

        if (this.btnBest.elt.innerText === "Cancel") {
            this.btnBest.elt.innerText = "Best"
            this.scoreBoard.hide();
        }
        else {
            this.scoreBoard.show();
            if (this.firstLoad != null) {
                var dataStore = localStorage.getItem("dataStore")
                dataStore = JSON.parse(dataStore);
                dataStore.playerData.sort(GetSortOrder('score'));
                var count = 0;
                var record = document.getElementsByClassName("recordRow");
                for (let i = 0; i < record.length; i++) {
                    record[i].remove();
                }
                for (let i = dataStore.playerData.length - 1; i >= 0; i--) {
                    count++;
                    var recordRow = createDiv();
                    recordRow.id("recordRow")
                    recordRow.parent('scoreBoard');
                    recordRow.style('width', "100%");
                    var recordName = createDiv(dataStore.playerData[i].playerName);
                    recordName.parent('recordRow');
                    recordName.id("recordName")
                    recordName.addClass('col-xs-4');
                    var recordScore = createDiv(dataStore.playerData[i].score);
                    recordScore.parent('recordRow');
                    recordScore.id("recordScore")
                    recordScore.addClass('col-xs-4');
                    var recordTime = createDiv(dataStore.playerData[i].playTime);
                    recordTime.parent('recordRow');
                    recordTime.id("recordTime")
                    recordTime.addClass('col-xs-4');

                    if (count >= dataStore.playerData.length || count >= 5) {
                        break;
                    }
                }
            }
            else {

            }
            this.btnBest.elt.innerText = "Cancel"
        }
    }
}
function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
} 