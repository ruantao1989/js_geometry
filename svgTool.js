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
    document.getElementById("test").appendChild(svg);
}

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