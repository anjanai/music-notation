const x='x';
const taali_khali = {
    'teentaal' : [x, 2, 0, 3],
    'ektaal' : [x, 0, 2, 0, 3, 4],
    'jhaptaal' : [x, 2, 0, 3],
    'rupak': [0, 1, 2],
    'keherva': [x, 0],
    'dadra': [x, 0],
    'ada-chautaal': [x, 2, 0, 3, 0, 4, 0],
};

const matras = {
    'teentaal' : [4, 4, 4, 4],
    'ektaal' : [2, 2, 2, 2, 2, 2],
    'jhaptaal' : [2, 3, 2, 3],
    'rupak': [3, 2, 2],
    'keherva': [4, 4],
    'dadra': [3, 3],
    'ada-chautaal': [2, 2, 2, 2, 2, 2, 2],
	
};

    


function changeScript() {
    if ($('#button_changeScript').text() === "Change to Hindi") {
	$('table').removeClass("bhatkhande_english").addClass("bhatkhande_hindi");
	$('#button_changeScript').text("Change to English");
    } else {
	$('table').removeClass("bhatkhande_hindi").addClass("bhatkhande_english");
	$('#button_changeScript').text("Change to Hindi");
    }
}

function to_bhatkhande(raag, str) {
    switch (raag) {
    case "jog":
	/*
	  Input:
	  Lower octave:
	  m p n
	  ml pl nl
	  Middle octave: s _g g m p n
	  Higher octave: S _G G M P
	  
	  Output:
	  Lower ocatve: pl Nl
	  Middle octave: s G g m p n
	  Higher octave: Su Gu gu mu pu
	*/
		
	str = str.replace(/1/g, 'Nl');
	str = str.replace(/2/g, 'pl');
	
	str = str.replace(/G/g, 'gu');
	str = str.replace(/_G/g, 'Gu');
	str = str.replace(/M/g, 'mu');
	
	str = str.replace(/_g/g, 'G');
	str = str.replace(/n/g, 'N');
	str = str.replace(/S/g, 'su');
	break;
	
    case "chandrakauns" :
	/*
	  Input:
	  Lower octave: ml dl nl
	  Middle octave: s g m d n
	  Higher octave: S G M
	  
	  Output:
	  Lower ocatve: Dl nl
	  Middle octave: s G m D n
	  Higher octave: Su Gu mu
	*/
	
	str = str.replace(/G/g, 'Gu');
	str = str.replace(/M/g, 'mu');
	
	str = str.replace(/g/g, 'G');
	str = str.replace(/d/g, 'D');
	str = str.replace(/S/g, 'su');
	break;
    }

    str = str.replace(/\(/g, "<sup>");
    str = str.replace(/\)/g, "</sup>");
    return str;
}


$(document).ready(function () {
    $('span:hidden').each(function() {
	convert_notation($(this));	
    });
});

function format(line, taal, raag, start_at) {
    str = "";
    line = line.replace(/\|/g, "").trim();
    if (line === "") return "";

    line = to_bhatkhande(raag, line);
    
    let beats = line.split(/\s+/);
    let divs = matras[taal];

    let i=0;
    for (let div of divs) {
	let vibhag = beats.slice(i, i+div);
	str += "<td>";
	for (let v of vibhag) {
	    if (v.length > 1 &&  /[srgmpdn-]/i.test(v[0])) {
		let removed_ul = v.replace(/[u|l]/g, '');
		if (removed_ul.length == 2)
		    v = "@"+v;	
	    }
	    str += v + " ";

	}
	str += "</td>";
	i += div;
    }

    
    return str;
}

const rotateArray = (arr, k) => arr.slice(k).concat(arr.slice(0, k));



function format_taal(taal, start_at) {
    let beats=0;
    
    for (i=0; beats < start_at; i++) {
	beats += matras[taal][i];
    }
        
    let tk = rotateArray(taali_khali[taal], i-1);

    str = "\n<tr>"
    for (let i of tk) 
	str += "<td>"+i+"</td>";
    
    str += "</tr>";
    return str;
}

function convert_notation(obj) {
    let raag = $('#raag').val();
    let taal = obj.attr('taal');

    let str = '<table class="composition bhatkhande_english"><tbody>';
    let lines = obj.text().trim().split("\n");

    // taal
    str += format_taal(taal, obj.attr('start_at'))
    let linenum = 1
    for (let line of lines) {
	str += "<tr>" + format(line, taal, raag);
	if (obj.attr('other') === "taans")
	    str += "<td><pre>Taan " + linenum++;
	str += "</tr>";	
    }
    str += "</tbody></table>";
    $("#" + obj.attr('other')).html(str);
}
    
