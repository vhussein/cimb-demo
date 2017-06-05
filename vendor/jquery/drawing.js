
// Drawing Part


var mousePressed = false;
var lastX, lastY;
var ctx;

// Write Text

// variables used to get mouse position on the canvas
var $canvas = $("#myCanvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

var xPos = 0;
var yPos = 0;

// an array to hold text objects
var texts = [];

// this var will hold the index of the hit-selected text
var selectedText = -1;

////

ctx = document.getElementById('myCanvas').getContext('2d');
var canvas = document.getElementById("canvas");
//    var ctx = canvas.getContext("2d");

$('#myCanvas').mousedown(function (e) {
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
});

$('#myCanvas').mousemove(function (e) {
    if (mousePressed) {
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
});

$('#myCanvas').mouseup(function (e) {
    if (mousePressed) {
        mousePressed = false;
        cPush();
    }
});

$('#myCanvas').mouseleave(function (e) {
    if (mousePressed) {
        mousePressed = false;
        cPush();
    }
});

$('#myCanvas').click(function (e){
    xPos = parseInt(e.offsetX);
    yPos = parseInt(e.offsetY);
    coords = "X coords: " + xPos + ", Y coords: " + yPos;
    console.log(coords);
});

drawImage();

function drawImage() {
    var image = new Image();
    image.src = 'bgcanvas.png';
    $(image).load(function () {
        ctx.drawImage(image, 0, 0, 1000, 510);
        cPush();
    });
}

ctx.strokeStyle = "#0000ff";
ctx.lineWidth = 3;


// $("a[name=tab]").on("click", function () {
//     var a = $(this).data("index");
//     ctx.strokeStyle = a;
//     console.log("STroke: "+ctx.strokeStyle);

// });

// $("a[name=tool]").on("click", function () {
//     var tool = $(this).data("index");
//     ctx.lineWidth = tool;
//     console.log(ctx.lineWidth);

// });

function brush(color) {
    console.log(color);
    if(color == 'FFFFFF') {
        ctx.lineWidth = 11;
    } else {
        ctx.lineWidth = 3;
    }
    ctx.strokeStyle = "#"+color;
    console.log(ctx.strokeStyle+ " -- " + ctx.lineWidth);

}
function hightlight() {
    ctx.strokeStyle = "#ffff00";
    ctx.lineWidth = 11;
    console.log(ctx.strokeStyle+ " -- " + ctx.lineWidth);

}


function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
//            ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;

    xPos = "";
    yPos = "";
}

var cPushArray = new Array();
var cStep = -1;

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('myCanvas').toDataURL());
//        document.title = cStep + ":" + cPushArray.length;
    console.log("Push content: "+cPushArray);
}
function cUndo() {
    console.log(cStep);
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        document.title = cStep + ":" + cPushArray.length;
        console.log("Undo:  "+ canvasPic.src);
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        document.title = cStep + ":" + cPushArray.length;
    }
}
function cDownload() {
    var downloadAsImg = document.getElementById("myCanvas").toDataURL("image/png");
    console.log(downloadAsImg);
}

// WRITE TEXT ON CANVAS

// clear the canvas & redraw all texts
function drawText() {
//        console.log(xPos+" -- "+yPos);
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        ctx.fillText(text.text, xPos, yPos);
    }
}
// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    var text = texts[textIndex];
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // Put your mousedown stuff here
    for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }
}
$("#submitText").click(function () {
//        console.log(coords);
    // calc the y coordinate for this text on the canvas
    var yPos = texts.length * 20 + 20;

    // get the text from the input element
    var text = {
        text: $("#theText").val(),
        x: xPos,
        y: yPos
    };

    // calc the size of this text for hit-testing purposes
    ctx.font = "16px verdana";
    text.width = ctx.measureText(text.text).width;
    text.height = 16;
    texts = [];
    // put this new text in the texts array
    texts.push(text);

    if(xPos > 0 && yPos > 0) {
        $("span#dispMsg").text("");
        // redraw everything
        drawText();
        $("#theText").val('');
    } else {
        $("span#dispMsg").text("Please select the region to display message.");
        console.log('Disp Message.');
    }

});