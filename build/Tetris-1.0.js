/**
 * 辅助类
 * @author leeyee
 * @blog blog.csdn.net/oxcow
 * @email seadlead@gmail.com
 * @data 2010-4
 */
/**
 * 创建DOM元素
 * 
 * @param sTagName
 *            元素名
 * @param sTagId
 *            元素ID
 * @param sText
 *            元素文本
 * @return DOM元素对象
 */
function createElement(sTagName, sTagId, sText) {
	var oElement = document.createElement(sTagName);
	if (sTagId != null) {
		oElement.setAttribute("id", sTagId);
	}
	if (sText != null) {
		oElement.appendChild(document.createTextNode(sText));
	}
	return oElement;
}
function RandomEventUtils() {
}
/**
 * 得到从零到N的随机整数
 * 
 * @param iN
 *            最大整数
 * @return 0-iN的随机整数
 */
RandomEventUtils.getIntRandomNumFromZeroToN = function(iN) {
	var iR = Math.random() * iN;
	return Math.round(iR);// 舍尾取数
};
/**
 * 获取某个元素在数组中的位置
 * 
 * @param vItem
 *            目标元素
 * @return 目标元素在数组中的索引
 */
Array.prototype.indexOf = function(vItem) {
	for ( var i = 0; i < this.length; i++) {
		if (vItem == this[i]) {
			return i;
		}
	}
	return -1;
};
/**
 * 获取数组的长度。不包括undefined元素
 * 
 * @return
 */
Array.prototype._length = function() {
	var __len = 0;
	for ( var i = 0; i < this.length; i++) {
		if (this[i] != undefined) {
			__len++;
		}
	}
	return __len;
};
/**
 * 清除数组中的undefined元素
 * 
 * @return 数组清除后的数组（数组长度改变）
 */
Array.prototype.cleanUndefinedElement = function() {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] == undefined) {
			this.splice(i--, 1);
		}
	}
	return this;
};
/**
 * 创建一个长度为 iLen 的二维数组，其中第二位数组的长度未定义
 * 
 * @param iLen
 *            数组长度
 * @return
 */
function createTwoDimensionArray(iLen) {
	var __aDefaultArray = new Array(iLen);
	for ( var i = 0; i < iLen; i++) {
		__aDefaultArray[i] = new Array();
	}
	return __aDefaultArray;
}
/**
 * 将目标数组 aObj 以 iN 分组。具有相同商的放在相同维度中，同时根据余数确定二维存放位置<br/>
 * 
 * 比如将 [1,3,21] 以10分组，那么返回的二维数组为：[[1,,3],[],[21]]
 * 
 * @param aObj
 *            目标数组
 * @param iN
 *            分组因子
 * @return 一个长度为20的二维数组
 */
function elementGroupByN(aObj, iN) {
	var __aZeroArray = createTwoDimensionArray(20, new Array());
	for ( var i = 0; i < aObj.length; i++) {
		var __quotient = Math.floor((aObj[i] - 1) / iN);// 取商(被10除,商相同的元素为一组)
		var __remainder = (aObj[i] - 1) % iN;// 取余
		__aZeroArray[__quotient][__remainder] = aObj[i];// 商相同的放在相同维度的余数位置
	}
	return __aZeroArray;
}

/**
 * 俄罗斯方块所在画布类
 * 
 * @author leeyee
 * @blog blog.csdn.net/oxcow
 * @email seadlead@gmail.com
 * @data 2010-4
 * @param iRow
 *            画布行数
 * @param iColumn
 *            画布列数
 * @param sOffset
 *            画布显示位置
 */
function Canvas(iRow, iColumn, sOffset) {
	this.row = iRow;// 行
	this.column = iColumn;// 列
	this.offset = sOffset;// 显示位置
}
Canvas.prototype.draw = function() {
	var oDiv_canvas = document.getElementById(this.offset);
	if (oDiv_canvas == null) {
		oDiv_canvas = createElement("div", this.offset, null);
		document.body.appendChild(oDiv_canvas);
	}
	var oFragment = document.createDocumentFragment();// 创建文档碎片
	for ( var i = 1; i <= this.row * this.column; i++) {
		var oSpan = createElement("span", i, null);
		oFragment.appendChild(oSpan);
	}
	oDiv_canvas.appendChild(oFragment);
};

/**
 * 预览画布类
 * 
 * @param iRow
 *            行数
 * @param iColumn
 *            列数
 * @param sOffset
 *            显示位置
 * @return
 */
