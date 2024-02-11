let my_compositions = `example
patdeep_babhana
bhairav_ab-to
bairagi_savariya`.split(/\s+/);
				      
let harmonium_compositions = [
    'yaman_chatgpt',
    'kafi',
    'malkauns_kaari-kaari',
    'gavati',
    'bairagi_gat',
    'vachaspati_gat',
    'bhoop_jaya-deva',
    'bairagi_saghana-bana',
    'maru-bihag_begi',
    'multani_sundar',
    'sarang_gat',
    'bihag_chhumak',
];

$(document).ready(function () {
    $( "#popupImage" ).hide();
    const urlParams = new URLSearchParams(window.location.search);
    let comp = urlParams.get("get");
    if (comp) loadsrg(comp);
    if (location.hostname === "localhost") my_compositions.push('test');
    for (let name of my_compositions.sort()) 
	$("#others").append(
	    `<li  class="list-group-item"><a title="Click to load ${name}"
	href="#${name}" onclick="loadsrg('${name}');return false;">${name}</a></li>`);

    
    for (let name of harmonium_compositions.sort()) 
	 $("#harmonium").append(
	     `<li  class="list-group-item"><a title="Click to load ${name}"
	href="#${name}" onclick="loadsrg('${name}');return false;">${name}</a></li>`);
    
});

function tanpura() {
    let tanpura = $('#tanpura')[0];
    tanpura[tanpura.paused ? 'play' : 'pause']();
}

function loadsrg(name) {
    let tanpura = document.getElementById('tanpura');
    tanpura.volume=0.6;
    tanpura.play();
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

    

