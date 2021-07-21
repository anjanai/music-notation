// see https://paulrosen.github.io/abcjs/overview/examples.html for examples
// See https://paulrosen.github.io/abcjs/ for help on abcjs
// See https://configurator.abcjs.net/ for configuration options

const bandish_header = `T: Raag Yaman : Shree Guru Sharan
C: Lyrics by Sant Tulsidas
L: 1/4
M: 4/4
Q:1/4=150
`;


const bandish_notation = `|: n, r g m | p m g r | n, - g r  | g - - - :|
श्री ~ गु रु | च र न स | रो - ज  र ज
| g g m m | d p m g | p  r - - | {g}r n, r s - |
नि ज म नु मु कु र  सु धा ~ ~ ~  रि ~
| n, r g m | p m g r | n, - g r  | g - - - |
श्री ~ गु रु | च र न स | रो - ज  र ज
|: g m d {n}S | n - d n | S S n R | G R S - :|  
ब र न ऊं ऽ र घु ब र बि म ल ज सु
| n R S n | d p m g | p r - - | {g}r n, r s - |
 जो ~ दा ~ य कु फ ल चा ~ ~ ~ रि ~
| n, r g m | p m g - | 
श्री ~ गु रु | च र न 
| n, r g m | p m g - |
श्री ~ गु रु | च र न  
| n, r g m | p m g r | |n, - g r  | g {g}r  s - |
श्री ~ गु रु | च र न स | रो - ज  र ज 
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
    
    re = /^[srgmpdn/|,:\(\)\{\}\-\s]+$/ig;
    for (let line of str.split("\n")) {
	if (! line.match(re)) {
	    abc += "w:" + line.replace(/[-:]/g, "") + "\n";
	    abc = abc.replaceAll("~", "ऽ");
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
	abc += "w:" + line + "\n";
    }
    console.log (abc);
    return abc;
}

function loadNotation() {
    document.getElementById("abc-text2").value = convert_notation(bandish_notation, bandish_header);
}    


function initEditors() {
    create_ABCJS(key, "2");
}


window.addEventListener("load", initEditors, false);

