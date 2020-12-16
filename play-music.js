var context;
var oscillator;

var notes = 'S r R g G m M P d D n N $'.split(' ' );

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playOscillator(note) {
    oscillator = context.createOscillator();
    var  gain = context.createGain()
    gain.connect(context.destination);

    oscillator.connect(gain);

    oscillator.frequency.value = getFreq(note);
    oscillator.start(context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
	0.00001, context.currentTime + 1.5
    )

}


// S = A4;
// S r R g G m M P d D n N

const S = 262;
function getFreq(note) {
    n = notes.indexOf(note);
    return S * Math.pow(2, n/12);
}

async function xplay(note) {
    context = new AudioContext();
    
    for (note of document.URL.split('?')[1].split('')) {
	playOscillator(note);
	console.log(note);
	await sleep(800);
    }
}


const synth = new Tone.Synth();
synth.oscillator.type = "sine";
synth.toMaster();

