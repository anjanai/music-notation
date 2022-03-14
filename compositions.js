let compositions = [
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
    if (location.hostname === "localhost") compositions.push('test');
    for (let i in compositions) {
	let name=compositions[i];
	let a = `<li  class="list-group-item"><a title="Click to load ${name}"
	href="#${name}" onclick="loadsrg('${name}');return false;">${name}</a></li>`;
	$("#list").append(a);
    }    
});

function loadsrg(name) {
    fetch("harmonium/" + name + ".srg", {cache: "no-store"})
	.then(response => response.text())
	.then(data => showabc(create_abc(data.split("\n"))));
};

function showabc(data) {
    let url = "https://editor.drawthedots.com/?t=" + encodeURIComponent(data);
    window.open(url);
    //$('#iframe').attr('src', url);
}

function toggleImage() {
    $( "#popupImage" ).toggle();
}

    

