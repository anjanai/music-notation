var scales = [];
var derived_scales = [];
var context = new AudioContext(),
    oscillator;

var notes = 'S r R g G m M P d D n N $'.split(' ' );

function combinations(array) {
  return new Array(1 << array.length).fill().map(
    (e1, i) => array.filter((e2, j) => i & 1 << j));
}

function toScale(n) {
    let notes = 'R G M D N'. split(' ');
    let bin = 0;
    let rem, i = 1;
    let index=notes.length-1;
    let x = n;
    while (x != 0) {
        rem = x % 2;
	if (rem) {
	    notes[index] = notes[index].toLowerCase();
	}
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
	index--;
    }
    notes.splice(0, 0, "S");
    notes.splice(4, 0, "P");
    scales.push(notes);
    
    let combos = combinations(notes).filter(a => a.length == 5 || a.length==6);
    for (let scale of combos) {
	if (scale[0] != "S") continue;
	let str = scale.join( " ");
	if (derived_scales.includes(str)) continue;
	derived_scales.push(str);
    }
    return notes.join(' ');
}


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


// S r R g G m M P d D n N

const S = 262;
function getFreq(note) {
    n = notes.indexOf(note);
    return S * Math.pow(2, n/12);
}

async function play(link) {
    let scale = link.innerText.split(' ');
    scale.push('$');
    for (i of scale) {
	playOscillator(i);
	await sleep(800);
    }
    scale.reverse();
    for (i of scale) {
	playOscillator(i);
	await sleep(800);
    }
}

function createScales(n, ol) {
    if (n == 7)  {
	for (let i=0; i<32; i++) {
	    $(ol).append( '<li><a href=# onClick=play(this)>' + toScale(i) + '</a></li>');
	}
	return;
    }

    for (let str of derived_scales.filter(a => a.length == n+n-1)) {
	//if (str.match(/g d/i)) str += " (No M/P)"
	$(ol).append('<li><a href=# onClick=play(this)>' + str + '</a></li>');
    }
}

$(document).ready(function () {
    createScales(7, "#sampoorna");
    createScales(6, "#shadav");
    createScales(5, "#audav");
});
