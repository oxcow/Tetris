/**
 * 辅助类
 * @author leeyee
 * @blog blog.csdn.net/oxcow
 * @email seadlead@gmail.com
 * @data 2010-4
 */
class Utils {
    /**
     * 创建DOM元素
     *
     * @param sTagName
     *            元素名
     * @param sTagId
     *            元素ID
     * @param sText
     *            元素文本
     * @return HTMLElement 元素对象
     */
    static CreateElement(sTagName, sTagId, sText) {
        let oElement = document.createElement(sTagName);
        if (sTagId != null) {
            oElement.setAttribute('id', sTagId);
        }
        if (sText != null) {
            oElement.appendChild(document.createTextNode(sText));
        }
        return oElement;
    }

    /**
     * 创建一个长度为 iLen 的二维数组，其中第二位数组的长度未定义
     *
     * @param iLen
     *            数组长度
     * @return
     */
    static CreateTwoDimensionArray(iLen) {
        let __aDefaultArray = new Array(iLen);
        // 注意：下面的代码不能使用 __aDefaultArray.fill([]) 或者 __aDefaultArray.fill(new Array()) 替代，否则所有二维数组都指向同一个数组。
        for (let i = 0; i < iLen; i++) {
            __aDefaultArray[i] = [];
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
     * @return Array 一个长度为20的二维数组
     */
    static ElementGroupByN(aObj, iN) {
        let __aZeroArray = Utils.CreateTwoDimensionArray(20);
        for (let ele of aObj) {
            let __quotient = Math.floor((ele - 1) / iN);// 取商(被10除,商相同的元素为一组)
            let __remainder = (ele - 1) % iN;// 取余
            __aZeroArray[__quotient][__remainder] = ele;// 商相同的放在相同维度的余数位置
        }
        return __aZeroArray;
    }

    /**
     * 得到从零到N的随机整数
     *
     * @param iN
     *            最大整数
     * @return Number 0-iN的随机整数
     */
    static RandomNumFromZeroToN(iN) {
        return Math.round(Math.random() * iN);// 舍尾取数
    }
}