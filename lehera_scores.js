var scores = [];
var tunes = [];
var buffers = [];
var tracks = [];

var instrument = 0;
var selectedTrack = -1;
var playing = false;


var tempo = 100;
const tempo_str = `
L: 1/4
Q: 1/4=100
`;

let key = "C#";  // C, C#, D, D#, E, F, F#, G, G#, A, A#, B
let note = "C"
let notemap = new Map();
for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
}


const leheras = [
    {
	T: "Taal: Matta(9);  Raag: Shivaranjani",
	K: "Dor",
	notation: `| S S | S G | R S  | p g p `
    },

    {
	T: "Taal: Matta(9);  Raag: Jaijaiwanti",
	K: "Maj",
	notation: `|s s | n,/s/ d,/_n,/ | r r/g/ | m/g/ r/_g/ r/=n,/ `
    },
    {
	T: "Taal: Jhaptaal(10);  Raag: Ahir-Bhairav",
	K: "mix",
	notation: `|p p//d//m//p// | m r n,| s _r | g/m/ _r _r/s/`
    },

    {
	T: "Taal: Rudra(11);  Raag: Kafi",
	K: "Dor",
	notation: `|p  p/d/ m/p/ | g r s s | r g m | `
    },


    {
	T: "Taal: Ektaal(12);  Raag: Kedar",
	K: "Lyd",
	notation: `|p////S S d p | m p s////d p |  g////r s m p|`
    },
    {
	T: "Taal: Ektaal(12);  Raag: Hamsadhwani",
	K: "maj",
	notation: `|S n p g | r s p,/p,/ n,/n,/ |  r g p n/n/|`
    },
    {
	T: "Taal: Ektaal(12);  Raag: Gavati",
	K: "mix",
	notation: `|S n S d | m p g s | g m p n/p/|`
    },
    
    
    {
	T: "Taal: Jai(13);  Raag: Kafi",
	K: "Dor",
	notation: `|s s r/g/ | m/p/ m | p m/p/ | d/d/ n/d/ | m g | r n, |`
    },

    {
	T: "Taal: Ada_chautaal(14);  Raag: Nat-Bhairav",
	K: "Maj",
	notation: `|s r | r g | g m | m p | g/m/ _d | _d p | g/m/ r `
    },

    {
	T: "Taal: Ada_chautaal(14);  Raag: Shyam-Kalyan",
	K: "Maj",
	notation: `|S S | n d |  ^m p | g m | r n,/s/ | r ^m | p n `
    },

    
    {
	T: "Taal: Ada_chautaal(14);  Raag: Charukeshi",
	K: "Aeo",
	notation: `|S d | n =g | m r | s d, | n, s | =g m | d n/d/ `
    },

    {
	T: "Taal: Pancham_sawari(15);  Raag: Gavati",
	K: "mix",
	notation: `|S S S/n/ | S/d/ p g | m m/g/ m/r/ |  n, s s/g/ | m p/p/ n/n/ `
    },
    
    {
	T: "Taal: Teentaal(16);  Raag: Janasammohini",
	K: "mix",
	notation: `|S S S S//G//R//S// | n d//n//p//z// g g//n//d//p// | g r n,/n,/ s | g p n d//n//p//z//|`
    },
    
    {
	T: "Taal: Teentaal(16);  Raag: Yaman",
	K: "lyd",
	notation: `|g g g r | n,/n,/ r/r/ s n, | d, n, r n,/r/ | g/m/ d//n//d//z// m//g//r//z// n,//r//s//z//|`,
    },
    {
	T: "Taal: Teentaal(16);  Raag: Mishra-Kirwani",
	K: "aeo",
	notation: `|S S S S/R/ | n/n/ d p p//d//S//n//|   d/d/ m r/m/ g/s/ | g p d S/p/ | `,
    },

    
];

var taal_list = [];
var raag_list = [];


