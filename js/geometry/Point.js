var rtPoint = rtPoint || {};
var rtPoint = function(lon, lat) {
	this.x = 0;
	this.y = 0;
	this.lon = lon;
	this.lat = lat;
	this.svg = null;

	this.init(lon, lat);
}

rtPoint.prototype = {
	COLOR: "skyblue",

	init: function(lon, lat) {
		this.lon = 0;
		this.lat = 0;
		//暂时统一成一样的
		this.x = lon;
		this.y = lat;

		//默认画板
		if (null === this.svg) {
			this.svg = _SVG;
		};
	},
	draw: function() {
		this.svg.drawPoint(this);
	},
	toString: function(accuracy) {
		//return "rtPoint==>"+"x= "+this.x+"_y= "+this.y;
		return '{"x":' + this.x.toFixed(accuracy) + ',"y":' + this.y.toFixed(accuracy) + '}';
	}
}