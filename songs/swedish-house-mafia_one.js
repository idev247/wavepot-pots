// Swedish House Mafia - One
// https://www.youtube.com/watch?v=PkQ5rEJaTmk

// Warning: This is a alpha version. There's composition at all.
//          Also the initial part of the song is uber loud.

// Script altered from:
// https://dl.dropboxusercontent.com/u/43006973/StillAlive.js
// Originally found in this comment:
// http://www.reddit.com/r/programming/comments/28gnb9/wavepot_live_coding_music_in_the_browser/cib38zx

// amplitude of the notes
var amp = 1;
// lacunarity for successive octaves
var lacun = 2;
// signal persistence for successive octaves
var pers = 0.5;
// number of octaves to add
var octaveCount = 5;
// notes per second
var noteFreq = 1 / 3;
// duration of each note in seconds
var noteDur = noteFreq * 2;
// dampening factor
var dampenSpeed = 15;
// the octave for a normal note
var baseOctave = 3;

// frequency of each note at octave 0
var noteFreqs = {
  "C": 16.351,
  "C#": 17.324,
  "D": 18.354,
  "D#": 19.445,
  "E": 20.601,
  "F": 21.827,
  "F#": 23.124,
  "G": 24.499,
  "G#": 25.956,
  "A": 27.5,
  "A#": 29.135, 
  "B": 30.868
};

// notes to play, here Sill alive
var notes = [
  " ", "A", "G", "F", "E", "D", "D", "D", "D", "D", "D",
  "D", "A", "G", "F", "E", "D", "D", "D", "D", "D",
  "D", "D", "A", "G", "F", "E", "F", "F", "F", "F",
  "F", "F", "F", "A", "G", "F", "E", "G", "G", "G",
  "G", "G", "G", "G", "A", "G", "F", "E", "D", "D",
  "D", "D", "D", "D", "D", "A", "G", "F", "E", "D",
  "D", "D", "D", "D", "D", "D", "A", "G", "F", "E",
  "F", "F", "F", "F", "F", "F", "F", "A", "G", "F",
  "E", "G", "G", "G", "G", "G", "G", "G", "A", "G",
  "F", "E", "D", "D", "D", "D", "D", "D", "D", "A",
  "G", "F", "E", "D", "D", "D", "D", "D", "D", "D",
  "A", "G", "F", "E", "F", "F", "F", "F", "F", "F",
  "F", "A", "G", "F", "E", "G", "G", "G", "G", "G",
  "G", "G", "A", "G", "F", "E", "D", "D", "D", "D",
  "D", "D", "D", "A", "G", "F", "E", "D", "D", "D",
  "D", "D", "D", "D", "A", "G", "F", "E", "F", "F",
  "F", "F", "F", "F", "F", "A", "G", "F", "E", "G",
  "G", "G", "G", "G", "G", "G", "A", "G", "F", "E",
  "F", "F", "F", "F", "F", "F", "F", "A", "G", "F",
  "E", "G", "G", "G", "G", "G", "G", "G", "A", "G",
  "F", "E", "F", "F", "F", "F", "F", "F", "F", "A",
  "G", "F", "E", "G", "G", "G", "G", "G", "G", "G",
  "A", "G", "F", "E", "F", "F", "F", "F", "F", "F",
  "F", "A", "G", "F", "E", "G", "G", "G", "G", "G",
  "G", "G", "D", "E", "F", "G", "F", "E", "D", "C",
  "D", "E", "F", "G", "F", "E", "D", "C", "A", "G",
  "A", "A", "G", "A", "A", "G", "F", "E", "F", "F",
  "F", "F", "F", "F", "F", "A", "G", "F", "E", "G",
  "G", "G", "G", "G", "G", "G", "D", "E", "F", "G",
  "F", "E", "D", "C", "D", "E", "F", "G", "F", "E",
  "D", "C", "A", "G", "A", "A", "G", "A", "A", "G",
  "F", "E", "F", "F", "F", "F", "F", "F", "F", "A",
  "G", "F", "E", "G", "G", "G", "G", "G", "G", "G",
  "D", "D", "D", "D", "D", "D", "D", "D", "D", "D",
  "D", "D", "D", "D", "D", "D", "D", "D", "D", "D",
  "D", "D", "D", "D", "D", "D", "D", "D", "D", "D",
  "D", "A", "G", "F", "E", "F", "F", "F", "F", "F",
  "F", "F", "A", "G", "F", "E", "G", "G", "G", "G",
  "G", "G", "G", "A", "G", "F", "E", "D", "D", "D",
  "D", "D", "D", "D", "A", "G", "F", "E", "D", "D",
  "D", "D", "D", "D", "D", "A", "G", "F", "E", "F",
  "F", "F", "F", "F", "F", "F", "A", "G", "F", "E",
  "G", "G", "G", "G", "G", "G", "G", "A", "G", "F",
  "E", "D", "D", "D", "D", "D", "D", "D", "A", "G",
  "F", "E", "D", "D", "D", "D", "D", "D", "D", "A",
  "G", "F", "E", "F", "F", "F", "F", "F", "F", "F",
  "A", "G", "F", "E", "G", "G", "G", "G", "G", "G",
  "G", "A", "G", "F", "E", "D", "D", "D", "D", "D",
  "D", "D", "A", "G", "F", "E", "D", "D", "D", "D",
  "D", "D", "D", "A", "G", "F", "E", "F", "F", "F",
  "F", "F", "F", "F", "A", "G", "F", "E", "G", "G",
  "G", "G", "G", "G", "G", "A", "G", "F", "E", "D",
  "D", "D", "D", "D", "D", "D", "A", "G", "F", "E",
  "D", "D", "D", "D", "D", "D", "D", "D", "E", "F",
  "G", "F", "E", "D", "C", "D", "E", "F", "G", "F",
  "E", "D", "C", "A", "G", "A", "A", "G", "A", "A",
  "G", "F", "E", "F", "F", "F", "F", "F", "F", "F",
  "A", "G", "F", "E", "G", "G", "G", "G", "G", "G",
  "G", "D", "E", "F", "G", "F", "E", "D", "C", "D",
  "E", "F", "G", "F", "E", "D", "C", "A", "G", "A",
  "A", "G", "A", "A", "G", "F", "E", "F", "F", "F",
  "F", "F", "F", "F", "A", "G", "F", "E", "G", "G",
  "G", "G", "G", "G", "G", "A", "G", "F", "E", "F",
  "F", "F", "F", "F", "F", "F", "A", "G", "F", "E",
  "G", "G", "G", "G", "G", "G", "G", "A", "G", "F",
  "E", "F", "F", "F", "F", "F", "F", "F", "A", "G",
  "F", "E", "G", "G", "G", "G", "G", "G", "G", "A",
  "G", "F", "E", "F", "F", "F", "F", "F", "F", "F",
  "A", "G", "F", "E", "G", "G", "G", "G", "G", "G",
  "G", "A", "G", "F", "E", "F", "F", "F", "F", "F",
  "F", "F", "A", "G", "F", "E", "G", "G", "G", "G",
  "G", "G", "G", "D", "E", "F", "G", "F", "E", "D",
  "C", "D", "E", "F", "G", "F", "E", "D", "C", "A",
  "G", "A", "A", "G", "A", "A", "G", "F", "E", "F",
  "F", "F", "F", "F", "F", "F", "A", "G", "F", "E",
  "G", "G", "G", "G", "G", "G", "G", "D", "E", "F",
  "G", "F", "E", "D", "C", "D", "E", "F", "G", "F",
  "E", "D", "C", "A", "G", "A", "A", "G", "A", "A",
  "G", "F", "E", "F", "F", "F", "F", "F", "F", "F",
  "A", "G", "F", "E", "G", "G", "G", "G", "G", "G",
  "G", "D", "E", "F", "G", "F", "E", "D", "C", "D",
  "E", "F", "G", "F", "E", "D", "C", "A", "G", "A",
  "A", "G", "A", "A", "G", "F", "E", "F", "F", "F",
  "F", "F", "F", "F", "A", "G", "F", "E", "G", "G",
  "G", "G", "G", "G", "G", "D", "E", "F", "G", "F",
  "E", "D", "C", "D", "E", "F", "G", "A", "A", "A",
  "A", "A", "A", "G", "A", "A", "G", "F", "E", "F",
  "F", "F", "F", "F", "F", "F", "D", "E", "F", "G",
  "A", "A", "A", "A", "A"
];

