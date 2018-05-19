class Board {

    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.matrix = [];

        for (let i = 0; i < this.height; i++) {
            this.matrix[i] = new Array(this.width).fill(0);
        }
    }


    drawBoard() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {

                if (this.matrix[i][j] != 0) {
                    //console.log(this.matrix[i][j])
                    fill(BLOCK_COLORS[this.matrix[i][j]]);
                    rect(j * SCALE, i * SCALE, SCALE, SCALE, RADIUS);
                } else {
                    strokeWeight(4);
                    stroke(51);
                    noFill();
                    rect(j * SCALE, i * SCALE, SCALE, SCALE, RADIUS);
                }

            }
        }

    }

    pause() {


        fill('#2c3e50');
        noStroke();
        rect(0, 0, SCALE * this.width + 5, SCALE * this.height);
        textSize(40);
        fill(255);
        //textFont('century gothic');
        text('Paused', 70, 100);
    }


    checkFullRow(i) {
        return this.matrix[i].every((x) => x != 0)
    }

    getScores() {

        let startIndex, finishIndex, flag = false;

        for (let i = 0; i < this.height; i++) {
            if (this.checkFullRow(i)) {
                if (flag == false) {
                    startIndex = i;
                    finishIndex = 1;
                    flag = true;

                } else finishIndex++;

            }
        }
        if (startIndex && finishIndex) {

            this.matrix.splice(startIndex, finishIndex);

            for (let i = 0; i < finishIndex; i++) {
                var cloneArr = new Array(this.width).fill(0);
                this.matrix.unshift(cloneArr);
            }
        }

        return finishIndex;
    }



    collide(player) {
        var [m, p] = [this.matrix, player];

        for (let i = 0; i < p.matrix.length; i++) {
            for (let j = 0; j < p.matrix[i].length; j++) {
                if (p.matrix[i][j] != 0 && (!m[i + p.x + 1] || m[i + p.x + 1][j + p.y] != 0))
                    return true;

            }
        }
        return false;
    }


    merge(player) {
        var [m, p] = [this.matrix, player];

        for (let i = 0; i < p.matrix.length; i++) {
            for (let j = 0; j < p.matrix[i].length; j++) {
                if (p.matrix[i][j] != 0) {
                    m[i + p.x][j + p.y] = p.matrix[i][j];
                }

            }
        }
    }

    clear() {
        this.matrix.forEach(row => row.fill(0))
    }

}