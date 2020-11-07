var notes = 'S r g m P d n'.split(' ');

var scales = [];
var derived_scales = [];

function combinations(array) {
  return new Array(1 << array.length).fill().map(
    (e1, i) => array.filter((e2, j) => i & 1 << j));
}

function toScale(n) {
    let notes = 'R G M D N'. split(' ');
    let bin = 0;
    let rem, i = 1, step = 1;
    let index=notes.length-1;
    let x = n;
    while (x != 0) {
        rem = x % 2;
	if (rem) {
	    notes[index] = notes[index].toLowerCase();
	}
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
	index--;
    }
    notes.splice(0, 0, "S");
    notes.splice(4, 0, "P");
    scales.push(notes);
    return notes.join(" ");
}

function createScales(n, ol) {
    switch (n) {
    case 7:
	for (let i=0; i<32; i++) {
	    $(ol).append( '<li>' + toScale(i) + '</li>');
	}
	break;

    case 5:
    case 6:
	for (let i=0; i<32; i++) {
	    notes = scales[i].join(' ');
	    //$(ol).append("<h6>From " + notes + ':</h6>');
	    combos = combinations(scales[i]).filter(a => a.length == n);
	    for (let scale of combos) {
		if (scale[0] != "S") continue;
		str = scale.join( " ");
		if (derived_scales.includes(str)) continue;
		derived_scales.push(str);
		if (str.toLowerCase().indexOf('m') < 0 &&
		    str.toLowerCase().indexOf('p') < 0)
		    str += " (No M/P)"
		$(ol).append('<li>' + str + '</li>');
	    }

	}
    }
}

$(document).ready(function () {
    createScales(7, "#sampoorna");
    createScales(6, "#shadav");
    createScales(5, "#audav");
});
