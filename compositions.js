let compositions = [
    'kafi',
    'malkauns_kaari-kaari',
];

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


$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    let comp = urlParams.get("get");
    if (comp) {
	loadsrg(comp);
	return false;
    }
    if (location.hostname === "localhost") compositions.push('test');
    for (let i in compositions) {
	let name=compositions[i];
	let a = `<li><a id="comp${i}" title="Click to load ${name}"
	href="#${name}" onclick="loadsrg(${name});return false;">${name}</a></li>`;
	$("#list").append(a);
    }    
});

function loadsrg(name) {
    fetch("harmonium/" + name + ".srg")
	.then(response => response.text())
	.then(data => create_abc(data.split("\n")));
};

function note_length(word) {
    word = word.replaceAll(',', '');
    return word.length;
}

function convert_notation (line) {
    line = line.replace( /  +/g, ' ' ) 
    let notes = line.replaceAll("- - - -", "z4");
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
    let abc="";
    for (let i = 0; i < notes.length; i++)
	abc += convert_note(notes[i] );
    
    abc = abc.replaceAll("|| ", '| "^X"');
    abc = abc.replaceAll("||:", '|:"^X"');
    console.log (abc);
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
    showabc(abc);
}

function loadabc(i) {
    fetch(compositions[i])
    .then(response => response.text())
    .then(data => showabc(data));
};

function showabc(data) {
    let url = "https://editor.drawthedots.com/?t=" + encodeURIComponent(data);
    window.open(url);
}

    

