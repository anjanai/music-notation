var stopped = true;

function stop() {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
}

const srgm = "S r R g G m M P d D n N".split(' ');
const abcd = "C# D D# E     F F# G G#   A A# B C+".split(/\s+/);

const notemap =  abcd.reduce(function(notemap, field, index) {
  notemap[srgm[index]] = field;
  return notemap;
}, {})


var sargam = "G1|S1|R1|S1n0|S1|n0|D0".split('|');
const bpm = 120;
const spb = 60/bpm; 		// seconds per beat

function createSequence() {
    let note = "";
    let beat = [];
    let beats = [];

    
    for (let swar of sargam) {
	for (let c of swar.split('')) {
	    if (c in notemap) {
		note = notemap[c];
	    } else if (c === '-') {
		beat.push(c);
	    } else {
		let octave = parseInt(c) + 3;
		if (note.slice(-1) == '+') {
		    octave += 1;
		    note = note.slice(0, -1);
		}
		note += octave;
		beat.push(note);
	    }
	}
	beats.push(beat);
	beat= [];
    }
    console.log (beats);

    let synth = new Tone.Synth().toDestination();
    const seq = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
    }, beats).start(0);

    
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start("+0.1");
    stopped = false;
    return (beats);
}

function play() {
    if (stopped)
	createSequence(sargam);
    else
	stop();
}
