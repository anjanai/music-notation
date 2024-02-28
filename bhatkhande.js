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

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
} 


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
    let map= new Map([
	["ahir-bhairav", "R,Ru,G,gu,M,mu,r,R,n,N"],
	["jog", "G,gu,_G,Gu,M,mu,_g,G,n,N"],
	["chandrakauns", "G,Gu,M,mu,g,G,d,D"],
    ]);

    str = tr(str, map.get(raag));
    
    // for all raags
    str = tr(str, "P,pu,S,su,(,<sup>,),</sup>");
    return str;
}

function tr (str, lookup) {
    // Translate the string character by character.
    let dict = lookup.split(',');
    for (let i = 0; i < dict.length; i += 2) {
	str = str.replaceAll(dict[i], dict[i + 1]);
    }
    return str;
}

$(document).ready(function () {
    $('span:hidden').each(function() {
	convert_notation($(this));	
    });
});

const group_char = ['', '', '@', '#', '$'];

function format(line, taal, raag) {
    str = "";
    line = line.replace(/\|/g, "").trim();
    if (line === "") return "";

    line = to_bhatkhande(raag, line);
    line = line.replace(/\./g, "&nbsp;");
    if (!isASCII(line))
	line = line.replace(/\-/g, 'ऽ');
    
    let beats = line.split(/\s+/);
    let divs = matras[taal];
    

    let i=0;
    for (let div of divs) {
	let vibhag = beats.slice(i, i+div);
	str += "<td>";
	for (let v of vibhag) {
	    if (v.length > 1 &&  /[srgmpdn-]/i.test(v[0])) {
		let removed_ul = v.replace(/[u|l]/g, '');
		if (removed_ul.length > 1)
		    v = group_char[removed_ul.length]+v;	
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

function find_sam (arr) {
    for (let i=0, j=0; i<arr.length; i++) {
	if (arr[i] === "||") return j;
	if (arr[i] === "|") continue;
	j++;
    }
    return -1;
}
    
function convert_notation(obj) {
    let raag = $('#raag').val();
    let taal = obj.prevAll('.taal:first').val();
    
    let str = '<table class="composition bhatkhande_hindi"><tbody>';
    let lines = obj.text().trim().split("\n");

    let avartan = matras[taal].reduce(function(a, b){
	return a + b;
    });

    let start_at = avartan - find_sam (lines[0].split(/\s+/)) + 1;
    
    // taal
    str += format_taal(taal, start_at)
    let linenum = 1
    for (let line of lines) {
	if (line.trim() === "") continue;
	str += "<tr>" + format(line, taal, raag);
	if (obj.attr('id') === "taans")
	    str += "<td><pre>Taan " + linenum++;
	str += "</tr>";	
    }
    str += "</tbody></table>";

    obj.after(str);
}
    
