var rtPoint = rtPoint || {};
var rtPoint = function(x, y) {
	this.x = 0;
	this.y = 0;
	this.svg = null;

	this.init(x, y);
}

rtPoint.prototype = {
	COLOR: "skyblue",

	init: function(x, y) {
		this.x = x;
		this.y = y;

		//默认画板
		if (null === this.svg) {
			this.svg = _SVG;
		};

		//this.toPixel();
	},
	draw: function() {
		this.svg.drawPoint({x:this.x,y:this.y});
	},
	toString: function(accuracy) {
		//return "rtPoint==>"+"x= "+this.x+"_y= "+this.y;
		return '{"x":' + this.x.toFixed(accuracy) + ',"y":' + this.y.toFixed(accuracy) + '}';
	}
}