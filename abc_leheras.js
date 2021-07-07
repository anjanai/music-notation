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
    }

    
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
    
    re = /^[srgmpdn/|,:\(\)\-\s]+$/ig;
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
	let div = document.getElementById("leheras");
	let lehera = leheras[i];
	let play = document.createElement("div");
	play.id = "play" + i;

	h = document.createElement("h4");
	h.innerHTML =     lehera.T;
	div.append (h, play);
	
	div = document.getElementById("hidden");
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

