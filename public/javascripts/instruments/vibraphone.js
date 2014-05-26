var vibraphoneFiles = {
  1: '/audios/vibraphone/a3.wav',
  2: '/audios/vibraphone/c3.wav',
  3: '/audios/vibraphone/d3.wav',
  4: '/audios/vibraphone/e3.wav',
  5: '/audios/vibraphone/g3.wav',
  6: '/audios/vibraphone/a4.wav',
  7: '/audios/vibraphone/c4.wav',
  8: '/audios/vibraphone/d4.wav',
  9: '/audios/vibraphone/e4.wav',
  10: '/audios/vibraphone/g4.wav'
}

vibraphoneAudioBuffer = {};

var Vibraphone = window.Vibraphone = function(ctx) {
  // Create an audio context.
  this.ctx = ctx;
  this.source = null;
};

Vibraphone.loadAllFiles = function(ctx){
  for (var key in vibraphoneFiles) {
    Vibraphone.loadSoundFile(vibraphoneFiles[key], key, ctx);
  }
}

Vibraphone.loadSoundFile = function(url, freq, ctx) {
  var xhr = new XMLHttpRequest();
  //http://localhost:8080 local hosting!
  //http://whatsgroovy.herokuapp.com  heroku hosting!
  xhr.open('GET', 'http://localhost:8080' + url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    Vibraphone.initSound(this.response, freq, ctx); // this.response is an ArrayBuffer.
  };
  xhr.send();
}


Vibraphone.initSound = function(arrayBuffer, freq, ctx) {
  ctx.decodeAudioData(arrayBuffer, function(buffer) {
    vibraphoneAudioBuffer[freq] = buffer;
  }, function(e) {
    console.log('Error decoding file', e);
  });
}

Vibraphone.prototype.updateFrequency = function(row) {
  this.frequency = row;
}

Vibraphone.prototype.playSound = function() {
  // source is global so we can call .noteOff() later.
  var now = this.ctx.currentTime;
  this.gainNode = this.ctx.createGainNode();
  this.source = this.ctx.createBufferSource();

  //this.source.buffer = this.audioBuffer;
  this.source.buffer = vibraphoneAudioBuffer[this.frequency];
  this.source.loop = false;

  this.gainNode.gain.setTargetValueAtTime(3, now, 0.01);
  this.gainNode.gain.setTargetValueAtTime(0.0, now + .1, 0.1);

  this.source.connect(this.gainNode);;
  this.gainNode.connect(this.ctx.destination);

  this.source.noteOn(0); // Play immediately.
}