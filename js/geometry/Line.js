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
/*应该换成lnglat
function getPointsArray(dom){
    var arry = [];
    var d = dom.getAttribute("d");
    //先删除Z,M,L
    d = d.replace(/Z/g,"");
    d = d.replace(/M/g,"");
    d = d.replace(/L/g,"");

    d = trim(d);
    var tmpArray = d.split(" ");

    for( var i=0,len=tmpArray.length;i<len;i++){
        var obj = {};
        var tArray = tmpArray[i].split(",");
        obj.x = tArray[0];
        obj.y = tArray[1];
        arry.push(obj);
    }

    return arry;
}*/