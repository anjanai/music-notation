// See https://paulrosen.github.io/abcjs/ for help on abcjs

const scale_header = `T: Raag Kalavati : scale
K: Cmix % C mixolydian(ni komal)
`;

const scale = `s g p d n S | S n d p g s`;

const gat_header = `T: Raag Kalavati : Gat in drut teentaal
L: 1/4
M: 4/4
Q:1/4=222
K: Cmix % C mixolydian(ni komal)
`;


const gat_notation = `| g p d n | d p g d | p - - - | g - s - | 
| n, n, s - | g g p - | d d p - | g g s - |
| g p d n | d p d n | S - - - | n n S - | 
| n S S - | d S S - | p S S - | g S S - |
| S n d n | S n d p | g p d n | d p g s |
| g p d n | d p g d | p - - - | g - s - | 
| g p d n | d p - - | g p d n | d p - - | 
| g p d n | d p g d | p - - - | g - - - | s - - - | 

`;

let note = 'C';
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
    
    re = /^[srgmpdn/|,\-\s]+$/ig;
    for (let line of str.split("\n")) {
	if (! line.match(re)) {
	    abc += "w:" + line.replaceAll("-", "") + "\n";
	    continue;
	}
	notes = line.replaceAll("- - - -", "z4");
	notes = notes.replaceAll(" - - -", "4");
	notes = notes.replaceAll(" - -", "3");
	notes = notes.replaceAll(" -", "2");
	for (let i = 0; i < notes.length; i++)
	    abc += ( notemap.get(notes[i]) || notes[i] );
	abc += "\n";
	line = line.replaceAll("-", "");
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
    new ABCJS.Editor("abc-text1", { paper_id: "notation1",
				    synth: {
					el: "#play1",
					options: {
					    displayLoop: true,
					    displayRestart: true,
					    displayPlay: true,
					    displayProgress: true,
					    displayWarp: true }
				    },
				    generate_warnings: true,
				    warnings_id:"warnings1",
				    abcjsParams: {
					generateDownload: true,
				    }
				  });

    new ABCJS.Editor("abc-text2", { paper_id: "notation2",
				    synth: {
					el: "#play2",
					options: { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true }
				    },
				    generate_warnings: true,
				    warnings_id:"warnings2",
				    abcjsParams: {
					generateDownload: true,
					
				    }
				  });
}



window.addEventListener("load", initEditors, false);

