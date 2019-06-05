/**
 * 俄罗斯方块类
 *
 * @author leeyee
 * @blog blog.csdn.net/oxcow
 * @email seadlead@gmail.com
 * @data 2010-4
 */
/**
 * 基础类
 *
 * @param iAxis
 *            旋转轴
 * @param Array aBodys
 *            方块体
 * @return
 */
class Tetris {
    constructor(iAxis, aBody) {
        this.axis = iAxis;
        this.body = aBody;
    }

    /**
     * 显示方块
     */
    draw() {
        this.body.forEach(ele => {
            const oE = document.getElementById(ele);
            if (oE) {
                oE.style.background = "#135";
            }
        });
    }

    /**
     * 擦除方块
     */
    eraser() {
        this.body.forEach(ele => {
            let oE = document.getElementById(ele);
            if (oE) {
                oE.style.background = document.getElementById("canvas").style.background;
            }
        });
    }

    /**
     * 旋转修正.避免旋转过后超出画布范围
     *
     * @return
     */
    rotateTune(aBody) {
        this.body = aBody;
        // 修正Tetris的转动轴axis及调整修正转动轴后的body
        if (this.axis % Tetris.COLUMN === 1) { // left wall
            this.body = aBody.map(x => x + 1);
            this.axis++;
        } else if (this.axis % Tetris.COLUMN === 0) { // right wall
            if (!(this instanceof I_Tetris)) {
                this.body = Array.from(aBody, x => x - 1);
            }
            this.axis--;
        }
    }

    /**
     * 移动Tetris
     *
     * -1：左移动 +1：右移 +10：下移
     *
     * @param iOffset
     *            位移
     * @return
     */
    move(iOffset) {
        this.eraser();
        this.body = this.body.map(x => x + iOffset);
        this.axis += iOffset;
        this.draw();
    }

    /**
     * Tetris 工厂
     *
     * @return Tetris 返回Tetris实例
     */
    static NewInstance() {
        // 旋转轴, 角度, 类型
        const [iAxis, iAngle, iType] = [-15, Utils.RandomNumFromZeroToN(4) * 90, Utils.RandomNumFromZeroToN(9)];

        let oTetris = new T_Tetris(iAxis, iAngle);

        switch (iType) {
            case 0:
            case 8:
                oTetris = new I_Tetris(iAxis, iAngle);
                break;
            case 1:
                oTetris = new O_Tetris(iAxis);
                break;
            case 2:
            case 7:
                oTetris = new S_Tetris(iAxis, iAngle);
                break;
            case 3:
                oTetris = new L_Tetris(iAxis, iAngle);
                break;
            case 4:
                oTetris = new Z_Tetris(iAxis, iAngle);
                break;
            case 5:
                oTetris = new T_Tetris(iAxis, iAngle);
                break;
            case 6:
                oTetris = new J_Tetris(iAxis, iAngle);
                break;
        }
        return oTetris;
    }

}

Tetris.COLUMN = 10;// 列数

/**
 * O-型方块类.O-型方块旋转没有变化,因此无需调用基类rotate方法
 *
 * @param iAxis
 *            旋转轴
 * @return
 */
class O_Tetris extends Tetris {
    constructor(iAxis) {
        super(iAxis, [+iAxis - 1, +iAxis, +iAxis + Tetris.COLUMN - 1, +iAxis + Tetris.COLUMN])
    }

    rotate() {
    }
}

/**
 * I-型方块类
 *
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/180/360,90/270).I型为0/180/360度
 * @return
 */
class I_Tetris extends Tetris {
    constructor(iAxis, iAngle) {
        super(iAxis, I_Tetris.InitBody(iAxis, iAngle));
        this.iAngle = iAngle;
    }

    rotate() {
        this.iAngle = (this.iAngle === 360) ? 90 : this.iAngle + 90;
        this.rotateTune(I_Tetris.InitBody(this.axis, this.iAngle));
    }

    /**
     * 创建新的I-型方块.I-型方块旋转只有两种变化.180或360度的都可看作为0度的
     *
     * @param iAxis
     *            旋转轴
     * @param iAngle
     *            角度
     * @return
     */
    static InitBody(iAxis, iAngle) {
        let iBody = [iAxis - 1, iAxis, iAxis + 1, iAxis + 2];
        switch (iAngle) {
            case 0:
            case 180:
            case 360:
                iAxis = (iAxis % 10 === 0) ? iAxis -= 2 : (iAxis % 10 === 9) ? iAxis -= 1 : iAxis;
                iBody = [iAxis - 1, iAxis, iAxis + 1, iAxis + 2];
                break;
            case 90:
            case 270:
                iBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + Tetris.COLUMN, iAxis + 2 * Tetris.COLUMN];
                break;
        }
        return iBody;
    }
}

/**
 * L-型方块类
 *
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/360,90,180,270)L型为0度,每次顺时针旋转90度
 */
class L_Tetris extends Tetris {

    constructor(iAxis, iAngle) {
        super(iAxis, L_Tetris.InitBody(iAxis, iAngle));
        this.iAngle = iAngle;
    }

    rotate() {
        this.iAngle = (this.iAngle === 360) ? 90 : this.iAngle + 90;
        this.rotateTune(L_Tetris.InitBody(this.axis, this.iAngle));
    }

    /**
     * 创建新的L-型方块
     *
     * @param iAxis
     *            旋转轴
     * @param iAngle
     *            角度
     */
    static InitBody(iAxis, iAngle) {
        let lBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN + 1];
        switch (iAngle) {
            case 0:
            case 360:
                lBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN + 1];
                break;
            case 90:
                lBody = [iAxis + 1, iAxis, iAxis - 1, iAxis + Tetris.COLUMN - 1];
                break;
            case 180:
                lBody = [iAxis + Tetris.COLUMN, iAxis, iAxis - Tetris.COLUMN, iAxis - Tetris.COLUMN - 1];
                break;
            case 270:
                lBody = [iAxis - 1, iAxis, iAxis + 1, iAxis - Tetris.COLUMN + 1];
                break;
        }
        return lBody;
    }
}

