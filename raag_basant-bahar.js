// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const scale_header = `T: Raag Basant-Bahar 
Q: 1/8=100
`;

//S - m - mP - gm - n - DNS'R'S'
//S' - NdP - MGM-G - M - G - r - S
const scale = `s m m/p/ _g/m/ _n d =n S/R/ S - | S =n _d p ^m =g m/g/ _r s`;

const bandish_header = `T: Raag Basant-Bahar : Bandish in teentaal
C: S N Ratanjankar
L: 1/4
M: 4/4
Q:1/4=140
`;


const bandish_notation = `|S - _n/ p/  p   | m p _g m | z _n d =n |  S - d n |
फू ली ऽ न | ई न ई  | बे ऽ ल | री  स खि |
|S - _n/ p/  p   | m p _g m | z _n d =n |  S - _d n |
फू ली ऽ न | ई न ई  | बे ऽ ल | री  स खि |
| _R ^M =G _R | S - _n =d |    =n S _n p |   =m p _g m |
| रं ग र स | सों  भ री | अ त ह र | खे  ऽ म न |
| =r - s - |  s s =m =g |    ^m _d =n  S |  _R S =n _d
| मे - रो - | जि या हु ल | स त नि हा | रे नि हा रे ।
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
	line = line.replace(/[-:]/g, "");
	//abc += "w:" + line + "\n";
    }
    console.log (abc);
    return abc;
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

    /* for animation .. 
    const target = ed.tunes[0];
    console.log (target);
    const timer = new ABCJS.TimingCallbacks(target, {
	qpm: 200,
	extraMeasuresAtBeginning: 2,
	beatCallback: beatCallback,
	eventCallback: eventCallback,
    });

    console.log(timer);
*/

}

function beatCallback(num) {
  console.log(num);
}

function eventCallback(ev) {
  console.log(ev);
}


window.addEventListener("load", initEditors, false);

