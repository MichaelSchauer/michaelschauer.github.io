function openNav() {
	document.getElementById("open").style.display="none";
	document.getElementById("nav").style.width="100vw";
	document.getElementById("navbar").style.display="none";
	document.getElementById("title").style.display="none";
}

function closeNav(){
	document.getElementById("nav").style.width="0";	
	document.getElementById("open").style.display="block";
	document.getElementById("navbar").style.display="block";
	document.getElementById("title").style.display="block";
}

function show(){
	document.getElementById("stundenwh").style.height="auto";
	document.getElementById("stundenwh").style.opacity="1";
	document.getElementById("button").style.display="none";
	document.getElementById("button2").style.display="block"	
	document.getElementById("hrothers").style.display="block"
}

function hide(){
	document.getElementById("stundenwh").style.height="0";
	document.getElementById("stundenwh").style.opacity="0";
	document.getElementById("button2").style.display="none";
	document.getElementById("button").style.display="block";
	document.getElementById("hrothers").style.display="none"	
}

function snapcodeshow(){
	document.getElementById("snapcode").style.display="block";
	document.getElementById("content").style.background="black";
	document.getElementById("content").style.filter="blur(5px)";
	document.getElementById("content").style.background="#f1f1f1";
}

function snapcodeclose(){
	document.getElementById("snapcode").style.display="none";
	document.getElementById("content").style.filter="blur(0px)";
	document.getElementById("content").style.background="#f1f1f1";
}

function zufall() {

    var zahl = document.getElementById ("ende").value;
    var zahl1 =parseInt(zahl);
    var zahl2 = document.getElementById ("anfang").value;
    var zahl3 =parseInt(zahl2);
    var a = zahl3 + (zahl1-zahl3)*(Math.random());
      a = Math.round(a);
    var xyz = document.getElementById ("ergebnis");
    xyz.innerHTML = a 
;}