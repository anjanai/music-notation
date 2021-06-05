const scale = `X: raag_indra
T: Raag Indra : scale
L: 1/4
R: Kavi Iyer
K: Cdor % C doria(ga, ni komal)
C E F G B c | c B G F E C
w: Sa ga ma Pa ni Sa | Sa ni Pa ma Re sa
`;


const tarana_notation = `| - - - - | s r - s     | n, p, s n,  | p, n, p, m,  | 
| - - - - | त नोम - त  | द  रे दा  नी   | ना दिर दिर त  |
| p, - - -     | m p g g     | m r s n,   | s n, p, n,  |
| नोम - - - | दे  रे ना दे    | रे ना  दा नी   | त न त न      |

| s - - -     | p p m p     | n -   p p    | n p g m |
| नोम - - - | य ली य ल    | लोम -  य ली   | य ल य ला |
| p n p -    | n S p p      | n m g m    | p/p/ m/m/ p/p/ n/n/ |
| ली य लोम -  | दे रे ना दे     | रे ना दा नी   | किड़ नग धुम किट |
| S - - -   |
| तोम - - - |
`;

let note = 'C';
let notemap = new Map();
for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
}


function convert_notation (str) {
    str = str.replace(/ +/g, ' ');
    let abc = `X: raag_indra_tarana
T: Raag Indra : Tarana in drut teentaal
L: 1/4
M: 4/4
Q:1/4=222
R: Kavi Iyer
K: Cdor % C dorian scale(ga, ni komal)
`;
    
    re = /^[srgmpn/|,\-\s]+$/ig;
    for (let line of str.split("\n")) {
	if (! line.match(re)) {
	    abc += "w:" + line.replaceAll("-", "") + "\n";
	    continue;
	}
	notes = line.replaceAll("- - - -", "z4");
	notes = notes.replaceAll(" - - -", "4");
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
    document.getElementById("abc-text1").value = scale;
    document.getElementById("abc-text2").value = convert_notation(tarana_notation);
}    


function initEditors() {
    new ABCJS.Editor("abc-text1", { paper_id: "notation1",
				    synth: {
					el: "#play1",
					options: { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true }
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

