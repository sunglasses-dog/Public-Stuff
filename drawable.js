//http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    var canvas = document.getElementById("draw-canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWith = 2;
var background = new Image();
background.src = "800x800.png";
background.crossOrigin="anonymous";
// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);
}

// Set up mouse events for drawing
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
        drawing = true;
  lastPos = getMousePos(canvas, e);
  
}, {passive: false});
canvas.addEventListener("mouseup", function (e) {
  drawing = false;
}, {passive: false});
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
}, {passive: false});

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}
window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
        window.setTimeout(callback, 1000/60);
           };
})();
function renderCanvas() {
  if (drawing) {
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    lastPos = mousePos;
  }

}
let i = 0;
// Allow for animation
(function drawLoop () {
  requestAnimFrame(drawLoop);
  renderCanvas();
    i++
    if (i > 500)
    {
        let dataurl = canvas.toDataURL();
        console.log(dataurl)
        i = 0;
    }

})();
// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, {passive: false});
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, {passive: false});
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, {passive: false});

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
    var dataUrl = canvas.toDataURL();
    console.log(dataUrl);
}
// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, {passive: false});
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
  
}, {passive: false});
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, {passive: false});

