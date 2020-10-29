var hindi_notes = {};
var english_notes = {};
var notenames = [];
var yellow = 'rgb(255, 255, 0)';
var gray = 'rgb(239, 239, 239)';
var inactive_notes = [];
var notes = `सां  रें॒  रें  गं॒  गं  मं॑  मं  पं  धं॒  धं  निं॒  निं
सा़  रे़॒  रे़  ग़॒  ग़  म़॑  म़  प़  ध़॒  ध़   नि़॒  नि़ 
सा  रे॒  रे  ग॒  ग  म॑  म  प  ध॒  ध  नि॒  नि`.split(/\s+/);;

const matras = {
    'Teentaal' : [4, 4, 4, 4],
    'Ektaal' : [2, 2, 2, 2, 2, 2],
    'Jhaptaal' : [2, 3, 2, 3],
    'Rupak': [3, 2, 2],
    'Keherva': [4, 4],
};

const isUpperCase = (string) => /^[A-Z]*$/.test(string)

function getBeats () {
    let beats = [];
    let beat=1;
    let taal = $("#taal" ).val();
    for (const beats_per_matra of matras[taal]) {
	for (k=0; k<beats_per_matra; k++, beat++)
	    beats.push(beat);
	beats.push('|');
    }
    return beats;
}

function toDevanagari (line, beats) {
    let all = Object.keys(hindi_notes);
    let active = all.filter(x => !inactive_notes.includes(x));
    line = line.replace(/\s+/g, '');
    let arr = [];
    let prev_note = "";
    let near_N1 = ['S2', 'R1', 'N1']; // temporary hard-coded stuff

    for (note of line) {
	if (note === "-") {
	    arr.push(note);
	    continue;
	}
	if (isUpperCase(note)) {
	    if (note == 'N') {
		if (near_N1.includes(prev_note)) note += 1; // this needs to be tweaked as necessary
		else note += 0;
	    }
	    else note += 2;
	    if (!active.includes(note)) note = note.toLowerCase();
	} else {
	    note += 1;
	    if (!active.includes(note)) note = note.toUpperCase();
	}
	prev_note = note;
	if(active.includes(note)) arr.push( hindi_notes[note]);
    }

    let ret = "";
    while (arr.length) {
	for (beat of beats) {
	    if (beat !== '|') {
		if (arr.length) beat = arr.shift() + arr.shift();
		else beat = "";
	    }
	    ret += "<td>" + beat + "</td>";
	}
	ret += "</tr>\n";
    }
    return ret;
}

