var hindi_notes = {};
var english_notes = {};
var notenames = [];
var yellow = 'rgb(255, 255, 0)';
var gray = 'rgb(239, 239, 239)';

function removeswar() {
    console.log($(this).attr('id'));
}

function vishwaline(line) {
    line = line.replace(/(-|\d)/g, '$1|');
    
    //remove all the | chars inside brackets
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


function createvishwamohini() {
    notes = `सां  रें॒  रें  गं॒  गं  मं॑  मं  पं  धं॒  धं  निं॒  निं
सा़  रे़॒  रे़  ग़॒  ग़  म़॑  म़  प़  ध़॒  ध़   नि़॒  नि़ 
सा  रे॒  रे  ग॒  ग  म॑  म  प  ध॒  ध  नि॒  नि`.split(/\s+/);;
    orig = $("#notation").val().trim();

    for (let key of notes) {
	orig = orig.replace(new regexp(key, "g"), english_notes[key]);
	
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
	    line = vishwaline(line);
	    type = "notations";
	} else {
	    line = lyricsline(line.substring(1));
	    type = "lyrics";
	}

	line = line.replace(/((.+|){4})/g, '$1    '); 

        converted += "[" + line + "]" + " ["+ type + "]" + "\n";
    });
    
    converted += "\n[melody end]\n";
    
    $("#vishwa").text(converted);
}

function insertnote(id) {
    id = hindi_notes[id];
    $("#notation").insertatcaret(id);
}


function addButtons() {
    notelist = "s r r g g m m p d d n n";
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
	    var b = $('<button/>', {
		text: notenames[j],
		id: note+i,
		click: function () { insertnote(this.id); }
	    });
	    b.addClass("swar");
	    $("#swaras").append(b);
	    hindi_notes[note+i] = notenames[j];
	    english_notes[notenames[j]] = note+i;
	    j++;
	}
    }

    $("#popup_swaras").html($("#swaras").html());
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

    $(".trigger_popup_subset").click(function(){
       $('.hover_bkgr_subset').show();
    });
    
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_subset').hide();
    });
});
