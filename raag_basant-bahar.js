// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const scale_header = `T: Raag Basant-Bahar 
L: 1/4
Q: 1/4=100
`;

//S - m - mP - gm - n - DNS'R'S'
//S' - NdP - MGM-G - M - G - r - S
const scale = `s m2 m/p/ _g m _n d =n2 S2 R S2  | S =n _d p ^m2 =g m/g/ _r2 s`;

const bandish_header = `T: Raag Basant-Bahar : Bandish in teentaal
C: S N Ratanjankar
L: 1/4
M: 4/4
Q:1/4=140
`;


const bandish_notation = `|S - _n   p   | m p _g m | z _n d =n |  S - d n |

फू ली  न | ई न ई ऽ | बे ऽ ल | री  स खि |
|S - _n/ p/  p   | m p _g m | z _n d =n |  S - _d n |
फू ऽ ऽ ली | न ई न ई  | बे ऽ ल | री  स खि |
| _R ^M =G _R | S - _n =d |    =n S _n p |   =m p _g m |
| रं ग र स | सों  भ री | अ त ह र | खे  ऽ म न |
| =r - s - |  s s =m =g |    ^m _d =n  S |  _R S =n _d
| मे - रो - | जि या हु ल | स त नि हा | रे नि हा रे ।
|S - _n   p   | m p _g m | z _n d =n |  S - - - |
फू ली  न | ई न ई ऽ | बे ऽ ल | री   |
|: _g m _n d |   =n S - S |	S - S n |   n/R/ S _n d :|
| अ म्बु वा - | की डा - र | बै - ठी को | य  ऽ  लि या  ऽ |
| d =n S _R | S =n _d S |  =n  - - p |   ^m - =g ^m |
| कु हू कु हू | क र त पु | का  र | मा - नो म |
| =g - _r s |  z  s/m/ m p  |  _g m _n =d |   =n z/S/ =d =n |
| ना - व त | - स र स ब | सं ऽ त ब | हा -र स खि |
|S - _n   p   | m p _g m | z _n d =n |  S - - - |
फू ली  न | ई न ई ऽ | बे ऽ ल | री   |
|S - _n   p   | m p _g m | 
फू ली  न | ई न ई ऽ 
|S - _n   p   | m p _g m | 
फू ली  न | ई न ई ऽ 
|S - _n   p   | m p _g m | z _n d =n |  S - - - |
फू ली  न | ई न ई ऽ बे ऽ ल | री   |

`;


let key = "C";  // C, C#, D, D#, E, F, F#, G, G#, A, A#, B
let mode = "Maj"
let note = "C"
let notemap = new Map();

for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
}

let hindi_notes = `सां  रें॒  रें  गं॒  गं  मं॑  मं  पं  धं॒  धं  निं॒  निं
सा  रे॒  रे  ग॒  ग  म॑  म  प  ध॒  ध  नि॒  नि`.split(/\s+/);

let eng_notes = `S _R R _G G M ^M P _D D _N N
s _r r _g g m ^m p _d d _n n`.split(/\s+/);

let eng2hin = new Map();
for (i=0; i<hindi_notes.length; i++) {
    eng2hin.set(eng_notes[i], hindi_notes[i]);
}

function convert_notation (str, header) {
    str = str.replace(/ +/g, ' ');
    let abc = header;

    // The notation is always using C. The transposition is done later in the editor
    abc += "K: C" + mode + "\n";
    
    re = /^[1-9srgmpdnz/|,_=^:\(\)\-\s]+$/ig;
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
	//abc += "w:" + hindi_notation(line) + "\n";
    }
    console.log (abc);
    return abc;
}

function hindi_notation(line) {
    line = line.replace(/[-:/0-9=]/g, "");
    console.log(line);
    return line;
}

function loadNotation() {
    document.getElementById("abc-text1").value = convert_notation(scale, scale_header);
    document.getElementById("abc-text2").value = convert_notation(bandish_notation, bandish_header);
}    


function initEditors() {
    // number of steps to transpose from C.
    // key has to be one of: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
    let transpose = key[0].charCodeAt() - 'C'.charCodeAt() + key.length - 1;

    var ed;
    for (let i of "12") {
	ed = new ABCJS.Editor("abc-text" + i,
			      { paper_id: "notation" + i,
				generate_warnings: true,
				warnings_id:"warnings" + i,
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
				abcjsParams: {
				    generateDownload: true,
				    downloadLabel:"Download MIDI",
				    visualTranspose: transpose,
				}
			      });
	
    }

}

window.addEventListener("load", initEditors, false);

