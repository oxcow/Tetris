/**
 * 俄罗斯方块游戏类
 *
 * @author leeyee
 * @blog blog.csdn.net/oxcow
 * @email seadlead@gmail.com
 * @data 2010-4
 */

/**
 * 俄罗斯方块游戏类
 */
class TetrisGame {
    constructor() {
        this.timeOut = null;
        this.score = 0;// 得分
        this.level = 0;// 等级
        this.speed = 1000;// 降落速度
        this.canvas = new Canvas(20, 10, 'canvas');// 创建canvas对象
        this.preCanvas = new PreCanvas(10, 4, 'preCanvas');
        this.tetris = null;// 方块
        this.preTetris = Tetris.NewInstance();
        this.body = [];// 记录游戏中已经被占的格子
    }

    /**
     * 预计加载
     *
     * @return
     */
    preload() {
        this.displayScoreAndLevel();
        this.canvas.draw();
        this.preCanvas.draw();
        this.preCanvas.show(this.preTetris.body);
    }

    /**
     * 创建新的方块
     *
     * @return
     */
    newTetris() {
        this.tetris = this.preTetris;
        this.preTetris = Tetris.NewInstance();
        this.preCanvas.show(this.preTetris.body);
    }

    /**
     * 清除已经填满的行
     *
     * @author leeyee
     * @return Number 返回每次清除的行数
     */
    __eraserRow() {
        let __iRow = 0;// 清除的行数
        // 当数组长度超过80时，sort()方法无法正确排序，因此需要提供比较器
        // 关于比较器可参看http://www.w3school.com.cn/js/jsref_sort.asp
        this.body.sort((a, b) => a - b);
        // 将属于一行的元素放在相同的数组中，并通过二维数组的第一维确认其所在行
        let f = Utils.ElementGroupByN(this.body, 10);
        let __temp = [];// 用于存储被销毁行上层的所占格子
        for (let i = 0; i < f.length; i++) {

            let fiLen = f[i].filter(ele => ele !== undefined).length;

            if (fiLen === 0) {// 如果该行数组的长度(不统计未定义的数组元素)为0则说明该行尚未被占
                continue;
            }

            if (fiLen === 10) {

                // 从已经占有的格子中清除属于一行的格子
                this.body.splice(this.body.indexOf(i * 10 + 1), 10);
                // 将需要清除的一行元素赋值给方块对象，并调用方块的eraser方法将其从画布上清除掉
                this.tetris.body = f[i];
                this.tetris.eraser();
                // 将被消除层的上层格子下移
                if (__temp.length !== 0) {
                    __temp = __temp.filter(ele => ele !== undefined);
                    this.tetris.body = __temp;//// 清除掉数组中未定义的元素
                    this.body.splice(0, this.tetris.body.length);// 从已占格子中清除上层各式
                    this.tetris.move(10);// 上层格子下移
                    this.body = this.tetris.body.concat(this.body);// 将移动后的上层格子添加到已占格子的前端
                }
                __iRow++;

            } else {// 如果该行有数据但未达到满格则记录下来
                __temp = __temp.concat(f[i]);
            }
        }
        return __iRow;
    }

    /**
     * 触碰事件
     *
     * @return
     */
    touchHandler() {
        this.tetris.body.sort();
        // 是否碰到已经被占的格子
        for (let i = 0; i < 4; i++) {
            // 游戏结束
            if ((this.tetris.body[0] < 0 || Math.floor((this.tetris.body[i]) / 10) === 1) && this.body.includes(this.tetris.body[i] + 10)) {
                alert("GAME OVER");
                this.reset();
                this.stop();
                return true;
            }
            // 方块的组成中只要一个放块的下一个位置属于已经被占的就表明该方块不可以在往下移动了
            if (this.body.includes(this.tetris.body[i] + 10)) {
                this.body = this.body.concat(this.tetris.body);
                this.scoreAndLevelHandler(this.__eraserRow());
                return true;
            }
        }
        // 表示方块的最后一个数是否属于最低层，属于就判断为已经到底
        if (Math.floor((this.tetris.body[3] - 1) / 10) === 19) {
            this.body = this.body.concat(this.tetris.body);
            this.scoreAndLevelHandler(this.__eraserRow());// 清除已经填满的行
            return true;
        }
        return false;
    }