function normalize (lines) {
    let open_brackets = [];
    let normalized = lines;
    let xx = 0
    while (normalized.indexOf('(') >= 0) {
	let capture = normalized.match(/\(([^\(]*?)\)x(\d+)/);
	if (capture.length == 3) {
	    normalized = normalized.substring(0, capture.index) +
		capture[1].repeat( capture[2]) +
		normalized.substring(capture.index + capture[0].length);
	    if (xx++ > 13) break;
	}
    }
    return normalized;
}

function createNotation() {
    let beats = getBeats();
    let tbody = $("#formatted tbody"); 
    let markup = "<tr>";
    let beat=1;

    let num_beats = 0;
    for (beat of beats) {
	markup += "<td>" + beat + "</td>"
	if (beat !== '|') num_beats++;
    }
    
    markup += "</tr>\n<tr>";

    let lines = normalize($("#notation").val().trim());
    lines = lines.split("\n");
    let ai_line = "";

    let linenum = 1;
    for (let line of lines) {
	if (line[0] == '#') {
	    markup += "<td colspan=" + beats.length + ">" + line + "</td></tr>\n"
	    continue;
	}

	if (line[0].match(/[a-z]/i)) {
	    ai_line += line;
	    if (linenum++ != lines.length) continue;
	    markup += toDevanagari(ai_line, beats);
	    break;
	}
	
	if (ai_line !== ""){
	    markup += toDevanagari(ai_line, beats);
	    ai_line == "";
	}
	    
	if (line[0] === '~') line = line.substring(1);
	line = line.trim().split(/\s+/);

	while (line) {
	    for (beat of beats) {
		if (beat !== '|') {
		    if (line[beat-1] === undefined) break;
		    beat = line[beat-1];
		}
		markup += "<td>" + beat + "</td>";
	    }
	    markup += "</tr>\n";
	    line = line.slice(num_beats);
	    if (line.length == 0) break;
	}
    }
    tbody.html(markup); 
}

function copyNotationHtml() {
    createNotation();
    let html = document.getElementById("formatted").outerHTML;
    navigator.clipboard.writeText(html);
}
function copyNotationText() {
    createNotation();
    let txt = document.getElementById("formatted").innerHTML;
    txt = txt.replace (/<.tr>\s+<tr><td><.td><.tr>/g, "__BR__");
    txt = txt.replace(/<.*?>/g, " ");
    txt = txt.replace(/\|/g, "\t|");
    txt = txt.replace(/^\s+/gm, ""); // m matches the beginning of each line a multi-line string
    txt = txt.replace(/__BR__/g, "\n");
    navigator.clipboard.writeText(txt);
}


function createVishwamohini() {
    let orig = $("#notation").val().trim();

    if (orig[0] == ';') {
	// Anjana style line;
	var repl = toDevanagari(orig, getBeats());
	
	repl = repl.replace(/\|<.td>/g, '');
	repl = repl.replace(/<td>/g, '');
	repl = repl.replace(/<.td>/g, '|');
	repl = repl.replace(/.<.tr>/g, '');
    } else {
	var repl = orig.replace(/\|/g, "");
    }
    
    let lines = repl.split("\n");
    converted = "[melody start]\n" ;

    let beats = getBeats().join('|');
    beats = beats.replace (/\|+/g, '|');
    beats = beats.replace (/.$/, '');
    converted += "[ " + beats + "] [lyrics]\n";
    
    let type = "lyrics"
    $.each(lines, function (i, line) {
	line = line.trim();
	if (line == "") {
	    converted += line;
	    return true;
	}
	if (line[0] == '#') return true;

	if (line[0] !=  '~') {
	    for (let key of notes) {
		line = line.replace(new RegExp(key, "g"), english_notes[key]);
	    }
	    type = "notations";
	} else {
	    line = line.substring(1);
	    type = "lyrics";
	}
	line = line.split(/\s+/).join('|');

	line = line.replace(/((.+|){4})/g, '$1    '); 

        converted += "[" + line + "]" + " ["+ type + "]" + "\n";
    });
    
    converted += "\n[melody end]\n";
    
    $("#vishwa").text(converted);
}

function copyVishwamohini() {
    createVishwamohini();
    navigator.clipboard.writeText($("#vishwa").html());
}

function insertnote(id) {
    id = hindi_notes[id];
    $("#notation").insertAtCaret(id);
}

function addSwar(text, id) {
    let b = $('<button/>', {
	text: (text === " " ? "SPC" : text),
	id: id,
	click: function () { insertnote(this.id); }
    });
    b.addClass("swar");
    $("#swaras").append(b);
    hindi_notes[id] = text;
    english_notes[text] = id;
}

function addButtons() {
    notelist = "S r R g G m M P d D n N";
    notenames = `सां  रें॒  रें  गं॒  गं  मं  मं॑  पं  धं॒  धं  निं॒  निं
सा  रे॒  रे  ग॒  ग  म  म॑  प  ध॒  ध  नि॒  नि  
सा़  रे़॒  रे़  ग़॒  ग़  म़  म़॑  प़  ध़॒  ध़   नि़॒  नि़ 
`.split(/\s+/);

    let note;
    
    let j=0;
    for (const i of [2, 1, 0]) {
	$("#swaras").append("<p>");
	for (note of notelist.split(" ")) {
	    addSwar(notenames[j], note+i);
	    j++;
	}
    }

    $("#swaras").append("<p>");
    addSwar(" ", 'spc');
    addSwar("-", '-');
    addSwar("ऽ", 'avagraha');
    
    html = $("#swaras").html();
    html = html.replace(/id="/g, 'id="A');
    $("#popup_swaras").html(html);
    $( "#popup_swaras button" ).on( "click", function() {
	color = $( this ).css('background-color');
	if (color == gray) $( this ).css({
	    'background-color': yellow,
	    'text-decoration': 'line-through'
	}); else $( this ).css({
	    'background-color': gray,
	    'text-decoration': 'none'
	});

	
    });
}


function createSubset() {
    inactive_notes = [];
    $("#popup_swaras button").each(function() {
	id = $(this).attr('id').substring(1);
	if ($(this).css("background-color") === yellow) {
	    $("#"+id).hide();
	    inactive_notes.push(id);
	} else {
	    $("#"+id).show();
	}
    });
    
    localStorage.setItem('inactiveNotes', inactive_notes);
}

$(document).ready(function () {
    addButtons();

    let coll = document.getElementsByClassName("collapsible");
    let i;
    
    for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
	    let content = this.nextElementSibling;
	    if ($(this).attr('id') == "show_text") createNotation();
	    else createVishwamohini();
	    
	    let txt = $(this).text().split(' ');
	    if (txt[0]=="Hide") txt[0] = "Show";
	    else txt[0] = "Hide";
	    txt = txt.join(' ')
	    $(this).html(txt);
	    this.classList.toggle("active");
	    if (content.style.display === "block") {
		content.style.display = "none";
	    } else {
		content.style.display = "block";
	    }
	});
    }
    

    jQuery.fn.extend({
        insertAtCaret: function (myValue) {
            return this.each(function (i) {
                if (document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                }
                else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    let startPos = this.selectionStart;
                    let endPos = this.selectionEnd;
                    let scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            })
        }
    });


    $("#notation").on('change keyup paste', function() {
	localStorage.setItem('textarea', $(this).val());
    });

    
    $(".trigger_popup_subset").click(function(){
       $('.hover_bkgr_subset').show();
    });
    
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_subset').hide();
    });

    inactive_notes = localStorage.getItem('inactiveNotes');
    
    if (inactive_notes === null)
	inactive_notes = 'd2,D2,n2,N2,S0,r0,R0,g0,G0';
    inactive_notes = inactive_notes.split(',');

    jQuery.each(inactive_notes, function(i, id) {
	$("#"+id).hide();
	$("#A"+id).css({
	    'background-color': yellow,
	    'text-decoration': 'line-through'
	});
    });

    let txt = localStorage.getItem('textarea');
    if (txt == null) txt = "((सासा रेरे मम गग )x2 सासा (रेरे गग )x2  रेरे सा )x2";
    $('#notation').val(txt);
});
