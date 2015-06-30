var rtLine = rtLine || {};
var rtLine = function(arg) {
	this.points = [];
	this.svg = null;
	this.mode = null; //如skip

	this.init(arg);
}

rtLine.prototype = {
	init: function(arg) {
		//传入数组
		if (true === Array.isArray(arg)) {
			//this.points = 
			for (var i = 0, len = arg.length; i < len; i++) {
				var point = arg[i];
				var pt = new rtPoint(point.x, point.y);

				this.points.push(pt);
			}
		}
		//String var pts = arg.split(",");
		//默认画板
		if (null === this.svg) {
			this.svg = _SVG;
		};
	},
	draw: function() {
		this.svg.drawLine(this.points);
	},
	toString: function() {

	}
}