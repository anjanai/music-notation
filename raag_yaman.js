// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const scale_header = `T: Raag Yaman : scale
Q: 1/4=50
`;

const scale = `n, r g m d n S -  | S n d p m g r s - `;

const gat_header = `T: Raag Yaman : Bandish in drut ektaal
L: 1/4
M: 4/4
Q:1/4=200
`;


const gat_notation = `|: p - r - | s n, s g | r g - g :|
| बौ - रे - म त क र गु मा - न
|: m g m p | n/ d/ n/ d/ p - | p r - s :|
गु रु स न रा ~ ~ ~ खो ई मा न
| p - r - | s n, s g | r g - g |
बौ - रे - म त क र गु मा - न    
%    
|: p p S - | S S d n | R S - S :|
गु न सा ग र गु रु म हा न
| n R G R | S - n/ d/ n | d p - p | 
स त गु न के गु रु  नि धा ~ न
| g g n d | p - r g | r s - s | 
गु न घ ट में गु रु ही प्रा ण 
| n, r g m | d n n/ n/ d/ n/ | p r m p |
बे ~ गु नी गु रु को ~ ~ ~ प ह चा न 
% 
| p - r - | s n, s g | r g - g |
| बौ - रे - म त क र गु मा - न
|: p - r - | s n, :|
| बौ - रे - म त 
| p - r - | s n, s g | r (g - - - r s - - - ) 
| बौ - रे - म त क र गु मा - न
`; 


let key = "C#";  // C, C#, D, D#, E, F, F#, G, G#, A, A#, B
let mode = "Lyd"
let note = "C"
let notemap = new Map();
for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
}



function convert_notation (str, header) {
    str = str.replace(/ +/g, ' ');
    let abc = header;

    // The notation is always using C. The transposition is done later in the editor
    abc += "K: C" + mode + "\n";
    
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




function loadNotation() {
    document.getElementById("abc-text1").value = convert_notation(scale, scale_header);
    document.getElementById("abc-text2").value = convert_notation(gat_notation, gat_header);
}    


function initEditors() {
    // number of steps to transpose from C.
    // key has to be one of: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
    let transpose = key[0].charCodeAt() - 'C'.charCodeAt() + key.length - 1;

    for (let i of "12") {
	ed = new ABCJS.Editor("abc-text" + i,
			 { paper_id: "notation" + i,
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
			   warnings_id:"warnings" + i,
			   abcjsParams: {
			       generateDownload: true,
			       visualTranspose: transpose,
			   }
			 });
	
    }

}

window.addEventListener("load", initEditors, false);

