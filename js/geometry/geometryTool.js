//ab是一组起点终点, cd是另外一组
function getCrossPoint(a, b, c, d) {
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交
    var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
    if (denominator == 0) {
        return false;
    }
    // 线段所在直线的交点坐标 (x , y)    
    var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) + (b.y - a.y) * (d.x - c.x) * a.x - (d.y - c.y) * (b.x - a.x) * c.x) / denominator;
    var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x) + (b.x - a.x) * (d.y - c.y) * a.y - (d.x - c.x) * (b.y - a.y) * c.y) / denominator;
    /** 2 判断交点是否在两条线段上 **/
    if ( // 交点在线段1上
        (x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0
        // 且交点也在线段2上
        && (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0
    ) {
        // 返回交点p
        return {
            x: x,
            y: y
        }
    }
    //否则不相交
    return false
}



//已知三个点坐标求其构成的三角形的内角大小
var pi180 = 180 / Math.PI;
function getAngle(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y) {
    var _cos1 = getCos(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y); //第一个点为顶点的角的角度的余弦值

    return Math.acos(_cos1) * pi180;
}

//获得三个点构成的三角形的 第一个点所在的角度的余弦值
function getCos(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y) {
    var length1_2 = getLength(point1_x, point1_y, point2_x, point2_y); //获取第一个点与第2个点的距离
    var length1_3 = getLength(point1_x, point1_y, point3_x, point3_y);
    var length2_3 = getLength(point2_x, point2_y, point3_x, point3_y);

    var res = (Math.pow(length1_2, 2) + Math.pow(length1_3, 2) - Math.pow(length2_3, 2)) / (length1_2 * length1_3 * 2); //cosA=(pow(b,2)+pow(c,2)-pow(a,2))/2*b*c

    return res;
}

//获取坐标轴内两个点间的距离
function getLength(point1_x, point1_y, point2_x, point2_y) {
    var diff_x = Math.abs(point2_x - point1_x);
    var diff_y = Math.abs(point2_y - point1_y);

    var length_pow = Math.pow(diff_x, 2) + Math.pow(diff_y, 2); //两个点在 横纵坐标的差值与两点间的直线 构成直角三角形。length_pow等于该距离的平方

    return Math.sqrt(length_pow);
}



//判断点在多边形内
//http://www.cnblogs.com/langu/p/4033608.html
//判断平面上两线段是否相交
//http://www.cnblogs.com/zhangchaoyang/articles/2668562.html
//谈谈"求线段交点"的几种算法(js实现,完整版)
//http://fins.iteye.com/blog/1522259


//add by rt : 两bounds是否有交集, 用于判断折线是否在屏幕范围内
var isBoundsCross = function(bd1, bd2) {

    var lineMinLon = Math.min(bd1.maxpt.lon, bd1.minpt.lon),
        lineMaxLon = Math.max(bd1.maxpt.lon, bd1.minpt.lon),
        lineMinLat = Math.min(bd1.maxpt.lat, bd1.minpt.lat),
        lineMaxLat = Math.max(bd1.maxpt.lat, bd1.minpt.lat);

    var mapMinLon = Math.min(bd2.maxpt.lon, bd2.minpt.lon),
        mapMaxLon = Math.max(bd2.maxpt.lon, bd2.minpt.lon),
        mapMinLat = Math.min(bd2.maxpt.lat, bd2.minpt.lat),
        mapMaxLat = Math.max(bd2.maxpt.lat, bd2.minpt.lat);

    var isCross = (Math.abs((lineMinLon + lineMaxLon) - (mapMinLon + mapMaxLon)) < (lineMaxLon - lineMinLon + mapMaxLon - mapMinLon) && Math.abs((lineMinLat + lineMaxLat) - (mapMinLat + mapMaxLat)) < (lineMaxLat - lineMinLat + mapMaxLat - mapMinLat));

    console.log("isCross==>" + isCross);

    return isCross;
}