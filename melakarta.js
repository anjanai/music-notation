var names = `kanakangi ka na
ratnangi ra na
gaanamoorti ga na
vanaspati va na
maanavati ma na
taanaroopi ta na
`.split(/\s+/);

var letters = `ka क	kha ख	ga ग 	gha घ 	nga ङ 	ca च 	cha छ 	ja ज 	jha झ 	nya ञ - - 
ṭa ट 	ṭha ठ 	ḍa ड 	ḍha ढ 	ṇa ण 	ta त 	tha थ 	da द 	dha ध 	na न - - 
pa प 	pha फ 	ba ब 	bha भ 	ma म 	- – 
ya य 	ra र 	la ल 	va व 	śha श 	sha ष 	sa स 	ha ह 	- -`.split(/\s+/);

var syll_to_num = {};

var rg = ['R1 G1', 'R1 G2', 'R1 G3', 'R2 G2', 'R2 G3', 'R3 G3'];
var dn = ['D1 N1', 'D1 N2', 'D1 N3', 'D2 N2', 'D2 N3', 'D3 N3'];

var chakras = 'Indu Netra Agni Veda Baana Ritu Rishi Vasu Brahma Disi Rudra Aditya'.split(' ');

$(document).ready(function () {
    let thead = $("#katapayadi_table thead");
    let markup = "<tr>";
    let tbody = $("#katapayadi_table tbody");
    
    for (i=1; i<=9; i++)
	markup += "<th>"  + i + "</th>";
    markup += "<th>0</th></tr>";
    thead.html(markup);

    markup = '<tr>';
    let col=1;
    for (let i=0; i<letters.length; i+=2) {
	if (letters[i] == '-') {
	    markup += '</tr>\n<tr>'
	    col = 1;
	    continue;
	}
	syll_to_num[letters[i]] = col++;
	if (col == 10) col = 0;
	markup += '<td>' + letters[i] + ' ' + letters[i+1] + '</td>';
	
    }
    tbody.html(markup);
    
    tbody = $("#mela_table tbody");
    thead = $("#mela_table thead");
    markup =  "<tr>";
    
    for (let str of "Number Name Letters Number Notes Chakra".split(' ')) {
	markup += "<th>" + str + "</th>";
    }
    markup += "</tr>\n";
    thead.html(markup);

    for (let i=0; i<names.length; i+=3) {
	if (!names[i+1]) break;
	let index= i/3+1;
	let n1 =  syll_to_num[names[i+1]];
	let n2 =  syll_to_num[names[i+2]];

	let nums = names[i+1] + "(";
	nums += n1 + "), " + names[i+2] + "(";
	nums += n2 + ")" ;

	let notes = 'S ';
	let quotient = Math.floor(i/3/6);
	let remainder = i/3 % 6;
	notes += rg[quotient];
	if (index <= 36)
	    notes += " M1 P ";
	else
	    notes += " M2 P ";
	notes += dn[remainder] ;
	
	markup = '<tr><td>' + index + '</td>' +
	    '<td>' + names[i] + '</td>' +
	    '<td>' +  nums + '</td>' +
	    '<td>' + n1.toString() + "+" + n2.toString() + '*10 = ' + index +  '</td>' +
	    '<td>' + notes + '</td>' +
	    '<td>' + chakras[quotient] + "</td>" +
	    '</tr>';

	
	tbody.append(markup);
    }
    
});
