// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const leheras = [
    {
	T: "Taal: Ektaal;  Raag: Kedar",
	K: "Lyd",
	notation: `|p////S S d p | m p s////d p |  g////r s m p|`
    },
    {
	T: "Taal: Ektaal;  Raag: Hamsadhwani",
	K: "maj",
	notation: `|S n p g | r s p,/p,/ n,/n,/ |  r g p n/n/|`
    },
    {
	T: "Taal: Teentaal;  Raag: Janasammohini",
	K: "mix",
	notation: `|S S S S//G//R//S// | n d//n//p//z// g g//n//d//p// | g r n,/n,/ s | g p n d//n//p//z//|`
    },
    {
	T: "Taal: Teentaal;  Raag: Yaman",
	K: "lyd",
	notation: `|g g g r | n,/n,/ r/r/ s n, | d, n, r n,/r/ | g/m/ d//n//d//z// m//g//r//z// n,//r//s//z//|`,
    },
    {
	T: "Taal: Teentaal;  Raag: Mishra-Kirwani",
	K: "aeo",
	notation: `|S S S S/R/ | n/n/ d p p//d//S//n//|   d/d/ m r/m/ g/s/ | g p d S/p/ | `,
    },
    {
	T: "Taal: Jhaptaal;  Raag: Yaman",
	K: "lyd",
	notation: `|p p//^d//m//p// | m r n,| s r | ^g/m/ r r/s/`
    },

    
];

const tempo = `
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



function convert_notation (lehera) {
    let header = "T:" + lehera.T + tempo; 
    str = lehera.notation.replace(/ +/g, ' ');
    let abc = header;

    // The notation is always using C. The transposition is done later in the editor
    abc += "K: C" + lehera.K + "\n";
    
    re = /^[srgmpdnz/|,:^\(\)\-\s]+$/ig;
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
    console.log (abc);
    return abc;
}


function loadLeheras() {
    for (let i=0; i<leheras.length; i++) {
	let topdiv = document.getElementById("leheras");
	let lehera = leheras[i];
	[taal,raag] = lehera.T.split(';');
	taal = taal.split(/\s+/)[1];
	console.log (taal,raag);

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

    }
}


function initEditors() {
    // number of steps to transpose from C.
    // key has to be one of: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
    let transpose = key[0].charCodeAt() - 'C'.charCodeAt() + key.length - 1;

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
			       generateDownload: true,
			       visualTranspose: transpose,
			   }
			 });
	ed.synth.synthControl.toggleLoop();
    }

}

window.addEventListener("load", initEditors, false);

