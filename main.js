function openNav() {
	document.getElementById("open").style.display = "none";
	document.getElementById("nav").style.width = "100vw";
	document.getElementById("title").style.display = "none";
}

function closeNav() {
	document.getElementById("nav").style.width = "0";
	document.getElementById("open").style.display = "block";
	document.getElementById("title").style.display = "block";
	document.getElementById("open").style.display = "inline-block";
}