// frequency, octave, time
function octave(f, i, t) {
  return amp * Math.pow(pers, i) * Math.sin(2 * Math.PI * t * f * Math.pow(lacun, i));
}

// signal, time
function dampen(s, t) {
  return s * Math.exp(dampenSpeed * -t);
}

// freq, octave, time
function signal(f, o, t) {
  var s = 0;
  for (var i = 0; i < octaveCount; i++) {
    s += octave(f, o + i, t);
  }
  return dampen(s, t);
}

// string
function rmLastChar(s) {
  return s.slice(0, s.length - 1);
}

// note, time
function note(n, t) {
  switch (n[n.length - 1]) {
    case '-':
      return signal(noteFreqs[rmLastChar(n)], baseOctave - 1, t);
    case '+':
      return signal(noteFreqs[rmLastChar(n)], baseOctave + 1, t);
    case ' ':
      return 0;
    default:
      return signal(noteFreqs[n], baseOctave, t);
  }
}

// time
function dsp(t) {
  function arp(measure, x, y, z){
  var ts = t / 2 % measure;
    return Math.sin(x * (Math.exp(-ts * y))) * Math.exp(-ts * z);
  }
  
  var total = notes.length * noteFreq;
  var tt = t % total;
  var i = Math.floor(tt / total * notes.length);
  var s = 0;
  var kick = arp(noteFreq, 51, 45, 3);
  var kickvol = 0;
  
  if (t < 8) {
        return 1 * Math.tan(8 * Math.PI * t * t);
  } else if (t < 10) {
        return 1 * Math.tan(8 * Math.PI * (t*16.0));
  } else {
    for (var m = 0; m < noteDur && i >= 0; m += noteFreq) {
      s += note(notes[i--], t % noteFreq + m);
    }
    return s + kick * kickvol;
  }

}
