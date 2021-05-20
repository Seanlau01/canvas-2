var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var lineWidth = 5
var eraserEnabled = false
var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}
//函数执行区
testSupportTouchDevice()
autoSetCanvasSize()
changeCanvasBGColor()
usingToolbar()

//函数封装区
function testSupportTouchDevice(){
    if(document.body.ontouchstart !== undefined){
        touchEvent()
    }else{
        mouseEvent()
        }    
    }
function autoSetCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}
function changeCanvasBGColor(){
    ctx.fillStyle='white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    }
function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1) 
        ctx.lineWidth = lineWidth 
        ctx.lineTo(x2, y2) 
        ctx.stroke()
        ctx.closePath()
        }
function usingToolbar(){
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
        clear.onclick=function(){
            ctx.clearRect(0,0,canvas.width,canvas.height)
            changeCanvasBGColor()
        }
        download.onclick=function(){
            var url=canvas.toDataURL("image/png")
            var a=document.createElement('a')
            document.body.appendChild(a)
            a.href=url
            a.download='mycanvas'
            a.target='_blank'
            a.click()
        }
        red.onclick=function(){
            ctx.fillStyle ='red'
            ctx.strokeStyle ='red'
            red.classList.add('active')
            green.classList.remove('active')
            blue.classList.remove('active')
            black.calssList.remove('active')
        }
        green.onclick=function(){
            ctx.fillStyle ='green'
            ctx.strokeStyle='green'
            red.classList.remove('active')
            green.classList.add('active')
            blue.classList.remove('active')
            black.classList.remove('active')
        }
        blue.onclick=function(){
            ctx.fillStyle='blue'
            ctx.strokeStyle='blue'
            red.classList.remove('active')
            green.classList.remove('active')
            blue.classList.add('active')
            black.classList.remove('active')
        }
        black.onclick=function(){
            ctx.fillStyle='black'
            ctx.strokeStyle='black'
            red.classList.remove('active')
            green.classList.remove('active')
            blue.classList.remove('active')
            black.classList.add('active')
        }
        thin.onclick=function(){
         lineWidth = 5
        }
        thick.onclick=function(){
         lineWidth = 10
        }
}
function mouseEvent(){
    canvas.onmousedown = function (e) {
        var x = e.clientX
        var y = e.clientY
        using = true
        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    canvas.onmousemove = function (e) {
        var x = e.clientX
        var y = e.clientY
        if (!using) {
            return
        }
        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.onmouseup = function (e) {
        using = false
      } 
}
function touchEvent(){
    canvas.ontouchstart=function(e){
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        using = true
        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    canvas.ontouchmove=function(e){
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        if (!using) {
            return
        }
        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend=function(e){
        using = false
    }
}


