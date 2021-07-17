// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const scale_header = `T: Raag Yaman : scale
Q: 1/4=50
`;

const scale = `n, r g m d n S -  | S n d p m g r s - `;

const gat_header = `T: Raag Yaman : Gat in teentaal
L: 1/4
M: 4/4
Q:1/4=200
`;


const gat_notation = `|: n, r g r | s  - n, d, | n, - - - | n,/ r/ g/ r/ s - :|

| n, r g r | s  - n, d, | n, - - - | n, r g m |
| r g m p | g m d n | m d n S | n/ d/ p/ m/  g/ r/ s |
| n, r g r | s  - n, d, | n, - - - | n,/ r/ g/ r/ s - |

|: g m d n | S - S - | n R G R | n R S - :|
| n, n, n, m | m m n n | n M M M | G R S - |  
| n R S n | d p m g | g/ m/ d/ n/ R/ G/ R/ S/ | n/ d/ p/ m/ g/ r/ s |
| - d/ n/ R/ G/ R/ S/ | n/ d/ p/ m/ g/ r/ s | - - R/ G/ R/ S/ | n/ d/ p/ m/ g/ r/ s |

| n, r g r | s  - n, d, | n, - - - | n,/ r/ g/ r/ s - |


| n, r g r | s  - n, d, | n, - g r | s  - n, d, |
| n, - g r | s  - n, d, | 
n, - - - [sgp] = 
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
    
    re = /^[srgmpdn=/|,:\(\)\[\]\-\s]+$/ig;
    for (let line of str.split("\n")) {
	if (! line.match(re)) {
	    abc += "w:" + line.replace(/[-:]/g, "") + "\n";
	    continue;
	}
	notes = line.replaceAll("- - - -", "z4");
	notes = notes.replaceAll(" - - -", "4");
	notes = notes.replaceAll(" - -", "3");
	notes = notes.replaceAll(" -", "2");
	notes = notes.replaceAll("|3", "|z2");
	notes = notes.replaceAll("|2", "|z");
	notes = notes.replaceAll(" =", "12");
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

