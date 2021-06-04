var scale = `X: raag_indra
T: Raag Indra : scale
L: 1/4
R: Kavi Iyer
K: Cdor % C doria(ga, ni komal)
C E F G B c | c B G F E C
w: Sa ga ma Pa ni Sa | Sa ni Pa ma Re sa
`;


var tarana = `X: raag_indra_tarana
T: Raag Indra : Tarana in drut teentaal
L: 1/4
M: 4/4
Q:1/4=180
R: Kavi Iyer
K: Cdor % C doria(ga, ni komal)
z z z z | |: C D2 C | B, G, C B,  | G B G F | 
w:        s r s | n p s n | p n p m | p
w: त नोम त | द रे दा नी ना दिर दिर त | नोम
% 
G4 | :|
w: p
w: नोम
`;

function loadNotation() {
    document.getElementById("abc-text1").value = scale;
    document.getElementById("abc-text2").value = tarana;
}    


function initEditors() {
    new ABCJS.Editor("abc-text1", { paper_id: "notation1",
				    synth: {
					el: "#play1",
					options: { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true }
				    },
				    generate_warnings: true,
				    warnings_id:"warnings1",
				    abcjsParams: {
					generateDownload: true,
					
				    }
				  });

    new ABCJS.Editor("abc-text2", { paper_id: "notation2",
				    synth: {
					el: "#play2",
					options: { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true }
				    },
				    generate_warnings: true,
				    warnings_id:"warnings2",
				    abcjsParams: {
					generateDownload: true,
					
				    }
				  });
}



window.addEventListener("load", initEditors, false);

