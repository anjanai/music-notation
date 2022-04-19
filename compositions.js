let my_compositions = `example
patdeep_babhana`.split(/\s+/);
				      
let harmonium_compositions = [
    'kafi',
    'malkauns_kaari-kaari',
    'gavati',
];

$(document).ready(function () {
    toggleImage();
    const urlParams = new URLSearchParams(window.location.search);
    let comp = urlParams.get("get");
    if (comp) {
	loadsrg(comp);
	return false;
    }
    if (location.hostname === "localhost") my_compositions.push('test');
     for (let name of my_compositions.concat(harmonium_compositions)) {
	let a = `<li  class="list-group-item"><a title="Click to load ${name}"
	href="#${name}" onclick="loadsrg('${name}');return false;">${name}</a></li>`;
	$("#list").append(a);
    }    
});

function tanpura() {
    let tanpura = $('#tanpura')[0];
    tanpura[tanpura.paused ? 'play' : 'pause']();
}

function loadsrg(name) {
    let tanpura = document.getElementById('tanpura');
    tanpura.volume=0.6;
    tanpura.play();
    console.log ("playing");
    if (harmonium_compositions.includes(name))
	name = "harmonium/" + name ;
    name += ".srg";
    console.log (name);
    fetch(name, {cache: "no-store"})
	.then(response => response.text())
	.then(data => showabc(create_abc(data.split("\n"))));
};

function showabc(data) {
    let url = "https://editor.drawthedots.com/?t=" + encodeURIComponent(data);
    window.open(url);
}

function toggleImage() {
    $( "#popupImage" ).toggle();
}

    

