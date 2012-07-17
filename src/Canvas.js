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