function PreCanvas(iRow, iColumn, sOffset) {
	this.row = iRow;
	this.column = iColumn;
	this.offset = sOffset;
}
PreCanvas.prototype.draw = function() {
	var oDiv_preCanvas = document.getElementById(this.offset);
	if (oDiv_preCanvas == null) {
		oDiv_preCanvas = createElement("div", this.offset, null);
		document.body.appendChild(oDiv_preCanvas);
	}
	var oFragment = document.createDocumentFragment();// 创建文档碎片
	for ( var i = -(this.row * this.column) + 11; i < 11; i++) {
		var oSpan = createElement("span", "pre_" + i, null);
		oFragment.appendChild(oSpan);
	}
	oDiv_preCanvas.appendChild(oFragment);
};
PreCanvas.prototype.show = function(oArray) {
	for ( var i = -(this.row * this.column) + 11; i < 11; i++) {
		var __oE = document.getElementById("pre_" + i);
		if (__oE) {
			__oE.style.background = document.getElementById(this.offset).style.background;
		}
	}
	for ( var i = 0; i < oArray.length; i++) {
		var __oE = document.getElementById("pre_" + oArray[i]);
		if (__oE) {
			__oE.style.background = "blue";
		}
	}
};
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
function TetrisGame() {
	this.timeOut;
	this.score = 0;// 得分
	this.level = 0;// 等级
	this.speed = 1000;// 降落速度
	this.canvas = new Canvas(20, 10, "canvas");// 创建canvas对象
	this.preCanvas = new PreCanvas(10, 4, "preCanvas");
	this.tetris = null;// 方块
	this.preTetris = Tetris.Factory();
	this.body = new Array();// 记录游戏中已经被占的格子
}
/**
 * 预计加载
 * 
 * @return
 */
TetrisGame.prototype.preload = function() {
	this.displayScoreAndLevel();
	this.canvas["draw"]();
	this.preCanvas["draw"]();
	this.preCanvas["show"](this.preTetris.body);
};
/**
 * 创建新的方块
 * 
 * @return
 */
TetrisGame.prototype.newTetris = function() {
	this.tetris = this.preTetris;
	this.preTetris = Tetris.Factory();
	this.preCanvas["show"](this.preTetris.body);
};
/**
 * 清除已经填满的行
 * 
 * @author leeyee
 * @return 返回每次清除的行数
 */
TetrisGame.prototype.__eraserRow = function() {
	var __iRow = 0;// 清除的行数
	// 当数组长度超过80时，sort()方法无法正确排序，因此需要提供比较器
	// 关于比较器可参看http://www.w3school.com.cn/js/jsref_sort.asp
	this.body.sort(function(a, b) {
		return a - b;
	});
	// 将属于一行的元素放在相同的数组中，并通过二维数组的第一维确认其所在行
	var f = elementGroupByN(this.body, 10);
	var __temp = new Array();// 用于存储被销毁行上层的所占格子
	for ( var i = 0; i < f.length; i++) {
		if (f[i]["_length"]() == 0) {// 如果该行数组的长度(不统计未定义的数组元素)为0则说明该行尚未被占
			continue;
		}
		if (f[i]["_length"]() != 10) {// 如果该行有数据但未达到满格则记录下来
			__temp = __temp.concat(f[i]);
		} else if (f[i]["_length"]() == 10) {
			// 从已经占有的格子中清除属于一行的格子
			this.body.splice(this.body.indexOf(i * 10 + 1), 10);
			// 将需要清除的一行元素赋值给方块对象，并调用方块的eraser方法将其从画布上清除掉
			this.tetris.body = f[i];
			this.tetris["eraser"]();
			// 将被消除层的上层格子下移
			if (__temp.length != 0) {
				this.tetris.body = __temp["cleanUndefinedElement"]();// 清除掉数组中未定义的元素
				this.body.splice(0, this.tetris.body.length);// 从已占格子中清除上层各式
				this.tetris["move"](10);// 上层格子下移
				this.body = this.tetris.body.concat(this.body);// 将移动后的上层格子添加到已占格子的前端
			}
			__iRow++;
		}
	}
	return __iRow;
};
/**
 * 触碰事件
 * 
 * @return
 */
