let note = "C"
let notemap = new Map();
for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
}

function convert_note(x) {
    let str = notemap.get(x);
    if (!str) return x;
    return '"_' + x + '"' + str;
}

const header = `T: Raag Kafi : Bandish in teentaal % (Edit title before the % sign)
C: Music by Pt. Vinayakrao Kale % (Edit music composer)
C: Lyrics : http://kavitakosh.org/kk/आज_बिरज_मे_होरी_रे_रसिया_/_बुन्देली % (Edit lyricist)
L: 1/4
M: 4/4
Q:1/4=150 % (Edit tempo)
K: CDor % (Edit Key)
P:आज बिरज में होरी रे रसिया, नन्दगांव के कुंअर कन्हैया   % (Edit text)
`;

function note_length(word) {
    word = word.replaceAll(',', '');
    return word.length;
}

function srg2abc() {
    let srg = document.getElementById("txt_srg").value;
    let abc = header;

    re = /^[,srgmpdn=/|,:\(\)\[\]\-\s]+$/ig;
    for (let line of srg.split("\n")) {
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

	let words = [];
	for (let word of notes.split(" ")) {
	    if (note_length(word) == 2 && word.match(/^[,srgmpdn]+$/ig)) {
		let chars = word.split('');
		word = chars.join('/') + '/';
	    }
	    words.push (word);
	}
	notes = words.join(' ');
	console.log (notes);
	for (let i = 0; i < notes.length; i++)
	    abc += convert_note(notes[i] );

	abc = abc.replaceAll("|| ", '| "^X"');
	abc += "\n";
    }

    document.getElementById("txt_abc").innerHTML = abc;
}
