var Svg = Svg || {};
var Svg = function(thatId, containerId, offset) {
    this.containerDom = null;
    this.width = 0;
    this.height = 0;
    //坐标原点
    //this.originX = 0;
    //this.originY = 0;

    this.lineBrush = null;
    //中心点坐标
    this.center = {
        x:0,
        y:0
    };
    //指定坐标轴的偏移
    this.offset = {
        x:0,
        y:0
    }
    //0,0原点
    this.origin = {
        x:0,
        y:0
    }

    //像素比例
    //this.scale = 2;

    //初始化
    this.init(thatId, containerId,offset);
}

Svg.prototype = {
    init: function(thatId, containerId, offset) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = thatId;
        svg.className = thatId;
        var containerDom = $$(containerId);
        containerDom.appendChild(svg);

        this.containerDom = svg;
        this.width = getStyle(containerDom, "width");
        this.height = getStyle(containerDom, "height");

        this.center.x = this.width/2;
        this.center.y = this.height/2;

        //this.drawPoint(this.center);
        if( !!offset ){
            this.offset.x = offset.x;
            this.offset.y = offset.y;

            this.origin.x = this.center.x + this.offset.x;//原先左上角是00点
            this.origin.y = this.center.y - this.offset.y;
        }
    },

    setLineBrush: function(color, svg) {
        var coulor = color || "rgb(255, 0, 0)";
        svg.setAttribute("stroke-width", "5px");
        svg.setAttribute("stroke", coulor);
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-opacity", "0.6");
        //svg.setAttribute("fill-opacity","0.3");
        //svg.setAttribute("fill","rgb(255, 0, 0)");
        svg.setAttribute("fill", "none");
        svg.setAttribute("style", "cursor: pointer;");
        svg.setAttribute("transparency", 60);
    },

    drawPoint: function(point, color) {
        var containerDom = this.containerDom;
        var text = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var pixel = this.toPixel(point);

        text.setAttribute("fill", color || "skyblue");
        text.setAttribute("cx", pixel.x);
        text.setAttribute("cy", pixel.y);
        text.setAttribute("r", "2");
        containerDom.appendChild(text);
    },

    drawLine: function(points, color) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.setLineBrush(color, path); //设置样式
        var pathStr = "";

        for (var i = 0, len = points.length; i < len; i++) {
            var one = points[i];
            var mode = one.mode; //"skip"对应M,L切换

            if (0 == i || mode === "skip") {
                pathStr += "M";
            } else {
                pathStr += "L";
            }

            var pixel = this.toPixel(one);
            pathStr = pathStr + pixel.x + "," + pixel.y + " ";
        }
        //最后是Z 会闭合曲线
        //pathStr += "Z"; 
        path.setAttribute("d", pathStr);
        this.containerDom.appendChild(path);
    },

    drawText: function(point, str, color) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var pixel = this.toPixel(point);
        text.innerHTML = str;
        text.setAttribute("x", pixel.x);
        text.setAttribute("y", pixel.y);
        this.containerDom.appendChild(text);
    },

    //坐标转像素
    toPixel: function(coordinate){
        var pixel = {
            x: 0,
            y: 0
        };

        pixel.x = coordinate.x + this.origin.x;
        pixel.y = this.height - (this.height - this.origin.y + coordinate.y);//总高 - 从底往上算的高
        //pixel.x *= this.scale;
        //pixel.y *= this.scale;
        return pixel;
    },

    //创建svg标尺
    createSVGRuler: function() {
        var that = this;
        drawRowRuler();
        drawLineRuler();

        function drawRowRuler() {
            that.drawLine([{x: -that.width,y: 0}, {x: that.width,y: 0}], "rgb(30, 30, 30)");
            bigLine(50, "x");
        };

        function drawLineRuler() {
            that.drawLine([{x: 0,y: -that.height}, {x: 0,y: that.height}], "rgb(30, 30, 30)");
            bigLine(50, "y");
        };

        function bigLine(step, ruler) {
            var ref = ("width" === ruler) ? that.width : that.height;
            var points = [];
            /*
            for (var pos = 0; pos < ref; pos += step) {

                if ("x" === ruler) {
                    points.push({x: pos,y: 0+that.center.y,mode: "skip"}, {x: pos,y: 30+that.center.y});
                    that.drawText({x: pos,y: 30+that.center.y}, pos, null);
                } else {
                    points.push({x: 0+that.center.x,y: pos,mode: "skip"}, {x: 30+that.center.x,y: pos});
                    that.drawText({x: 30+that.center.x,y: pos}, pos, null);
                }
            }*/
            if ("x" === ruler) {
                for (var pos = 0; pos < ref+that.origin.x; pos += step) {
                    points.push({x: pos,y:0,mode: "skip"}, {x: pos,y: 30});
                    that.drawText({x: pos,y: 30}, pos, null);
                }
                //负向
                for (var pos = 0; pos > -ref-that.origin.x; pos -= step) {
                    points.push({x: pos,y:0,mode: "skip"}, {x: pos,y: 30});
                    that.drawText({x: pos,y: 30}, pos, null);
                }
            } else if ("y" === ruler) {
                for (var pos = 0; pos <= ref+that.origin.y; pos += step) {
                    points.push({x: 0,y: pos,mode: "skip"}, {x: 30,y: pos});
                    that.drawText({x: 30,y: pos}, pos, null);
                }

                for (var pos = 0; pos > -ref-that.origin.y; pos -= step) {
                    points.push({x: 0,y: pos,mode: "skip"}, {x: 30,y: pos});
                    that.drawText({x: 30,y: pos}, pos, null);
                }
            }

            that.drawLine(points, "rgb(30, 30, 30)");
        }
    }
}

/*
var SVG_NS = "http://www.w3.org/2000/svg";  
var XLINK_NS = "http://www.w3.org/1999/xlink";  
  
var ATTR_MAP = {  
    "className": "class",  
    "svgHref": "href"  
};  
  
var NS_MAP = {  
    "svgHref": XLINK_NS  
};  
  
function makeSVG(tag, attributes){  
    var elem = document.createElementNS(SVG_NS, tag);  
    for (var attribute in attributes) {  
        var name = (attribute in ATTR_MAP ? ATTR_MAP[attribute] : attribute);  
        var value = attributes[attribute];  
        if (attribute in NS_MAP)   
            elem.setAttributeNS(NS_MAP[attribute], name, value);  
        else   
            elem.setAttribute(name, value);  
    }  
    return elem;  
}  

function pointAmark(point){
    var svg = makeSVG("circle",{cx:point.x,cy:point.y,r:2,style:"fill:skyblue"});   
    document.getElementById("svgContainer").appendChild(svg);
}*/