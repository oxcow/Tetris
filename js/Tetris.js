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
 * @param aBodys
 *            方块体
 * @return
 */
function Tetris(iAxis, aBodys) {
	this.axis = iAxis;
	this.body = aBodys;
}
Tetris.column = 10;// 列数

/**
 * Tetris 工厂
 * 
 * @return 返回Tetris实例
 */
Tetris.Factory = function() {
	var __oTetris = null;
	var __iAxis = -15;// 默认轴
	var __iAngle = RandomEventUtils.getIntRandomNumFromZeroToN(4) * 90;// 角度
	var __iType = RandomEventUtils.getIntRandomNumFromZeroToN(9);// 类型
	switch (__iType) {
	case 0:
	case 8:
		__oTetris = new I_Tetris(__iAxis, __iAngle);
		break;
	case 1:
		__oTetris = new O_Tetris(__iAxis);
		break;
	case 2:
	case 7:
		__oTetris = new S_Tetris(__iAxis, __iAngle);
		break;
	case 3:
		__oTetris = new L_Tetris(__iAxis, __iAngle);
		break;
	case 4:
		__oTetris = new Z_Tetris(__iAxis, __iAngle);
		break;
	case 5:
		__oTetris = new T_Tetris(__iAxis, __iAngle);
		break;
	case 6:
		__oTetris = new J_Tetris(__iAxis, __iAngle);
		break;
	default:
		__oTetris = new T_Tetris(__iAxis, __iAngle);
		break;
	}
	return __oTetris;
};
/**
 * 显示方块
 */
Tetris.prototype.draw = function() {
	for ( var i = 0; i < this.body.length; i++) {
		var _oE = document.getElementById(this.body[i]);
		if (_oE)
			_oE.style.background = "#135";
	}
};
/**
 * 擦除方块
 */
Tetris.prototype.eraser = function() {
	for ( var i = 0; i < this.body.length; i++) {
		var _oE = document.getElementById(this.body[i]);
		if (_oE) {
			_oE.style.background = document.getElementById("canvas").style.background;
		}
	}
};
/**
 * 旋转修正.避免旋转过后超出画布范围
 * 
 * @return
 */
Tetris.prototype.rotateTune = function(aBody) {
	this.body = aBody;
	// 修正Tetris的转动轴axis及调整修正转动轴后的body
	if (this.axis % Tetris.column == 1) {
		for ( var i = 0; i < this.body.length; i++) {
			this.body[i]++;
		}
		this.axis++;
	}
	if (this.axis % Tetris.column == 0) {
		for ( var i = 0; i < this.body.length; i++) {
			this.body[i] -= 2;
		}
		this.axis -= 1;
	}
};
/**
 * 移动Tetris
 * 
 * -1：左移动 +1：右移 +10：下移
 * 
 * @param iOffset
 *            位移
 * @return
 */
Tetris.prototype.move = function(iOffset) {
	this.eraser();
	for ( var i = 0; i < this.body.length; i++) {
		this.body[i] += iOffset;
	}
	this.axis += iOffset;
	this.draw();
};
/**
 * O-型方块类.O-型方块旋转没有变化,因此无需调用基类rotate方法
 * 
 * @param iAxis
 *            旋转轴
 * @return
 */
function O_Tetris(iAxis) {
	Tetris.call(this, iAxis, new Array(+iAxis - 1, +iAxis, +iAxis
			+ Tetris.column - 1, +iAxis + Tetris.column));
}
// 为了使用父类的属性和方法，需要将子类的prototye属性设置成父类的实例，这样就实现了继承。下同
O_Tetris.prototype = new Tetris();
O_Tetris.prototype.rotate = function() {
	return;
};
/**
 * I-型方块类
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/180/360,90/270).I型为0/180/360度
 * @return
 */
