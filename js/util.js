function $$(str) {
	return document.getElementById(str);
}

function trim(str) {
	var newStr = str.replace(/(^\s*)|(\s*$)/g, '')
	return newStr;
}

function getStyle(element, attr) {
	if (typeof window.getComputedStyle !== 'undefined') {
		//如果支持W3C，使用getComputedStyle来获取样式 
		return parseInt(window.getComputedStyle(element, null)[attr]);
	} else if (element.currentStyle) {
		return parseInt(element.currentStyle[attr]);
	}
}
//prototype扩展
(function() {
	Array.prototype.isArray = Array.prototype.isArray || function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
})()

//最小值,最大值,数值精度

function random(min, max, accuracy) {
	var sub = max - min,
		rdNum = Math.random() * sub + min;
	return rdNum.toFixed(accuracy);
}