var names = `Kanakangi ka na 
Ratnangi ra na
Gaanamurti ga na
Vanaspati va na
Manavati ma na
Tanarupi ta na

Senavati sa na
Hanumatodi ha na
Dhenuka dha na
Natakapriya na ṭa
Kokilapriya ka ka
Rupavati ra pa

Gaayakapriyaa ga ya
Vakulaabharanam va ka
Maayamalavagowla ma ya
Chakravakam ca ka
Suryakaantam sa ya
Haatakaambari ha ṭa

Jhankaradhwani jha ka
Nathabhairavi na ṭha
Keeravani ka ra
Kharaharapriya kha ra
Gourimanohari ga ra
Varunapriya va ra

Mararanjani ma ra
Charukesi ca ra
Sarasangi sa ra
Harikambhoji ha ra 
Dheerasankarabaranam dha ra
Naganandini na ga

Yagapriya  ya ga
Ragavardhini ra ga
Gangeyabhushani ga ga
Vagadheeswari va ga
Shulini śha la
Chalanata ca la 

Salagam sa la
Jalarnavam ja la
Jhalavarali jha la
Navaneetam na va
Pavani pa va
Raghupriya ra gha

Gavambhodi ga va
Bhavapriya bha va
Shubhapantuvarali śha bha
Shadvidamargini sha va
Suvarnangi sa va
Divyamani da va

Dhavalambari dha va
Nāmanarayani na ma
Kamavardhini ka ma
Ramapriya ra ma
Gamanashrama ga ma
Vishwambari va śha

Shāmalangi śha  ma
Shanmukhapriya sha ma
Simhendramadhyamam sa ma
Hemavati ha ma
Dharmavati dha ma
Neetimati na ta

Kantamani  ka ta
Rishabhapriya ra sha
Latangi la ta
Vachaspati va ca
Mechakalyani ma ca
Chitrambari ca ta

Sucharitra sa ca
Jyotiswarupini ja ta
Dhatuvardani dha ta
Nāsikabhushini na sa
Kōsalam ka sa
Rasikapriya ra sa

`.split(/\s+/);


var hindi_names = `कनकांगि 	रत्नांगि 	गानमूर्ति 	वनस्पति 	मानवति 	तानरूपि 
सेनावति 	हनुमतोडि 	धेनुक 	नाटकप्रिय 	कोकिलप्रिय 	रूपवति 
गायकप्रियं 	वकुळाभरणं 	मायामाळवगौळ 	चक्रवाकं 	सूर्यकांतं 	हटकांबरि 
झंकारध्वनि 	नटभैरवि 	कीरवाणि 	खरहरप्रिय 	गौरीमनोहरि 	वरुणप्रिय 
माररंजनि 	चारुकेशि 	सरसांगि 	हरिकांभोजि 	धीरशंकराभरणं 	नागानंदिनि 
यागप्रिय 	रागवर्धनि 	गांगेयभूषिणि 	वागधीश्वरि 	शूलिनि 	चलनाट 
सालगं 	जलार्णवं 	झालवराळि 	नवनीतं 	पावनि 	रघुप्रिय 
गवांबोधि 	भवप्रिय 	शुभपंतुवराळि 	षड्वितमार्गिणि 	सुवर्णांगि 	दिव्यमणि 
धवळांबरि 	नामनारायणि 	कामवर्धिनि 	रामप्रिय 	गमनश्रम 	विश्वंभरि 
श्यामलांगि 	षण्मुखप्रिय 	सिंहेंद्रमध्यम 	हेमवति 	धर्मवति 	नीतिमति 
कांतामणि 	रिषभप्रिय 	लतांगि 	वाचस्पति 	मेचकळ्याणि 	चित्रांबरि 
सुचरित्र 	ज्योतिस्वरूपिणि 	धातुवर्धिनि 	नासिकाभूषिणि 	कोसलमु 	रसिकप्रिय`.split(/\s+/);


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

	notes += rg[quotient% rg.length];
	if (index <= 36)
	    notes += " M1 P ";
	else
	    notes += " M2 P ";
	notes += dn[remainder] ;

	let vals = n1.toString() + " + " + n2.toString() + '*10 = ' + index;

	markup = '<tr><td>' + index + '</td>' +
	    '<td>' + names[i] + " " + hindi_names[i/3] + '</td>' +
	    '<td>' +  nums + '</td>' +
	    '<td>' + vals +  '</td>' +
	    '<td>' + notes + '</td>' +
	    '<td>' + chakras[quotient] + "</td>" +
	    '</tr>';

	
	
	tbody.append(markup);
    }
    
});