    rotateHandler() {
        let __tetrisBody = this.tetris.body;// 记录下变型前的方块对象的身体及角度
        let __tetrisAngle = this.tetris.iAngle;
        this.tetris.eraser();// 先清除方块对象
        this.tetris.rotate();
        for (let i = 0; i < this.tetris.body.length; i++) {
            if (this.body.includes(this.tetris.body[i])) {// 假如变型后的位置已经有方块则返回变型前
                this.tetris.iAngle = __tetrisAngle;
                this.tetris.body = __tetrisBody;
                break;
            }
        }
        this.tetris.draw();// 展示方块对象
    }

    scoreAndLevelHandler(iRow) {
        this.score += 10;// 每降落一个方块+10分
        if (iRow !== 0) {// 消除一行100分;两行200分;三行400分;四行800分
            this.score += Math.pow(2, iRow - 1) * 100;
        }
        this.level = Math.floor(this.score / 400);
        if (this.speed > 130) {
            this.speed = 1000 - Math.floor(this.level / 3) * 80;
        }
        this.displayScoreAndLevel();
    }

    /**
     *  显示得分及等级
     */
    displayScoreAndLevel(score = this.score, level = this.level) {
        document.getElementById('score').innerHTML = score;
        document.getElementById('level').innerHTML = level;
    }

    /**
     * 检测是否到达画布边缘.左或右
     *
     * @param sDirc left or right
     * @return Boolean 到达返回true.否则返回false
     */
    leftOrRightMove(sDirc) {
        for (let i = 0; i < 4; i++) {
            // 判断是否已经到达最左边
            if (sDirc === 'left') {
                if (this.tetris.body[i] % 10 === 1 && (this.tetris.body[i] - 1) % 10 === 0) {
                    return true;
                }
                if (this.body.includes(this.tetris.body[i] - 1)) {
                    return true;
                }
            } else if (sDirc === 'right') {
                // 判断是否已经到达最右边
                if (this.tetris.body[i] % 10 === 0 && (this.tetris.body[i] + 1) % 10 === 1) {
                    return true;
                }
                if (this.body.includes(this.tetris.body[i] + 1)) {
                    return true;
                }
            } else {
                break;
            }
        }
        return false;
    }

    keyboardEventsListeners(oEvent) {
        let direct = null;
        if (window.event) {// ie
            direct = window.event.keyCode;
        } else if (oEvent.which) {// ff
            direct = oEvent.which;
        }
        if (direct === 37) {// 37-->left
            if (!this.leftOrRightMove('left'))
                this.tetris.move(-1);
        }
        if (direct === 39) {// 39-->right
            if (!this.leftOrRightMove('right'))
                this.tetris.move(+1);
        }
        if (direct === 38) {// 38-->up
            this.rotateHandler();// 旋转
        }
        if (direct === 40) {// 40-->down
            if (this.touchHandler()) {
                this.newTetris();
            }
            this.tetris.move(+10);
        }
    }

    __delay(obj, fn, time) {
        return setTimeout(() => {
            fn.call(obj)
        }, time);
    }

    /**
     * 开始游戏
     *
     * @return
     */
    start() {
        if (this.tetris == null || this.touchHandler()) {
            this.newTetris();
        }
        this.tetris.move(10);
        this.timeOut = this.__delay(this, this.start, this.speed);
    }

    /**
     * 暂停游戏
     *
     * @return
     */
    stop() {
        clearTimeout(this.timeOut);
    }

    /**
     * 重置游戏
     */
    reset() {
        this.tetris.eraser();
        this.body.forEach(ele => {
            let _oE = document.getElementById(ele);
            if (_oE) {
                _oE.style.background = document.getElementById('canvas').style.background;
            }
        });

        this.displayScoreAndLevel(0, 0);
        this.speed = 1000;// 降落速度
        this.body = [];
        this.tetris = null;
         
        //this.stop();
    }
}

window.onload = function () {
    let oTetrisGame = new TetrisGame();
    oTetrisGame.preload();
    document.onkeydown = function (oEvent) {
        oTetrisGame.keyboardEventsListeners(oEvent);
    };
    document.getElementById('start').onclick = function () {
        oTetrisGame.start();
    };
    document.getElementById('stop').onclick = function () {
        oTetrisGame.stop();
    };
    document.getElementById('restart').onclick = function () {
        oTetrisGame.reset();
    };
}