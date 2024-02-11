function changeScript() {
    if ($('#button_changeScript').text() === "Change to Hindi") {
	$('table').removeClass("bhatkhande_english").addClass("bhatkhande_hindi");
	$('#button_changeScript').text("Change to English");
    } else {
	$('table').removeClass("bhatkhande_hindi").addClass("bhatkhande_english");
	$('#button_changeScript').text("Change to Hindi");
    }
}

/*
Lower octave:
g m d N
4 3 2 1
*/
function to_chandrakauns(str) {

    str = str.replace(/1/g, 'nl');
    str = str.replace(/2/g, 'Dl');
    
    str = str.replace(/G/g, 'Gu');
    str = str.replace(/M/g, 'mu');
    
    str = str.replace(/g/g, 'G');
    str = str.replace(/d/g, 'D');
    str = str.replace(/S/g, 'su');
    return str;
}


$(document).ready(function () {
    $('span:hidden').each(function() {
	convert_notation($(this));
	
    });
});

function convert_notation(obj) {
    let notation = obj.text().trim().replace(/\|\|/g, '|');
    let bhat = '<table class="composition bhatkhande_english"><tbody>';
    let line_num = 0;
    let lines = notation.split("\n");

    for (let line of lines) {
	line = line.trim();
	if (line === "") continue;
	line = line.replace(/^\|+/, "");
	
	bhat += "\n<tr>"
	let divs = line.split("|");
	if (line_num == 0) {
	    if (divs.length > 3)  bhat += "<td>0</td><td>4</td><td>x</td><td>3</td><td></tr><tr>";
	    else  bhat += "<td></td><td>x<td>3<td></tr><tr>";
	}
	line_num++;
	if (obj.attr('other') === "taans")
	    bhat += "<td width=10%><pre>" + line_num + "</pre></td>";

	
	for (let div of divs) {
	    bhat += "\n<td>";
		
	    let beats = div.trim().split(/\s+/g);
	    for (let beat of beats) {
		if (beat.length == 2)
		    beat = "@" + beat;
		    
		bhat += to_chandrakauns(beat) + " ";
	    }
	    bhat += "</td>";
	}
	bhat += "\n</tr>";
    }
    bhat += "</tbody></table>";
    console.log ("#" + obj.attr('other'));
    $("#" + obj.attr('other')).html(bhat);
}
    