function load() {
    var playButton = document.getElementById("play");
    var stopButton = document.getElementById("stop");
    var songPicker = document.getElementById("song-picker");
    var instrumentPicker = document.getElementById("instrument-picker");
    
    function renderTune(abc, i) {
	return ABCJS.renderAbc(abc.tunediv, abc.abc)[0];
    }
    
    function primeTune(visualObj, i) {
	setStatus("preparing", i);
	var midi = new ABCJS.synth.CreateSynth();
	return midi.init({
	    visualObj: visualObj,
	    options: {
		program: instrument,
		chordsOff: true
	    }
	}).then(function () {
	    setStatus("priming", i);
	    return midi.prime();
	}).then(function () {
	    setStatus("ready", i);
	    return midi;
	});
    }
    
    function updatePapers() {
	console.log(selectedTrack);
    }
    
    function play() {
	stop();
	console.log(selectedTrack);
	var buff = buffers[selectedTrack];
	if (buff) buff.then(function (synth) {
	    synth.start();
	    playing = true;
	    updatePlaybackButtons();
	});
	else alert("Please select a song first");
    }
    
    function setInstrument(n) {
	stop();
	instrument = n;
	buffers = tunes.map(primeTune);
    }

    function convert_notation (lehera) {
    let header = "T:" + lehera.T + tempo_str; 
    str = lehera.notation.replace(/ +/g, ' ');
    let abc = header;

    // The notation is always using C. The transposition is done later in the editor
    abc += "K: C" + lehera.K + "\n";
    
    re = /^[srgmpdnz/|,:^_=\(\)\{\}\-\s]+$/ig;
    for (let line of str.split("\n")) {
	if (! line.match(re)) {
	    abc += "w:" + line.replace(/[-:]/g, "") + "\n";
	    continue;
	}
	notes = line.replaceAll("- - - -", "z4");
	notes = notes.replaceAll(" - - -", "4");
	notes = notes.replaceAll(" - -", "3");
	notes = notes.replaceAll(" -", "2");
	for (let i = 0; i < notes.length; i++)
	    abc += ( notemap.get(notes[i]) || notes[i] );
	
	abc += "\n";
	line = line.replace(/[-:]/g, "") ;
	abc += "w:" + line + "\n";
    }
    //console.log (abc);
    return abc;
}

function updatePlaybackButtons() {
    playButton.classList.toggle("hidden", playing);
    stopButton.classList.toggle("hidden", !playing);
}
    

function stop() {
    playing = false;
    updatePlaybackButtons();
    return Promise.all(buffers.map(function (buff) {
	return buff.then(function (synth) {
	    synth.stop();
	    return synth;
	});
    }));
}
    

function setTrack(i) {
    stop().then(function () {
	selectedTrack = tracks.indexOf(i);
	updatePapers();
    });
}
    

function load_leheras() {
    let regexpNames =  /Taal: *(\w+)\((\d+)\).+Raag: *(.+)/;
    let taal_select = document.getElementById('taal-picker');
    let raag_select = document.getElementById('raag-picker');
    
    taal_select.onchange = function(sel){
	raag_select.length = 0;
	raags = raag_list[sel.target.value];
	setTrack(raags[0]  + "_" + sel.target.value);
	for (let i=0; i<raags.length; i++) {
	    raag_select.options[raag_select.options.length] = new Option(raags[i], raags[i] + "_" + sel.target.value);
	}
	raag_select.onchange = function(r_sel){
	    setTrack(r_sel.target.value);
	};
    };
    for (let i=0; i<leheras.length; i++) {
	let lehera = leheras[i];
	let [match,taal,beats,raag] = regexpNames.exec(lehera.T);
	//console.log (taal, beats, raag);
	taal_list[beats] = taal;
	if (!raag_list[beats])
	     raag_list[beats] = [];
	     
	raag_list[beats].push( raag);
    }

    let topdiv = document.getElementById ("papers");
    let lehera = 0;
    for (let i=0; i<taal_list.length; i++) {
	if (!taal_list[i]) continue;
	let taal = taal_list[i] + "(" + i + ")";
	taal_select.options[taal_select.options.length] = new Option(taal, i);
	for (let j=0; j<raag_list[i].length; j++) {
	    let tune = raag_list[i][j] + "_" + i;
	    let tunediv = document.createElement("div");
	    tunediv.style.display = "none";
	    tunediv.id = tune;
	    topdiv.append(tunediv);
	    let abc = convert_notation(leheras[lehera]);
	    scores.push({tune, tunediv, abc});
	    lehera++;
	}
    }
}

var ready = 0;


    function setStatus(text, i) {
	if (text === "stopped") playing = false;
	if (text === "playing") playing = true;
	if (text === "ready") ready++;
	let status = leheras.length == ready ? "ready" : "preparing";
	document.getElementById("tune-status").textContent = status;
    }


    load_leheras();

    tunes = scores.map(renderTune);
    buffers = tunes.map(primeTune);

    for (let i=0; i<scores.length; i++) {
	tracks[i] = scores[i].tune;
    }
    stopButton.onclick = stop;
    playButton.onclick = play;

    instrumentPicker.onchange = function (event) {
        setInstrument(Number(event.target.value));
    };
}


//setTrack(Number(event.target.value));