TetrisGame.prototype.touchHandler = function() {
	this.tetris.body.sort();
	// 是否碰到已经被占的格子
	for ( var i = 0; i < 4; i++) {
		// 游戏结束
		if ((this.tetris.body[0] < 0 || Math.floor((this.tetris.body[i]) / 10) == 1)
				&& this.body.indexOf(this.tetris.body[i] + 10) != -1) {
			alert("GAME OVER");
			location.reload();
		}
		// 方块的组成中只要一个放块的下一个位置属于已经被占的就表明该方块不可以在往下移动了
		if (this.body.indexOf(this.tetris.body[i] + 10) != -1) {
			this.body = this.body.concat(this.tetris.body);
			this.scoreAndLevelHandler(this.__eraserRow());
			return true;
		}
	}
	// 表示方块的最后一个数是否属于最低层，属于就判断为已经到底
	if (Math.floor((this.tetris.body[3] - 1) / 10) == 19) {
		this.body = this.body.concat(this.tetris.body);
		this.scoreAndLevelHandler(this.__eraserRow());// 清除已经填满的行
		return true;
	}
	return false;
};
TetrisGame.prototype.rotateHandler = function() {
	var __tetrisBody = this.tetris.body;// 记录下变型前的方块对象的身体及角度
	var __tetrisAngle = this.tetris.iAngle;
	this.tetris.eraser();// 先清除方块对象
	this.tetris.rotate();
	for ( var i = 0; i < this.tetris.body.length; i++) {
		if (this.body.indexOf(this.tetris.body[i]) != -1) {// 假如变型后的位置已经有方块则返回变型前
			this.tetris.iAngle = __tetrisAngle;
			this.tetris.body = __tetrisBody;
			break;
		}
	}
	this.tetris.draw();// 展示方块对象
};
TetrisGame.prototype.scoreAndLevelHandler = function(iRow) {
	this.score += 10;// 每降落一个方块+10分
	if (iRow != 0) {// 消除一行100分;两行200分;三行400分;四行800分
		this.score += Math.pow(2, iRow - 1) * 100;
	}
	this.level = Math.floor(this.score / 400);
	if (this.speed > 130) {
		this.speed = 1000 - Math.floor(this.level / 3) * 80;
	}
	this.displayScoreAndLevel();
};
// 显示得分及等级
TetrisGame.prototype.displayScoreAndLevel = function() {
	document.getElementById("score").innerHTML = this.score;
	document.getElementById("level").innerHTML = this.level;
};
/**
 * 检测是否到达画布边缘.左或右
 * 
 * @param sDirc
 *            left or right
 * @return 到达返回true.否则返回false
 */
TetrisGame.prototype.leftOrRightMove = function(sDirc) {
	for ( var i = 0; i < 4; i++) {
		// 判断是否已经到达最左边
		if (sDirc == "left") {
			if (this.tetris.body[i] % 10 == 1
					&& (this.tetris.body[i] - 1) % 10 == 0) {
				return true;
			}
			if (this.body.indexOf(this.tetris.body[i] - 1) != -1) {
				return true;
			}
		} else if (sDirc == "right") {
			// 判断是否已经到达最右边
			if (this.tetris.body[i] % 10 == 0
					&& (this.tetris.body[i] + 1) % 10 == 1) {
				return true;
			}
			if (this.body.indexOf(this.tetris.body[i] + 1) != -1) {
				return true;
			}
		} else {
			break;
		}
	}
	return false;
};
TetrisGame.prototype.keyboardEventsListeners = function(oEvent) {
	var direc = null;
	if (window.event) {// ie
		direc = window.event.keyCode;
	} else if (oEvent.which) {// ff
		direc = oEvent.which;
	}
	if (direc == 37) {// 37-->left
		if (!this.leftOrRightMove("left"))
			this.tetris.move(-1);
	}
	if (direc == 39) {// 39-->right
		if (!this.leftOrRightMove("right"))
			this.tetris.move(+1);
	}
	if (direc == 38) {// 38-->up
		this.rotateHandler();// 旋转
	}
	if (direc == 40) {// 40-->down
		if (this.touchHandler()) {
			this.newTetris();
		}
		this.tetris.move(+10);
	}
};
TetrisGame.prototype.__delay = function(obj, fn, time) {
	fnGameDelay = function() {
		// call方法会把fn方法中的this关键字替换成obj对象
		fn.call(obj);
		// apply方法同call，但参数要用数组形式。
		// IE中参数为空时不能用apply(obj,null),但FF中是可以的
		// fn.apply(obj, new Array());
	};
	return setTimeout("fnGameDelay()", time);
};
/**
 * 开始游戏
 * 
 * @return
 */
TetrisGame.prototype.start = function() {
	if (this.tetris == null || this.touchHandler()) {
		this.newTetris();
	}
	this.tetris["move"](10);
	this.timeOut = this["__delay"](this, this.start, this.speed);
};
/**
 * 暂停游戏
 * 
 * @return
 */
TetrisGame.prototype.stop = function() {
	clearTimeout(this.timeOut);
};
// 重新开始
TetrisGame.prototype.restart = function() {
	location.reload();
};

window.onload = function() {
	var oTetrisGame = new TetrisGame();
	oTetrisGame["preload"]();
	document.onkeydown = function(oEvent) {
		oTetrisGame["keyboardEventsListeners"].call(oTetrisGame, oEvent);
	};
	document.getElementById("start").onclick = function() {
		oTetrisGame["start"].call(oTetrisGame);
	};
	document.getElementById("stop").onclick = function() {
		oTetrisGame["stop"].call(oTetrisGame);
	};
	document.getElementById("restart").onclick = function() {
		oTetrisGame["restart"].call(oTetrisGame);
	};
};
