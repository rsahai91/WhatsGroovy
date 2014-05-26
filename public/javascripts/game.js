window.startGame = function startGame(){
  $('body').css('background-color', 'white')
  var canvas = document.getElementById("music");
  canvas.width  = window.innerWidth - 10;
  canvas.height = window.innerHeight - 150;

  window.audioApp = new AudioApp();
  var currentAudioRow = 0;
  var numRows = 10;

  var context = canvas.getContext("2d");
  context.fillStyle = "blue";
  context.fillRect(0,0,canvas.width,canvas.height);
  // var opts = {
  //   distance : canvas.height/numRows,
  //   lineWidth : 1,
  //   gridColor  : "#66ff00",
  //   caption : false
  // };
  // new Grid(opts).draw(context);

  canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    playAudio(mousePos.y);
  }, false);

  canvas.addEventListener('mouseup', function(evt) {
    stopAudio();
    currentAudioRow = 0;
  }, false);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var row = getRow(mousePos.y);
    if (currentAudioRow !== 0 && row !== currentAudioRow){
      stopAudio(true);
      playAudio(mousePos.y)
    }

    var canvasWidth = $('#music').width();
    var canvasHeight = $('#music').height();
    chatApp.sendMouseCoords(evt.offsetX/canvasWidth, evt.offsetY/canvasHeight);
    $("#my-cursor").css({left:evt.pageX, top:evt.pageY});

  }, false);

  $('#triangle-wah-button').click(function(event){
    var $target = $(event.currentTarget);
    if (audioApp.currentInstrument === 'triangleWah'){
      audioApp.currentInstrument = '';
      $target.removeClass("active");
    } else {
      audioApp.currentInstrument = 'triangleWah';
      $target.addClass("active");
    }
  })

  $('#vibraphone-button').click(function(event){

    var $target = $(event.currentTarget);
    if (audioApp.currentInstrument === 'vibraphone'){
      audioApp.currentInstrument = '';
      $target.removeClass("active");
    } else {
      audioApp.currentInstrument = 'vibraphone';
      $target.addClass("active");
    }
  })

  $('#plucked-synth-button').click(function(event){

    var $target = $(event.currentTarget);
    if (audioApp.currentInstrument === 'pluckedSynth'){
      audioApp.currentInstrument = '';
      $target.removeClass("active");
    } else {
      audioApp.currentInstrument = 'pluckedSynth';
      $target.addClass("active");
    }
  })

  $('#wild-synth-button').click(function(event){

    var $target = $(event.currentTarget);
    if (audioApp.currentInstrument === 'wildSynth'){
      audioApp.currentInstrument = '';
      $target.removeClass("active");
    } else {
      audioApp.currentInstrument = 'wildSynth';
      $target.addClass("active");
    }
  })

  $('#organ-synth-button').click(function(event){
    var $target = $(event.currentTarget);
    if (audioApp.currentInstrument === 'organSynth'){
      audioApp.currentInstrument = '';
      $target.removeClass("active");
    } else {
      audioApp.currentInstrument = 'organSynth';
      $target.addClass("active");
    }
  })

  $('#kick-button').click(function(event){
    var $target = $(event.currentTarget);
    if ($target.html() === "Kick ON"){
      audioApp.playKick();
      $target.html("Kick OFF")
      $target.addClass("active")
    } else {
      audioApp.stopInstrument(audioApp.kickEvent);
      $target.html("Kick ON")
      $target.removeClass("active")
    }
  })

  $('#shaker-button').click(function(){
    var $target = $(event.currentTarget);
    if ($target.html() === "Shaker ON"){
      audioApp.playShaker();
      $target.html("Shaker OFF")
      $target.addClass("active")
    } else {
      audioApp.stopInstrument(audioApp.shakerEvent);
      $target.html("Shaker ON")
      $target.removeClass("active")
    }
  })

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function getRow(mousePosY) {
    for (var i = 1; i < numRows + 1; i++) {
      if (mousePosY < i*canvas.height/numRows){
        return i;
      }
    }
  }

  function playAudio(mousePosY) {
    currentAudioRow = getRow(mousePosY);
    audioApp.playCurrentInstrument(currentAudioRow, audioApp.currentInstrument, 0);
    chatApp.sendAudio(currentAudioRow, audioApp.currentInstrument);
  }

  function stopAudio(fromMove) {
    audioApp.stopCurrentInstrument(currentAudioRow, fromMove, 0, audioApp.currentInstrument);
    chatApp.stopAudio(currentAudioRow, fromMove, audioApp.currentInstrument);
  }
}
