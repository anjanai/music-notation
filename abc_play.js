
var abc = "T: Cooley's\n" +
    "M: 4/4\n" +
    "L: 1/8\n" +
    "R: reel\n" +
    "K: Emin\n" +
    "|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\n" +
    "EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\n" +
    "|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\n" +
    "eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|";

function load() {
    // NOTE: If you want just the sound without showing the music, use "*" instead of "paper" in the renderAbc call.
    var visualObj = ABCJS.renderAbc("*", abc)[0];
    
    // This object is the class that will contain the buffer
    var midiBuffer;
    
    var startAudioButton = document.querySelector(".play");
    var stopAudioButton = document.querySelector(".stop");

    startAudioButton.addEventListener("click", function() {

	startAudioButton.setAttribute("style", "display:none;");
	stopAudioButton.setAttribute("style", "");
	
	var audioContext = new window.AudioContext();
	audioContext.resume().then(function () {
	    midiBuffer = new ABCJS.synth.CreateSynth();
	    
	    return midiBuffer.init({
		visualObj: visualObj,
		audioContext: audioContext
	    }).then(function (response) {
		return midiBuffer.prime();
	    }).then(function () {
		midiBuffer.start();
		return Promise.resolve();
	    }).catch(function (error) {
		alert("synth error", error);
	    });
	});
	
    });

    stopAudioButton.addEventListener("click", function() {
	startAudioButton.setAttribute("style", "");
	stopAudioButton.setAttribute("style", "display:none;");
	if (midiBuffer)
	    midiBuffer.stop();
    });
}
