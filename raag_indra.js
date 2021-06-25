const scale_header = `X: raag_indra
T: Raag Indra : scale
L: 1/4
R: Kavi Iyer
K: Cdor % C doria(ga, ni komal)
`;

const scale = `s g m p n S | S n p m r s`;


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

const tarana_header = `X: raag_indra_tarana
T: Raag Indra : Tarana in drut teentaal
L: 1/4
M: 4/4
Q:1/4=222
R: Kavi Iyer
K: Cdor % C dorian scale(ga, ni komal)
`;

const hanuman_header = `X: raag_indra_bandish
T: Raag Indra : Bandish in madhyalaya teentaal
L: 1/4
M: 4/4
Q:1/4=111
R: Kavi Iyer
K: Cdor % C dorian scale(ga, ni komal)
`;

const hanuman_notation = `| g m/r/ s n, | s - p, r | -  n, g m | p m r n, |
| ज य ~  ह नु | मा न ज्ञा | ~ न गु न | सा ~ ग र |
| g m/r/ s n, | s - p, r | - n, g m | r - s s |
| ज य ~ ह नु | मा न ज्ञा | ~ न गु न | सा - ग र |
| r s n, s | - g m p | n m p g | m r s s |
| ज य क पी | ~ स ति हुं | लो ~ क उ | जा ~ ग र |

| m - m p | - p n p | n S S n | R n S - |
| रा - म दू | ~ त अ तु | लि त ब ल | धा ~ मा - |
| G - M R | S - n p | S n p m | g - m - |
| अं - ज नि | पु - त्र प | व न सु त | ना - मा - |
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
    
    re = /^[srgmpn/|,\-\s]+$/ig;
    for (let line of str.split("\n")) {
	if (! line.match(re)) {
	    abc += "w:" + line.replaceAll("-", "") + "\n";
	    continue;
	}
	//notes = line.replaceAll(" | -", "T1 | T2");
	notes = line.replace(/(.) \| -/, "($1 | $1)");
	notes = notes.replaceAll("- - - -", "z4");
	notes = notes.replaceAll(" - - -", "4");
	notes = notes.replaceAll(" -", "2");

	for (let i = 0; i < notes.length; i++)
	    abc += ( notemap.get(notes[i]) || notes[i] );
	abc += "\n";
	line = line.replaceAll("| -", "| =");
	line = line.replaceAll("-", "");
	line = line.replaceAll("/", " ");
	console.log (line);
	abc += "w:" + line + "\n";
    }
    //console.log (abc);
    return abc;
}




function loadNotation() {
    //document.getElementById("abc-text1").value = convert_notation(scale, scale_header);;
    //document.getElementById("abc-text2").value = convert_notation(tarana_notation, tarana_header);
    document.getElementById("abc-text3").value = convert_notation(hanuman_notation, hanuman_header);
}    


function initEditors() {
    for (let i of "123") {
	new ABCJS.Editor("abc-text" + i,
			 { paper_id: "notation" + i,
			   synth: {
			       el: "#play" + i,
			       options: {
				   displayLoop: true,
				   displayRestart: true,
				   displayPlay: true,
				   displayProgress: true,
				   displayWarp: true
			       }
			   },
			   generate_warnings: true,
			   warnings_id:"warnings" + i,
			   abcjsParams: {
			       generateDownload: true,
			   }
			 });
	
    }
}

window.addEventListener("load", initEditors, false);

