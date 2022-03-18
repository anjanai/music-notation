let note = "C"
let notemap = new Map();
for (let swar of "srgmpdn") {
    notemap.set(swar, note);
    notemap.set(swar.toUpperCase(), note.toLowerCase());
    note = String.fromCharCode(note.charCodeAt() + 1)
    if (note > 'G') note = 'A';
}

function convert_note(x) {
    if (x.length > 1) {
	return '"_' + x + '"' + x[0] + notemap.get(x[1]);
    }
    return '"_' + x + '"' + notemap.get(x);
}


function note_length(word) {
    return word.match(/[a-z]/ig).length;
}

function note_split(word) {
    let notes=[];
    let prefix = '';
    for (let i=0; i<word.length; i++) {
	if (word[i].match(/[_^=]/)) prefix = word[i];
	else if (word[i] == ',') {
	    notes.push (prefix + notes.pop() + ',');
	    prefix = '';
	} else {
	    notes.push(prefix + word[i]);
	    prefix = '';
	}
    }
    return notes;
}

function convert_notation (line) {
    line = line.replace( /  +/g, ' ' ) 
    let notes = line.replaceAll("- - - -", "z4");
    notes = notes.replaceAll(" - - -", "4");
    notes = notes.replaceAll(" - -", "3");
    notes = notes.replaceAll(" -", "2");
    notes = notes.replaceAll("|3", "|z2");
    notes = notes.replaceAll("|2", "|z");

    let words = [];
    for (let word of notes.split(/(\s+)/)) {
	if (!word) continue;
	if (word.match(/^[,srgmpdn=_^]+$/ig) && note_length(word) >= 2 ) {
	    let chars = note_split(word);
	    word = chars.join('/') + '/';
	}
	words.push (word);
    }
    notes = words.join(' ');
    let abc="";
    let prefix="";
    for (let i = 0; i < notes.length; i++) {
	let c = notes[i];
	if (c.match(/[_^=]/))
	    prefix = c;
	else if (c.match(/[srgmpdn]/i)) {
	    abc += convert_note(prefix + c);
	    prefix = '';
	} else
	    abc += c;
    }    
    
    abc = abc.replaceAll("|| ", '| !+!');
    abc = abc.replaceAll("||:", '|:!+!');
    return abc;
}


function create_abc (lines) {
    let abc="";
    for (let i in lines) {
	let fields = lines[i].split(':');
	if (lines[i].trim() === "") abc += "%" 
	else if (fields[0] != "srg") abc += lines[i];
	else abc += convert_notation(lines[i].substring(4));
	abc += '\n';
    }
    return abc;
}


    

