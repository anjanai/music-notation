let compositions = [
    './harmonium/kafi.abc',
];

soMany = 22;
console.log(`This is ${soMany} times easier!`);

$(document).ready(function () {
    for (let i in compositions) {
	let a = `<li><a id="comp${i}" title="Click to load ${compositions[i]}"
	href="#comp${i}" onclick="loadabc(${i});return false;">${compositions[i]}</a></li>`;
	$("#list").append(a);
    }
});

function loadabc(i) {
    fetch(compositions[i])
    .then(response => response.text())
    .then(data => showabc(data));
};

function showabc(data) {
    let url = "https://editor.drawthedots.com/?t=" + encodeURIComponent(data);
    window.open(url);
}

    

