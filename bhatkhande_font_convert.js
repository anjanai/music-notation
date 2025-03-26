function tr(input, search, replace) {
    let translationMap = {};
    let searchArray = search.split(" ");
    let replaceArray = replace.split(" ");

    input = input.replaceAll('ü','');
    input = input.replaceAll('û','');

    input = input.replaceAll('ÌÄlÉ', "िऩ");
    input = input.replaceAll('xÉÇÉ', 'xÉÉÇ');
        
    searchArray.forEach((char, index) => {
        translationMap[char] = replaceArray[index] || char;
    });
    
    return input
        .split("")
        .map(char => translationMap[char] !== undefined ? translationMap[char] : char)
        .join("");
}

var english = "A C D E F G L M N O P Q R S T U W Z a b c e f h i j k l m o p q r s u w x z § ¨ ± ´ Â Ã Æ Ç É Ë Ì Í Î Ï Ð Ñ Ò Ô Õ × å æ ë Å þ Ä ð ï ì ç ¹ ² ³ © µ ¸ ¥ ® ª £ Y ¼";
var hindi =   "अ इ ई उ ऊ ऋ ए क छ ट ठ ड ढ द फ र ह ख् ग् घ् च् ज् झ् ण् त् थ् ध् न् प् ब् भ् म् य् ल् व् ष् स् श् त्र् त्त् द्य् श्र् रु रू ँ ं ा ि ि ि ि ी ी ु ु ू ू ृ े ै ्र ऽ ऺ ़ ँ र् ्र ् ष्ट द्व न्न् द्म श्व ष्ठ ज्ञ् द्ध द्ग क्त क् ह्म";



function convertFont() {
    $.get('bhatkhande_lyrics.txt', function(str) {
	//str = "mÉÉMü  2ÉeSå ";
	let conv = tr(str, english, hindi);
	conv2 = conv.replaceAll('्ा','');
	conv2 = conv2.replaceAll('ाै', 'ौ');
	conv2 = conv2.replaceAll('ाे', 'ो');
	conv2 = conv2.replaceAll("एे", 'ऐ');
	conv2 = conv2.replaceAll("अा", 'आ');
	conv2 = conv2.replaceAll("अो", 'ओ');
	conv2 = conv2.replaceAll("अौ", 'औ');
	conv2 = conv2.replaceAll("स्ंाा", "सां");
	conv2 = conv2.replaceAll(/ि([\u0915-\u0939])/ug,"$1ि");  
	conv2 = conv2.replaceAll(/़([\u0915-\u0939])/ug,"$1़");
	conv2 = conv2.replaceAll(/([\u0915-\u0939])र्/ug,"र्$1");
	
	//console.log (conv, conv2);
	saveTextAsFile(conv2, "Bhatkhande_Lyrics.txt");
	$("#msg").text("Converted! Please check your Downloads folder.");
    }, 'text');
    

    
    
    
}

function saveTextAsFile(text, filename, type = "text/plain") {
    Object.assign(document.createElement('a'), {
         download: filename,
         href: URL.createObjectURL(new Blob([text], { type }))
    }).click();
}

window.addEventListener("load", convertFont, false);
