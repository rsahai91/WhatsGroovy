(function(root){
  var Canvas = root.Canvas = (root.Canvas || {});

  var CanvasCursor = Canvas.CanvasCursor =  function(nickname) {
    this.nickname = nickname;
    this.pos = [0, 0];	
  }
	
	var backgroundImage = new Image();
  backgroundImage.src = 'images/hanging.jpg';

  CanvasCursor.prototype.drawCursor = function(ctx, clicked){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 15, 0, 2*Math.PI);
    ctx.lineWidth="1";
    ctx.strokeStyle="black";
    if (clicked){
      ctx.fillStyle = "red";
      ctx.fill();
    } else {
      ctx.fillStyle = "blue";
      ctx.fill();
    }

    ctx.stroke();

    ctx.beginPath();
    ctx.font="15px Georgia";
    ctx.fillText(this.nickname, this.pos[0] + 15, this.pos[1]);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
  };

  Canvas.draw = function(ctx, canvasWidth, canvasHeight){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
		ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    //ctx.fillStyle = "#A7DBD8";
    //ctx.fillRect(0,0,canvasWidth,canvasHeight);
    Canvas.drawRows(ctx, canvasWidth, canvasHeight);
  }

  Canvas.drawRows = function(ctx, canvasWidth, canvasHeight){
    var rowHeight = canvasHeight/10;

    for (var i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.lineWidth="3";
      ctx.strokeStyle="black";
      ctx.moveTo(0,i*rowHeight);
      ctx.lineTo(canvasWidth,i*rowHeight);
      ctx.stroke();
    }
  };

  Canvas.drawCursors = function(ctx, clickedObj){
    for (var key in cursors){
      if (clickedObj[key] === true){
        cursors[key].drawCursor(ctx, true);
      } else{
        cursors[key].drawCursor(ctx);
      }
    }
  };

  Canvas.drawVisualizer = function(ctx, data, canvasWidth, canvasHeight){
    var rowWidth = canvasWidth/data.length;
    for (var i = 0; i < data.length; i++) {
      var height = data[i];
      ctx.beginPath();
      ctx.strokeStyle="blue";
      ctx.rect(i*rowWidth, canvasHeight - height, rowWidth, height);
      ctx.stroke();
    }
  };

})(this);
