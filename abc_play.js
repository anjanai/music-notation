const srgm =
      `,m ,M ,P ,d ,D ,n ,N
s r R g    G m M P   d D n N
s' r' R' g' G' m' M' P'`.split(/\s+/);

const abcd = `,F ,^F ,G ,^G ,A ,^A ,B
C ^C D ^D    E F ^F G    ^G A ^A B
c ^c d ^d    e f ^f g`.split(/\s+/);

const notemap =  abcd.reduce(function(notemap, field, index) {
  notemap[srgm[index]] = field;
  return notemap;
}, {})

let key = "C#";  // C, C#, D, D#, E, F, F#, G, G#, A, A#, B


function convert_notation (notes) {
    let abc = "";

    for (let i = 0; i < notes.length; i++)
	abc += ( notemap[notes[i]] || notes[i] );
    console.log (abc);
    return abc;
}


var abc =  
    "|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\n" +
    "EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\n" +
    "|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\n" +
    "eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|";

abc = convert_notation (`Q: 1/4=100
m, M, P, d, D, n, N,
s r R g    G m M P   d D n N
s' r' R' g' G' m' M' P'`);

abc = `X:12
T:Grace notes
L:1/8
M:C
K:D
| {E}FA{c}AF DF{^dc}A f{A}df f{AGA}df \
| {B}D2 {A}D2 {G}D2 {F}D2 {E}D2 \
| {E}c2 {F}c2 {G}c2 {A}c2 {B}c2 |
| {A}^c2 {gcd}c2 {gAGAG}A2{g}c<{GdG}e {Gdc}d>c {gBd}B<{e}G \
| {G}[G4e4] {FGAB}[^c4A4] {ef}[e4c4] {d'c'bagfedcB_AcBFGC}D4 |]`;

function load() {
    // NOTE: If you want just the sound without showing the music, use "*" instead of "paper" in the renderAbc call.
    var visualObj = ABCJS.renderAbc("*", abc)[0];
    
    // This object is the class that will contain the buffer
    var midiBuffer;
    
    var startAudioButton = document.querySelector(".play");
    var stopAudioButton = document.querySelector(".stop");

    startAudioButton.addEventListener("click", function() {

	startAudioButton.setAttribute("style", "display:none;");
	stopAudioButton.setAttribute("style", "");
	
	var audioContext = new window.AudioContext();
	audioContext.resume().then(function () {
	    midiBuffer = new ABCJS.synth.CreateSynth();
	    
	    return midiBuffer.init({
		visualObj: visualObj,
		audioContext: audioContext
	    }).then(function (response) {
		return midiBuffer.prime();
	    }).then(function () {
		midiBuffer.start();
		return Promise.resolve();
	    }).catch(function (error) {
		alert("synth error", error);
	    });
	});
	
    });

    stopAudioButton.addEventListener("click", function() {
	startAudioButton.setAttribute("style", "");
	stopAudioButton.setAttribute("style", "display:none;");
	if (midiBuffer)
	    midiBuffer.stop();
    });
}
