var rtLable = rtLable || {};
var rtLable = function(point, text) {
	this.point = null;
	this.text = null;
	this.svg = svg;

	this.init(point, text);
}

rtLable.prototype = {
	COLOR: "skyblue",

	init: function(point, text) {
		this.point = point;
		this.text = text;

		//默认画板
		if (null === this.svg) {
			this.svg = _SVG;
		};
	},
	draw: function() {
		this.svg.drawText(this.point, this.text);
	},
	toString: function(accuracy) {
		return '{"x":' + this.x.toFixed(accuracy) + ',"y":' + this.y.toFixed(accuracy) + '}';
	}
}