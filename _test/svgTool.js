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

//
function pointAmark(point){
    var svg = makeSVG("circle",{cx:point.x,cy:point.y,r:2,style:"fill:skyblue"});   
    document.getElementById("svgContainer").appendChild(svg);
}*/

//应该换成lnglat
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
}


/*
var brush = {};
(function() {
    brush.color = "rgb(255, 0, 0)";
    brush.stroke = 5;
    brush.transparency = 60;
    brush.bgcolor = "rgb(255, 0, 0)";
    brush.bgtransparency = 30;
    //brush.overlap.enable = false;
    //brush.overlap.stroke = 16;
    brush.fill = true;
    return brush;
})();*/
function setLineBrush(color,svg){
    var coulor = color || "rgb(255, 0, 0)";

    svg.setAttribute("stroke-width","5px");
    svg.setAttribute("stroke",coulor);
    svg.setAttribute("stroke-linejoin","round");
    svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-opacity","0.6");
    //svg.setAttribute("fill-opacity","0.3");
    //svg.setAttribute("fill","rgb(255, 0, 0)");
    svg.setAttribute("fill","none");
    svg.setAttribute("style","cursor: pointer;");
    svg.setAttribute("transparency", 60);
}

function drawPoint(point,color,svgContainer){
    //"circle",{cx:point.x,cy:point.y,r:2,style:"fill:skyblue"});
    var containerDom = svgContainer;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    text.setAttribute("fill",color||"skyblue");
    text.setAttribute("cx", point.x);
    text.setAttribute("cy", point.y);
    text.setAttribute("r","2");
    containerDom.appendChild(text);
}

function drawLine(points,color,svgContainer){
    var containerDom = svgContainer;//$$(svgContainerId);
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    setLineBrush(color,path);//设置样式
    var pathStr = "";

    for( var i=0,len=points.length;i<len;i++){
        var one = points[i];
        var mode = one.mode;//"skip"对应M,L切换

        if( 0==i || mode==="skip"){
            pathStr += "M";
        } else {
            pathStr += "L";
        }
        
        pathStr = pathStr+one.x+","+one.y+" ";
    }
    //最后是Z 会闭合曲线
    //pathStr += "Z"; 
    path.setAttribute("d", pathStr);
    containerDom.appendChild(path);
}

function drawText(point,str,color,svgContainer){
    var containerDom = svgContainer;//;$$(svgContainerId);
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.innerHTML = str;
    text.setAttribute("x", point.x);
    text.setAttribute("y", point.y);
    containerDom.appendChild(text);
}

//创建svg容器
function createSVGContainer(thatId,containerId){
    var containerDom = $$(containerId);
    //_SVG_CONTAINER = containerDom;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = thatId;
    svg.className = thatId;
    containerDom.appendChild(svg);

    return svg;
}
//svg标尺
function createSVGRuler(svgContainer){
    var containerDom = svgContainer;//$$(svgContainerId);
    //_SVG_RULER_CONTAINER = containerDom;

    var width = getStyle(containerDom,"width"),
        height = getStyle(containerDom,"height");

    drawRowRuler();
    drawLineRuler();

    function drawRowRuler(){
        drawLine([{x:0,y:0},{x:width,y:0}],"rgb(30, 30, 30)",containerDom);
        bigLine(100,"width",containerDom);
    };
    function drawLineRuler(){
        drawLine([{x:0,y:0},{x:0,y:height}],"rgb(30, 30, 30)",containerDom);
        bigLine(100,"height",containerDom);
    };
    function bigLine(step,ruler,containerDom){
        var ref = ("width" === ruler) ? width : height;
        var points = [];
        for( var pos=0;pos<ref;pos+=step){
           
            if( "width" === ruler){
                points.push({x:pos,y:0,mode:"skip"},{x:pos,y:30});
                drawText({x:pos,y:30},pos,null,containerDom);
            } else {
                points.push({x:0,y:pos,mode:"skip"},{x:30,y:pos});
                drawText({x:30,y:pos},pos,null,containerDom);
            }
        }
        drawLine(points,"rgb(30, 30, 30)",containerDom);
    }

    return containerDom;
}
//var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
/*
var SVG = SVG || {};
SVG = function(){

}*/

