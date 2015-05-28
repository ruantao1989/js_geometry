function $$(str) {
	return document.getElementById(str);
}
function trim(str) {
	var newStr = str.replace(/(^\s*)|(\s*$)/g, '')
	return newStr;
}