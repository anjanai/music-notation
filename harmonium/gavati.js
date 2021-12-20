// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options


const scale_header = `T: Raag Gavati : scale
Q: 1/4=50
`;

const scale = `n, s g m p n S -  | S d p m p g m r n, s - `;

const bandish_header = `T: Raag Gavati : Bandish in roopak
L: 1/4
M: 4/4
Q:1/4=150
`;

const bandish_notation = `|p n |
स खी
|S - - -   | - - - - | S n S d | p - g - | m - m  g | m r -  n, |   s - - - |
| श्या - - - | - - - - | म सु ~ न्द | र - मू - | र - त  म | न में - ब | सी - - - |
| - - s m | g - g/m/ p |  p n p n | S n S/G/ M | R - S - | n - d - | p m p n |
| - - त न | की - -- - | सु ~ ध बु | ~ ध बि- सु | रा - ~ - | ~ -  ~ - | ई ~ स खी

|S - - -   | - - - - | S n S d | p - g - | m - m  g | m r -  n, |   s - - - |
| श्या - - - | - - - - | म सु ~ न्द | र - मू - | र - त  म | न में - ब | सी - - - |

| - - s m | g - g/m/ p |  p n p n | S n S/G/ M | R - S/R/ S/R/ | n/S/ n/S/ d/n/ d/n/ | p/d/ m  p n |
| - - त न | की - -- - | सु ~ ध बु | ~ ध बि- सु | रा - ~ - | ~ -  ~ - | ई ~  स खी


|S - - -   | - - - - | S n S d | p - g - | m - m  g | m r -  n, |   s - p n |
| श्या - - - | - - - - | म सु ~ न्द | र - मू - | र - त  म | न में - ब | सी -  स खी

|S - - -   | - - - - | S n S d | p - - - | - - - - | S - n -  | m p n n |
|  श्या - - - | - - - - | म सु ~ न्द | र - - - | - - - - |  मो - - - | र मु कु ट 

| S - - -  | S - S - | p - p n  | S G - M |   R - n S | S - n -  | m p n n |
| सी - - - | ~ - स - | ~ - का - | से ~ - पी | ता - म्ब र |  मो - - - | र मु कु ट 

| S - - -  | S - S - | p - p n  | S G - M |   R - n S | p n S R | d - m p | 
| सी - - - | ~ - स - | ~ - का - | से ~ - पी | ता - म्ब र | सू ~ र त | सा  व ली |

| g - g m | r - n, s | - - p n | S G - M | R - S/R/ S/R/ | n/S/ n/S/ d/n/ d/n/ | p/d/ m  p n |
| मू - र त | भा - व नी | - - म न | को ~ - रि | झा – – – | – – – -- |  ई - स खी

|S - - -   | S - - - | S n S d | p - p n | S - - -   | S n S d | p - p n |
| श्या - - - | ~ - - - | म सु ~ न्द | र -  स खी | श्या - - - |  म सु ~ न्द | र -  स खी | 

| S - - - | S - - -
श्या - - - | म - - -
`;



//let key = "C#";  // C, C#, D, D#, E, F, F#, G, G#, A, A#, B
let key = "C";
let mode = "Mix"
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
    document.getElementById("abc-text2").value = convert_notation(bandish_notation, bandish_header);
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

