var hindi_notes = {};
var english_notes = {};
var notenames = [];
var yellow = 'rgb(255, 255, 0)';
var gray = 'rgb(239, 239, 239)';
var inactive_notes = [];
var notes = `सां  रें॒  रें  गं॒  गं  मं॑  मं  पं  धं॒  धं  निं॒  निं
सा़  रे़॒  रे़  ग़॒  ग़  म़॑  म़  प़  ध़॒  ध़   नि़॒  नि़ 
सा  रे॒  रे  ग॒  ग  म॑  म  प  ध॒  ध  नि॒  नि`.split(/\s+/);;


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

function createNotation() {
    tbody = $("#formatted tbody"); 
    tbody.empty();
    var orig;
    orig = $("#notation").val().trim();

    for (let key in notes) {
	orig = orig.replace(new RegExp(key, "g"), english_notes[key]);
    }
    
    var lines = orig.split("\n");
    var matras = [4, 4, 4, 4];
    
    $.each(lines, function (i, line) {
	if (line[0] === '~') line = line.substring(1);
	if (line.trim() === '') {
	    return tbody.append("<tr></tr>")
	}
	line = line.trim().split(/\s+/);

	markup = "<tr>";
	var from_beat = 0;
	$.each(matras, function (j, beats_per_matra) {
	    var vibhag = line.slice(from_beat, from_beat + beats_per_matra);
	    $.each(vibhag, function (k, matra) {
		markup += "<td>" + matra + "</td>"
	    });
	    markup += "<td> | </td>";
	    from_beat += beats_per_matra
	});
	markup += "</tr>\n";
	tbody.append(markup); 
    });
    
}

function copyNotationHtml() {
    createNotation();
    var html = document.getElementById("formatted").outerHTML;
    navigator.clipboard.writeText(html);
}
function copyNotationText() {
    createNotation();
    var txt = document.getElementById("formatted").innerHTML;
    txt = txt.replace(/<.*?>/g, " ");
    navigator.clipboard.writeText(txt);
}


function createvishwamohini() {
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
    $("#notation").insertAtCaret(id);
}


function addButtons() {
    notelist = "s r R g G m M P d D n N";
    notenames = `सां  रें॒  रें  गं॒  गं  मं  मं॑  पं  धं॒  धं  निं॒  निं
सा  रे॒  रे  ग॒  ग  म  म॑  प  ध॒  ध  नि॒  नि  
सा़  रे़॒  रे़  ग़॒  ग़  म़  म़॑  प़  ध़॒  ध़   नि़॒  नि़ 
`.split(/\s+/);

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
	    // active_notes.push(id);
	    $("#"+id).show();
	}
    });
    
    localStorage.setItem('inactiveNotes', inactive_notes);
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

    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
	    var content = this.nextElementSibling;
	    var txt = $(this).text().split(' ');
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


    $("#notation").on('change keyup paste', function() {
	localStorage.setItem('textarea', $(this).val());
    });

    
    $(".trigger_popup_subset").click(function(){
       $('.hover_bkgr_subset').show();
    });
    
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_subset').hide();
    });

    inactive_notes = localStorage.getItem('inactiveNotes').split(',');

    jQuery.each(inactive_notes, function(i, id) {
	$("#"+id).hide();
	$("#A"+id).css({
	    'background-color': yellow,
	    'text-decoration': 'line-through'
	});
    });

    $('#notation').val(localStorage.getItem('textarea'));
});
