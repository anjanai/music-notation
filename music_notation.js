const keys = "C, C#, D, D#, E, F, F#, G, G#, A, A#, B".replace(/ /g, "").split(',');


function create_ABCJS (key, i_array) {
    // number of steps to transpose from C.
    // key has to be one of: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
    let transpose = keys.indexOf(key);
    
    for (let i of i_array) {
	new ABCJS.Editor("abc-text" + i,
			 { paper_id: "notation" + i,
			   generate_warnings: true,
			   warnings_id:"warnings" + i,
			   synth: {
			       el: "#play" + i,
			       options: {
				   displayLoop: true,
				   displayRestart: true,
				   displayPlay: true,
				   displayProgress: true,
				   displayWarp: true,
				   midiTranspose: transpose,
			       }
			   },
			   abcjsParams: {
			       generateDownload: true,
			       downloadLabel:"Download MIDI",
			       visualTranspose: transpose,
			   }
			 });
	
    }
}

