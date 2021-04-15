let Formats = {
	/**
	 * 去除字符串空格
	 * @param value
	 * @returns {string}
	 */
	removeSpace: function(value) {
		var rtnVal = value + "";
		return rtnVal.replace(/\s/g, "");
	},
	fmtAcctNo: function(value, hidden) {
		if (value == null || value == "") {
			return "";
		}
		value = this.removeSpace(value);
		var tmpStr = "";
		if (hidden) {
			if (value.length < 10) {
				var start = value.length - 2;
				if (start < 2) {
					start = 2;
				}
				tmpStr = tmpStr + value.substring(0, 2) + " **** " + value.substring(start, value.length);
			} else {
				var start = value.length - 4;
				if (start < 4) {
					start = 4;
				}
				tmpStr = tmpStr + value.substring(0, 6) + " ***** *** " + value.substring(start, value.length);
			}
		} else {
			while (value.length > 4) {
				tmpStr = tmpStr + value.substring(0, 4);
				tmpStr = tmpStr + " ";
				value = value.substring(4, value.length);
			}
			tmpStr = tmpStr + value;
		}
		return tmpStr;
	},




	/**
	 * 是否为空
	 * @param v  {*} 值
	 * @param allowBlank {boolean} 是否允许空
	 * @returns {boolean|*}
	 */
	isEmpty: function(v, allowBlank) {
		return v === null || v === undefined ||
			String(v).toUpperCase() === 'NULL' ||
			((this.isArray(v) && !v.length)) ||
			(!allowBlank ? v === '' : false);
	},
	/**
	 * 是否是数组
	 * @param v
	 * @returns {boolean}
	 */
	isArray: function(v) {
		return this.toString(v) === '[object Array]';
	},
	/**
	 * 转换为字符
	 * @param v {object}
	 * @returns {string}
	 */
	toString: function(v) {
		return Object.prototype.toString.apply(v);
	},

	/**
	 * 金额格式化保留2位小数点
	 * @param s
	 * @returns {*}
	 */
	fmtAmt: function(s) {
		try {
			return this.fmtMoney(s, 2, ".", ",");
		} catch (e) {
			return "0.00";
		}
	},
	/**
	 * 格式化金额
	 * @param v 原始金额
	 * @param c 小数点后保留为数（默认为2）
	 * @param d 小数点
	 * @param t 整数区千位分割（默认为逗号）
	 * @returns {string}
	 */
	fmtMoney: function(v, c, d, t) {
		v = v + "";
		v = v.replace(/,/g, "");
		v *= 1;
		var p = v < 0 ? '-' : '';
		c = c || 2;
		v = v.toFixed(c);
		c = Math.abs(c) + 1 ? c : 2;
		d = d || '.';
		t = t || ',';
		var m = (/(\d+)(?:(\.\d+)|)/.exec(v + ''));
		var x = m[1].length > 3 ? m[1].length % 3 : 0;
		return p + (x ? m[1].substr(0, x) + t : '') +
			m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + t) +
			(c ? d + (+m[2] || 0).toFixed(c).substr(2) : '');
	},
}
export default {
	Formats
};