function I_Tetris(iAxis, iAngle) {
	Tetris.call(this, iAxis, I_Tetris.newITetrisBody(iAxis, iAngle));
	this.iAngle = iAngle;
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
I_Tetris.newITetrisBody = function(iAxis, iAngle) {
	var __iBody = null;
	switch (iAngle) {
	case 0:
	case 180:
	case 360:
		iAxis = (iAxis % 10 == 0) ? iAxis -= 2 : (iAxis % 10 == 9) ? iAxis -= 1
				: iAxis;
		__iBody = new Array(iAxis - 1, iAxis, iAxis + 1, iAxis + 2);
		break;
	case 90:
	case 270:
		__iBody = new Array(iAxis - Tetris.column, iAxis,
				iAxis + Tetris.column, iAxis + 2 * Tetris.column);
		break;
	default:
		__iBody = new Array(iAxis - 1, iAxis, iAxis + 1, iAxis + 2);
		break;
	}
	return __iBody;
};
I_Tetris.prototype = new Tetris();
I_Tetris.prototype.rotate = function() {
	this.iAngle = (this.iAngle == 360) ? 90 : this.iAngle + 90;
	this.rotateTune(I_Tetris.newITetrisBody(this.axis, this.iAngle));
};
/**
 * L-型方块类
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/360,90,180,270)L型为0度,每次顺时针旋转90度
 * @return
 */
function L_Tetris(iAxis, iAngle) {
	Tetris.call(this, iAxis, L_Tetris.newLTetrisBody(iAxis, iAngle));
	this.iAngle = iAngle;
}
/**
 * 创建新的L-型方块
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度
 * @return
 */
L_Tetris.newLTetrisBody = function(iAxis, iAngle) {
	var __lBody = null;
	switch (iAngle) {
	case 0:
	case 360:
		__lBody = new Array(iAxis - Tetris.column, iAxis,
				iAxis + Tetris.column, iAxis + Tetris.column + 1);
		break;
	case 90:
		__lBody = new Array(iAxis + 1, iAxis, iAxis - 1, iAxis + Tetris.column
				- 1);
		break;
	case 180:
		__lBody = new Array(iAxis + Tetris.column, iAxis,
				iAxis - Tetris.column, iAxis - Tetris.column - 1);
		break;
	case 270:
		__lBody = new Array(iAxis - 1, iAxis, iAxis + 1, iAxis - Tetris.column
				+ 1);
		break;
	default:
		__lBody = new Array(iAxis - Tetris.column, iAxis,
				iAxis + Tetris.column, iAxis + Tetris.column + 1);
		break;
	}
	return __lBody;
};
L_Tetris.prototype = new Tetris();
L_Tetris.prototype.rotate = function() {
	this.iAngle = (this.iAngle == 360) ? 90 : this.iAngle + 90;
	this.rotateTune(L_Tetris.newLTetrisBody(this.axis, this.iAngle));
};
/**
 * J-型方块类
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/360,90,180,270)J型为0度,每次顺时针旋转90度
 * @return
 */
function J_Tetris(iAxis, iAngle) {
	Tetris.call(this, iAxis, J_Tetris.newJTetrisBody(iAxis, iAngle));
	this.iAngle = iAngle;
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
J_Tetris.newJTetrisBody = function(iAxis, iAngle) {
	var __jBody = null;
	switch (iAngle) {
	case 0:
	case 360:
		__jBody = new Array(iAxis - Tetris.column, iAxis,
				iAxis + Tetris.column, iAxis + Tetris.column - 1);
		break;
	case 90:
		__jBody = new Array(iAxis + 1, iAxis, iAxis - 1, iAxis - Tetris.column
				- 1);
		break;
	case 180:
		__jBody = new Array(iAxis + Tetris.column, iAxis,
				iAxis - Tetris.column, iAxis - Tetris.column + 1);
		break;
	case 270:
		__jBody = new Array(iAxis - 1, iAxis, iAxis + 1, iAxis + Tetris.column
				+ 1);
		break;
	default:
		__jBody = new Array(iAxis - Tetris.column, iAxis,
				iAxis + Tetris.column, iAxis + Tetris.column - 1);
		break;
	}
	return __jBody;
};
J_Tetris.prototype = new Tetris();
J_Tetris.prototype.rotate = function() {
	this.iAngle = (this.iAngle == 360) ? 90 : this.iAngle + 90;
	this.rotateTune(J_Tetris.newJTetrisBody(this.axis, this.iAngle));
};
/**
 * T-型方块类
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/360,90,180,270)T型为0度,每次顺时针旋转90度
 * @return
 */
function T_Tetris(iAxis, iAngle) {
	Tetris.call(this, iAxis, T_Tetris.newTTetrisBody(iAxis, iAngle));
	this.iAngle = iAngle;
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
T_Tetris.newTTetrisBody = function(iAxis, iAngle) {
	var __tBody = null;
	switch (iAngle) {
	case 0:
	case 360:
		__tBody = new Array(iAxis - 1, iAxis, iAxis + 1, iAxis + Tetris.column);
		break;
	case 90:
		__tBody = new Array(iAxis - Tetris.column, iAxis,
				iAxis + Tetris.column, iAxis - 1);
		break;
	case 180:
		__tBody = new Array(iAxis + 1, iAxis, iAxis - 1, iAxis - Tetris.column);
		break;
	case 270:
		__tBody = new Array(iAxis + Tetris.column, iAxis,
				iAxis - Tetris.column, iAxis + 1);
		break;
	default:
		__tBody = new Array(iAxis - 1, iAxis, iAxis + 1, iAxis + Tetris.column);
		break;
	}
	return __tBody;
};
T_Tetris.prototype = new Tetris();
T_Tetris.prototype.rotate = function() {
	this.iAngle = (this.iAngle == 360) ? 90 : this.iAngle + 90;
	this.rotateTune(T_Tetris.newTTetrisBody(this.axis, this.iAngle));
};
/**
 * S-型方块类
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/180/360,90/270).S型为0/180/360度
 * @return
 */
function S_Tetris(iAxis, iAngle) {
	Tetris.call(this, iAxis, S_Tetris.newSTetrisBody(iAxis, iAngle));
	this.iAngle = iAngle;
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
S_Tetris.newSTetrisBody = function(iAxis, iAngle) {
	var __sBody = null;
	switch (iAngle) {
	case 0:
	case 180:
	case 360:
		__sBody = new Array(iAxis + 1, iAxis, iAxis + Tetris.column, iAxis
				+ Tetris.column - 1);
		break;
	case 90:
	case 270:
		__sBody = new Array(iAxis - Tetris.column, iAxis, iAxis + 1, iAxis
				+ Tetris.column + 1);
		break;
	default:
		__sBody = new Array(iAxis + 1, iAxis, iAxis + Tetris.column, iAxis
				+ Tetris.column - 1);
		break;
	}
	return __sBody;
};
S_Tetris.prototype = new Tetris();
S_Tetris.prototype.rotate = function() {
	this.iAngle = (this.iAngle == 360) ? 90 : this.iAngle + 90;
	this.rotateTune(S_Tetris.newSTetrisBody(this.axis, this.iAngle));
};
/**
 * Z-型方块类
 * 
 * @param iAxis
 *            旋转轴
 * @param iAngle
 *            角度(枚举类型0/180/360,90/270).Z型为0/180/360度
 * @return
 */
function Z_Tetris(iAxis, iAngle) {
	Tetris.call(this, iAxis, Z_Tetris.newZTetrisBody(iAxis, iAngle));
	this.iAngle = iAngle;
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
Z_Tetris.newZTetrisBody = function(iAxis, iAngle) {
	var __zBody = null;
	switch (iAngle) {
	case 0:
	case 180:
	case 360:
		__zBody = new Array(iAxis - 1, iAxis, iAxis + Tetris.column, iAxis
				+ Tetris.column + 1);
		break;
	case 90:
	case 270:
		__zBody = new Array(iAxis - Tetris.column, iAxis, iAxis - 1, iAxis
				+ Tetris.column - 1);
		break;
	default:
		__zBody = new Array(iAxis - 1, iAxis, iAxis + Tetris.column, iAxis
				+ Tetris.column + 1);
		break;
	}
	return __zBody;
};
Z_Tetris.prototype = new Tetris();
Z_Tetris.prototype.rotate = function() {
	this.iAngle = (this.iAngle == 360) ? 90 : this.iAngle + 90;
	this.rotateTune(Z_Tetris.newZTetrisBody(this.axis, this.iAngle));
};