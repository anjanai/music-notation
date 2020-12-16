const synth = new Tone.Synth().toMaster()

var index=0;

function stop() {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    index=0;
}
function play_pattern() {
    var synth = new Tone.Synth().toDestination();
    var myScale = ['C4','D4','E4','F4','G4','A4','B4','C5'];

    if (index) 	
	return stop();
    
    var pattern = new Tone.Pattern(function(time, note){
	//the order of the notes passed in depends on the pattern
	synth.triggerAttackRelease(note, "4n", time);
	console.log (index++, note);
	if (index >= myScale.length) return stop();
    }, myScale, "up").start(0);    
    
    var tempo = 100;
    Tone.Transport.bpm.value = tempo   
    Tone.Transport.start("+0.1");
}

function play_part() {
    var synth = new Tone.Synth().toDestination();
    var myPart = [[0, "C4"], [0.5, "C5"], [1, "G4"]];

    console.log (myPart);
    const part = new Tone.Part(((time, note) => {
	// the notes given as the second element in the array
	// will be passed in as the second argument
	synth.triggerAttackRelease(note, "8n", time);
	console.log(note);
    }), myPart).start(0);
    var tempo = 100;
    Tone.Transport.bpm.value = tempo   
    Tone.Transport.start("+0.1");
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

function createPart(srgm_notes) {
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
    let part = [];
    let time = 0;
    
    for (let beat of beats) {
	let spn = spb / beat.length; // seconds per note;
	for (let note of beat) {
	    if (note !== '-') {
		let time_note = [];
		time_note.push(time, note);
		part.push(time_note);
	    }
	    time += spn;

	}
    }

    let synth = new Tone.Synth().toDestination();

    const tone_part =  new Tone.Part(((time, note) => {
	// the notes given as the second element in the array
	// will be passed in as the second argument
	synth.triggerAttackRelease(note, "4n", time);
	console.log(note);
    }), part).start(0);

    
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start("+0.1");
    
    return part;
}


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
    return (beats);
}

function play() {
    stop();
    console.log(sargam, createSequence(sargam));
}
