# Whats Groovy

Whats Groovy is an online multiplayer audio jam room built using node.js. Communication is via websockets using socket.io. The inspiration for this application came from Dinahmoe Lab's Plink application.

#### Short Description

In summary, each user has an instance of an Audio Context (from the html5 web audio api), and all sounds are connected to the output of this audio context. All the sounds are preloaded via XML requests upon page load so that they can be easily inserted into the audio buffer when triggered.

#### Longer Description

The meat of this application lies in websockets communication (using socket.io) and extensive use of the web audio API.

The websockets listen for a series of different events... most importantly mouse events that determine the type of audio played and when to play it. The audio information doesn't actually get passed around (we would probably need to use binary.js for something like that), but instead just mouse events which determine how the audio is played on the client side. 

The web audio API is an incredible built-in javascript(at least for chrome, mozilla, and safari) library with tons of different audio functionality (https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html). Each client holds an instance of a web audio context... and all sounds are passed through the output of this audio context. Each instrument has it's own play sound function in which different Audio Nodes are connected to the instrument to create different sound effects. The most important ones in this application were gain and panner nodes to keep the sound relatively clean. The actual sound files are preloaded via xml requests and stored as buffer arrays to then be called later on certain events. I also made a few instruments via the built in API's oscillators (see triangle_wah.js)... but those aren't currently active on the public website.

Everything else to the application is just proper javascript organization, html, and css ;)

#### To Do

- DRY code up...

- Enhance performance (caches, requestAnimationFrame over setInterval, etc)

- potentially add chat functionality

- Cursor animation?

- Recording Jams?

#### External Libraries

- AudioContextMonkeyPatch.js (https://github.com/cwilso/AudioContext-MonkeyPatch)
- Tuna.js (https://github.com/Dinahmoe/tuna)
- JQuery
- Bootstrap
- EJS
