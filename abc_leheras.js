// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const leheras = [
     {
	T: "Taal: Dadra(6);  Raag: Jaunpuri",
	K: "aeo",
	 notation: `| S S R | n d p/d/`,
    },
    {
	T: "Taal: Roopak(7);  Raag: Ahir-Bhairav",
	K: "mix",
	notation: `| S S d/n/ | p/d/ m | p/d/ n/_R/|`,
    },
    {
	T: "Taal: Neel(7.5);  Raag: AmritVarshini",
	K: "Lyd",
	notation: `| s s s/g/ | m/p/ m/g/ | m/g/ s/n,/ p,/|`,
    },
    
    {
	T: "Taal: Neel(7.5);  Raag: Madhukauns",
	K: "Dor",
	notation: `| S n p | ^m p g | ^m/p/ n/|`,
    },
    
    {
	T: "Taal: Neel(7.5);  Raag: Bihag",
	K: "Maj",
	notation: `| s s/g/ m/p/ | m/g/ m/p/ | m/g/ r/s/ n,/|`,
    },

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
	T: "Taal: Rudra(11);  Raag: Bahar",
	K: "Dor",
	notation: `| S S | d/=n/ S/R/ | G/R/ G/S/ | R/=n/ S/_n/ | p/m/ m/_n/ d/=n/ |`
    },

    {
	T: "Taal: Rudra(11);  Raag: Kalavati",
	K: "Mix",
	notation: `| S S/n/ | n/S/ G/S/ | S/n/ d | d/n/ S/G/ | S g/p/ d/n/`
    },

    

    {
	T: "Taal: Rudra(11);  Raag: Kedar",
	K: "Lyd",
	notation: `| p////S - | S////d p | m p | d////=m =m | s s////=m =m/////p |`
    },

    {
	T: "Taal: Rudra(11);  Raag: Chandrakauns",
	K: "Dor",
	notation: `| S S | S S | n d | n S | n d m/d/ |`
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
	T: "Taal: Jai(13);  Raag: Lalit",
	K: "maj",
	notation: `|m m ^m =m | g _r g ^m | g _r | s n,/_r/ g/_r/`
    },

    
    {
	T: "Taal: Ada-chautaal(14);  Raag: Des",
	K: "Mix",
	notation: `|S - | n d | p p//////d | m g | r/g/ s | m//////////r m | p =n `
    },

    {
	T: "Taal: Ada-chautaal(14);  Raag: Nat-Bhairav",
	K: "Maj",
	notation: `|s r | r g | g m | m p | g/m/ _d | _d p | g/m/ r `
    },

    {
	T: "Taal: Ada-chautaal(14);  Raag: Shyam-Kalyan",
	K: "Maj",
	notation: `|S S | n d |  ^m p | g m | r n,/s/ | r ^m | p n `
    },

    
    {
	T: "Taal: Ada-chautaal(14);  Raag: Charukeshi",
	K: "Aeo",
	notation: `|S d | n =g | m r | s d, | n, s | =g m | d n/d/ `
    },

    {
	T: "Taal: Pancham-sawari(15);  Raag: Gavati",
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
    
    
    {
	T: "Taal: Teentaal(16);  Raag: Des",
	K: "maj",
	notation: `|S S S p//n//S//R// | _n d p r//m//p//d// | m g r/g/ n,/s/ | r m p n | ` ,
    },

    {
	T: "Taal: Teentaal(16);  Raag: Tilak-Kamod?",
	K: "mix",
	notation: `|S S S S/R/ | n d p g//p//d//n//|  d m g r/s/ | g p =n d/p/ | `,
    },
    
    
];

var tempo = 60;
const tempo_str = `
L: 1/4
Q: 1/4=100
%%MIDI program 1
`;
// https://en.wikipedia.org/wiki/General_MIDI - instruments or MIDI Programs

// the tanpura and key is set in tanpura.js
//let key = "C#";  // C, C#, D, D#, E, F, F#, G, G#, A, A#, B

let note = "C"
let notemap = new Map();
for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
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
    return abc;
}


function loadLeheras() {
    for (let i=0; i<leheras.length; i++) {
	let topdiv = document.getElementById("leheras");
	let lehera = leheras[i];
	[taal,raag] = lehera.T.split(';');
	taal = taal.split(/\s+/)[1];
	//console.log (taal,raag);

	let taaldiv = document.getElementById(taal);
	if (!taaldiv) {
	    taaldiv = document.createElement("div");
	    taaldiv.id = taal;
	    topdiv.append (taaldiv);
	    let h = document.createElement("h2");
	    h.innerHTML = taal;
	    taaldiv.append (h);
	}
	
	let play = document.createElement("div");
	play.id = "play" + i;

	let h  = document.createElement("label");
	h.innerHTML = raag.split(/\s+/)[2];
	taaldiv.append (h, play);
	
	let div = document.getElementById("hidden");
	let text = document.createElement("textarea");
	text.id = "abc-text" + i;
	text.value = convert_notation(lehera);
	div.appendChild(text);
	console.log (taal,raag, text.value);
    }
}

function initEditors() {
    initTanpura();
    // number of steps to transpose from C.
    // key has to be one of: C, C#, D, D#, E, F, F#, G, G#, A, A#, B

    // tranpose is set in tanpura.js
    //let transpose = key[0].charCodeAt() - 'C'.charCodeAt() + key.length - 1;

     for (let i=0; i<leheras.length; i++) {
	 let ed = new ABCJS.Editor("abc-text" + i,
			 { paper_id: "notation",
			   synth: {
			       el: "#play" + i,
			       options: {
				   displayLoop: true,
				   displayRestart: true,
				   displayPlay: true,
				   displayProgress: true,
				   displayWarp: true,
				   midiTranspose: transpose,
						       }
			   },
			   generate_warnings: true,
			   warnings_id:"warnings",
			   abcjsParams: {
			       visualTranspose: transpose,
			   }
			 });
	 ed.synth.synthControl.toggleLoop();

	 };
	 
    document.getElementById("tempo_value").innerHTML=tempo;
    show_tempo_value(tempo);
    
}

function show_tempo_value(t) {
    document.getElementById("tempo_value").innerHTML=t;
    let synths = document.getElementsByClassName("abcjs-midi-tempo");
    let event = new Event('change');
    for (let i = 0; i < synths.length; ++i) {
	synths[i].value = t;
	synths[i].dispatchEvent(event);
    }
}
function add(x) {
    show_tempo_value(tempo+=x);
    document.getElementById("tempo_slider").value = tempo;
}
function mult(x) {
    show_tempo_value(tempo*=x);
    document.getElementById("tempo_slider").value = tempo;
}
function tanpura() {
    let tanpura = $('#tanpura')[0];
    tanpura[tanpura.paused ? 'play' : 'pause']();
}

window.addEventListener("load", initEditors, false);

