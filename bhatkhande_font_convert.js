function tr(input, search, replace) {
    let translationMap = {};
    let searchArray = search.split(" ");
    let replaceArray = replace.split(" ");

    input = input.replaceAll('ü','');
    input = input.replaceAll('û','');
    
    searchArray.forEach((char, index) => {
        translationMap[char] = replaceArray[index] || char;
    });

    console.log (translationMap);
    
    return input
        .split("")
        .map(char => translationMap[char] !== undefined ? translationMap[char] : char)
        .join("");
}

var english = "A C D E F L M N O P Q S T U W Z a b c e f h i j k l m o p q r s u x z § ¨ ± ´ Â Ã Æ Ç É Ë Ì Í Î Ï Ð Ñ Ò Ô Õ × å æ ë Å þ Ä ð";


// "ë ì ï ð û ü þ";
var hindi = "अ इ ई उ ऊ ए क छ ट ठ ड द फ र ह ख् ग् घ् च् ज् झ् ण् त् थ् ध् न् प् ब् भ् म् य् ल् व् स् श् त्र् त्त् द्य् श्र् रु रू ँ ं ा ि ि ि ि ी ी ु ु ू ू ृ े ै ्र ऽ ऺ ़ ँ";

function convertFont() {
    $.get('bhatkhande_lyrics.txt', function(str) {
	//str = "ÌlÉkÉÅmÉ";
	let conv = tr(str, english, hindi);
	conv2 = conv.replaceAll('्ा','');
	conv2 = conv2.replaceAll('ाै', 'ौ');
	conv2 = conv2.replaceAll('ाे', 'ो');
	conv2 = conv2.replaceAll("एे", 'ऐ');
	conv2 = conv2.replaceAll("अा", 'आ');

	conv2 = conv2.replaceAll(/ि([\u0900-\u097F])/ug,"$1ि");
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
