var hindi_notes = {};
var english_notes = {};
var notenames = [];

function swarSubset() {

}

function vishwaLine(line) {
    line = line.replace(/(-|\d)/g, '$1|');
    
    //Remove all the | chars inside brackets
    line = line.replace(/(\(.*?\))/g, function(m, match) {
	return m.replace(/\|/g, "");
    });
    line = line.replace(/(\{.*?\})/g, function(m, match) {
	return m.replace(/\|/g, "");
    });
    
    line = line.replace(/\}/g, '}|');
    
    line = line.replace(/\)/g, ')|');
    
    line = line.replace(/\|$/, '');

    return line;
}


function createVishwamohini() {
    notes = `सां  रें॒  रें  गं॒  गं  मं॑  मं  पं  धं॒  धं  निं॒  निं
सा़  रे़॒  रे़  ग़॒  ग़  म़॑  म़  प़  ध़॒  ध़   नि़॒  नि़ 
सा  रे॒  रे  ग॒  ग  म॑  म  प  ध॒  ध  नि॒  नि`.split(/\s+/);;
    orig = $("#notation").val().trim();

    for (let key of notes) {
	orig = orig.replace(new RegExp(key, "g"), english_notes[key]);
	
    }
    repl = orig.replace(/\|/g, "");
    var lines = repl.split("\n");
    converted = "[melody start]\n" ;

    var type = "lyrics"
    $.each(lines, function (i, line) {
	line = line.trim();
	if (line == "") {
	    converted += line;
	    return true;
	}

	
	if (line[0] !=  '~') {
	    line = vishwaLine(line);
	    type = "notations";
	} else {
	    line = lyricsLine(line.substring(1));
	    type = "lyrics";
	}

	line = line.replace(/((.+|){4})/g, '$1    '); 

        converted += "[" + line + "]" + " ["+ type + "]" + "\n";
    });
    
    converted += "\n[melody end]\n";
    
    $("#vishwa").text(converted);
}

function insertNote(id) {
    id = hindi_notes[id];
    $("#notation").insertAtCaret(id);
}


function addButtons() {
    notelist = "S r R g G m M P d D n N";
    notenames = `सां  रें॒  रें  गं॒  गं  मं  मं॑  पं  धं॒  धं  निं॒  निं
सा  रे॒  रे  ग॒  ग  म  म॑  प  ध॒  ध  नि॒  नि  
सा़  रे़॒  रे़  ग़॒  ग़  म़  म़॑  प़  ध़॒  ध़   नि़॒  नि़ 
`.split(/\s+/);

    notes = [];
    var i=0;
    var note;

    var j=0;
    for (const i of [2, 1, 0]) {
	$("#swaras").append("<p>");
	for (note of notelist.split(" ")) {
	    //notes.push(note+i);
	    var b = $('<button/>', {
		text: notenames[j],
		id: note+i,
		click: function () { insertNote(this.id); }
	    });
	    b.addClass("swar");
	    $("#swaras").append(b);
	    hindi_notes[note+i] = notenames[j];
	    english_notes[notenames[j]] = note+i;
	    j++;
	}
    }
    $( "#swaras" ).clone().appendTo( "#popup_swaras" );

}

function limitNotes() {
    if (! window.focus)return true;
    var href;
    window.open(href, windowname, 'width=400,height=200,scrollbars=yes');
    return false;
}



function lyricsLine(line) {
    str = "";
    line = line.split("");
    for (i=0; i<line.length; i++) {
	syll = line[i];
	next = line[i+1];
	str += syll;
	
	if (next == ' ' || next == '\t') continue
	if ((next > "ऄ" && next < "ह") || next < '{' ) {
	    str += "|";
	}
    }
    return str;
}

$(document).ready(function () {
    addButtons();
    
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
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
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

    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});
