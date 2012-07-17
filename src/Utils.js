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