/**
 * J-型方块类
 *
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/360,90,180,270)J型为0度,每次顺时针旋转90度
 * @return
 */
class J_Tetris extends Tetris {
    constructor(iAxis, iAngle) {
        super(iAxis, J_Tetris.InitBody(iAxis, iAngle));
        this.iAngle = iAngle;
    }

    rotate() {
        this.iAngle = (this.iAngle === 360) ? 90 : this.iAngle + 90;
        this.rotateTune(J_Tetris.InitBody(this.axis, this.iAngle));
    }

    /**
     * 创建新的J-型方块
     *
     * @param iAxis
     *            旋转轴
     * @param iAngle
     *            角度
     * @return
     */
    static InitBody(iAxis, iAngle) {
        let jBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN - 1];
        switch (iAngle) {
            case 0:
            case 360:
                jBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN - 1];
                break;
            case 90:
                jBody = [iAxis + 1, iAxis, iAxis - 1, iAxis - Tetris.COLUMN - 1];
                break;
            case 180:
                jBody = [iAxis + Tetris.COLUMN, iAxis, iAxis - Tetris.COLUMN, iAxis - Tetris.COLUMN + 1];
                break;
            case 270:
                jBody = [iAxis - 1, iAxis, iAxis + 1, iAxis + Tetris.COLUMN + 1];
                break;
        }
        return jBody;
    }
}

/**
 * T-型方块类
 *
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/360,90,180,270)T型为0度,每次顺时针旋转90度
 * @return
 */
class T_Tetris extends Tetris {
    constructor(iAxis, iAngle) {
        super(iAxis, T_Tetris.InitBody(iAxis, iAngle));
        this.iAngle = iAngle;
    }

    rotate() {
        this.iAngle = (this.iAngle === 360) ? 90 : this.iAngle + 90;
        this.rotateTune(T_Tetris.InitBody(this.axis, this.iAngle));
    }

    /**
     * 创建新的T-型方块
     *
     * @param iAxis
     *            旋转轴
     * @param iAngle
     *            角度
     * @return
     */
    static InitBody(iAxis, iAngle) {
        let tBody = [iAxis - 1, iAxis, iAxis + 1, iAxis + Tetris.COLUMN];
        switch (iAngle) {
            case 0:
            case 360:
                tBody = [iAxis - 1, iAxis, iAxis + 1, iAxis + Tetris.COLUMN];
                break;
            case 90:
                tBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + Tetris.COLUMN, iAxis - 1];
                break;
            case 180:
                tBody = [iAxis + 1, iAxis, iAxis - 1, iAxis - Tetris.COLUMN];
                break;
            case 270:
                tBody = [iAxis + Tetris.COLUMN, iAxis, iAxis - Tetris.COLUMN, iAxis + 1];
                break;
        }
        return tBody;
    }
}

/**
 * S-型方块类
 *
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/180/360,90/270).S型为0/180/360度
 * @return
 */
class S_Tetris extends Tetris {
    constructor(iAxis, iAngle) {
        super(iAxis, S_Tetris.InitBody(iAxis, iAngle));
        this.iAngle = iAngle;
    }

    rotate() {
        this.iAngle = (this.iAngle === 360) ? 90 : this.iAngle + 90;
        this.rotateTune(S_Tetris.InitBody(this.axis, this.iAngle));
    }

    /**
     * 创建新的S-型方块.S-型方块旋转只有两种变化.180或360度的都可看作为0度的
     *
     * @param iAxis
     *            旋转轴
     * @param iAngle
     *            角度
     * @return
     */
    static InitBody(iAxis, iAngle) {
        let __sBody = [iAxis + 1, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN - 1];
        switch (iAngle) {
            case 0:
            case 180:
            case 360:
                __sBody = [iAxis + 1, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN - 1];
                break;
            case 90:
            case 270:
                __sBody = [iAxis - Tetris.COLUMN, iAxis, iAxis + 1, iAxis + Tetris.COLUMN + 1];
                break;
        }
        return __sBody;
    }
}

/**
 * Z-型方块类
 *
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/180/360,90/270).Z型为0/180/360度
 * @return
 */
class Z_Tetris extends Tetris {
    constructor(iAxis, iAngle) {
        super(iAxis, Z_Tetris.InitBody(iAxis, iAngle));
        this.iAngle = iAngle;
    }

    rotate() {
        this.iAngle = (this.iAngle === 360) ? 90 : this.iAngle + 90;
        this.rotateTune(Z_Tetris.InitBody(this.axis, this.iAngle));
    }

    /**
     * 创建新的Z-型方块.Z-型方块旋转只有两种变化.180或360度的都可看作为0度的
     *
     * @param iAxis
     *            旋转轴
     * @param iAngle
     *            角度
     * @return
     */
    static InitBody(iAxis, iAngle) {
        let zBody = [iAxis - 1, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN + 1];
        switch (iAngle) {
            case 0:
            case 180:
            case 360:
                zBody = [iAxis - 1, iAxis, iAxis + Tetris.COLUMN, iAxis + Tetris.COLUMN + 1];
                break;
            case 90:
            case 270:
                zBody = [iAxis - Tetris.COLUMN, iAxis, iAxis - 1, iAxis + Tetris.COLUMN - 1];
                break;
        }
        return zBody;
    }
}