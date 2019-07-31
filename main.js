var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 5
/*********/
autoSetCanvasSize(yyy)
/********/
listenToUser(yyy)
/*******************/
//画笔和橡皮
var eraserEnabled = false
pen.onclick=function(){
eraserEnabled=false
pen.classList.add('active')
eraser.classList.remove('active')
}
eraser.onclick=function(){
eraserEnabled=true
eraser.classList.add('active')
pen.classList.remove('active')
}
//删除
clear.onclick=function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}
//保存
download.onclick=function(){
    var url=yyy.toDataURL("image/png")
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='mycanvas'
    a.target='_blank'
    a.click()
}
//调色板
red.onclick=function(){
    context.fillStyle ='red'
    context.strokeStyle ='red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.calssList.remove('active')
}
green.onclick=function(){
    context.fillStyle ='green'
    context.strokeStyle='green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick=function(){
    context.fillStyle='blue'
    context.strokeStyle='blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}
black.onclick=function(){
    context.fillStyle='black'
    context.strokeStyle='black'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.add('active')
}

//画笔粗细设定
thin.onclick=function(){
 lineWidth = 5
}
thick.onclick=function(){
 lineWidth = 10
}
/***************/

//画板大小设置
function autoSetCanvasSize(canvas) {
setCanvasSize()

window.onresize = function () {
    setCanvasSize()
}
function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}
}
//画圆
function drawCircle(x, y, radius) {
context.beginPath();
context.arc(x, y, radius, 0, Math.PI * 2)
context.fill()
}
//画线
function drawLine(x1, y1, x2, y2) {
context.beginPath();
context.moveTo(x1, y1) //起点
context.lineWidth = lineWidth //取当前的粗细
context.lineTo(x2, y2) //终点
context.stroke()
context.closePath()
}
//监听用户
function listenToUser(canvas) {

var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}
/***************/
//特性检测，判断设备支持触屏与否
if(document.body.ontouchstart !== undefined){
    //true是触屏设备（手机）
    //开始点触
    canvas.ontouchstart=function(aaa){
        console.log('开始触摸')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        console.log(x,y)
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    //触屏并移动
    canvas.ontouchmove=function(aaa){
        console.log('边摸边动')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        console.log(x,y)
        if (!using) {
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    //触屏结束
    canvas.ontouchend=function(aaa){
        console.log('摸完了')
        using = false
    }
    
}else{
    //false是非触屏设备（pc）
    //鼠标按下
    canvas.onmousedown = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    //鼠标移动
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
    
        if (!using) {
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    //鼠标松开
    yyy.onmouseup = function (aaa) {
        using = false
      } 
    }    
}
