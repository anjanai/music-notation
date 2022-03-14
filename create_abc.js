function srg2abc(data) {
    if (! data) data =  $("#txt_srg").val();
    else $("#txt_srg").val(data);
    let srg = data.split("\n");
    let url = "https://editor.drawthedots.com/?t=" + encodeURIComponent(create_abc(srg));
    $('#iframe').attr('src', url);
}

$(document).ready(function () {
    fetch("example.srg").then(response => response.text())
	.then(data => srg2abc(data));
});

