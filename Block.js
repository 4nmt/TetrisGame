const SCALE = 28;
const BLOCK_COLORS = [null, '#1abc9c', '#f39c12', '#e74c3c', '#fa983a', '#3498db', '#78e08f', '#ecf0f1', '#9b59b6'];
const RADIUS = 5;

class Block {

    constructor(x, y) {
        this.matrix = [];
        this.x = x;
        this.y = y;
    }

    draw() {
        for (let i = 0; i < this.matrix.length; ++i) {
            for (let j = 0; j < this.matrix[i].length; ++j) {

                if (this.matrix[i][j] != 0) {
                    
                    fill(BLOCK_COLORS[this.matrix[i][j]]);
                    rect((j + this.y) * SCALE, (i + this.x) * SCALE, SCALE, SCALE, RADIUS)
                }
            }
        }
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    rotate() {
        let len = this.matrix.length;

        let b = [];
        // clone this.matrix and fill it = 0
        this.matrix.forEach((row, i) => b.push(new Array(len).fill(0)));

        for (let i = 0; i < this.matrix.length; ++i) {
            --len;
            for (let j = 0; j < this.matrix[i].length; ++j) {
                b[j][len] = this.matrix[i][j];
            }
        }

        this.matrix = b;
    }

   

    getMatrix() {
        return this.matrix;;
    }

    cloneBlock(){
        var tmp = this;
        return tmp;
    }

}

class TBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];

    }

}

class IBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

    }

}

class LBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];

    }
}
class JBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ];

    }
}
class OBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [5, 5],
            [5, 5]
        ];

    }
}
class SBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ];

    }
}
class ZBlock extends Block {

    constructor(x, y) {
        super(x, y);

        this.matrix = [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ];

    }
}