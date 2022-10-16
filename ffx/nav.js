function nav(section){
  if (section == 1){
    remclasstext();
    remclassicon();
    //change text color
    document.getElementById("navtext1").style.color = "#FF9F0A"
    $('#navicon1').css( "filter", "invert(84%) sepia(39%) saturate(6488%) hue-rotate(350deg) brightness(101%) contrast(106%)")
    console.log("1")
   //change icon color
  }

  if (section == 2){
    remclasstext();
    remclassicon();
    document.getElementById("navtext2").style.color = "#FF9F0A"
    $('#navicon2').css( "filter", "invert(84%) sepia(39%) saturate(6488%) hue-rotate(350deg) brightness(101%) contrast(106%)")
    console.log("2")
   }

  if (section == 3){
    remclasstext();
    remclassicon();
    document.getElementById("navtext3").style.color = "#FF9F0A"
    $('#navicon3').css( "filter", "invert(84%) sepia(39%) saturate(6488%) hue-rotate(350deg) brightness(101%) contrast(106%)")
    console.log("3")
  }

  if (section == 4){
    remclasstext();
    remclassicon();
    document.getElementById("navtext4").style.color = "#FF9F0A"
    $('#navicon4').css( "filter", "invert(84%) sepia(39%) saturate(6488%) hue-rotate(350deg) brightness(101%) contrast(106%)")
    console.log("4")
  }
}

function remclasstext(){
    document.getElementById("navtext1").style.color = "white";
    document.getElementById("navtext2").style.color = "white";
    document.getElementById("navtext3").style.color = "white";
    document.getElementById("navtext4").style.color = "white";
}

function remclassicon(){
  document.getElementById("navicon1").style.filter = "invert(1)";
  document.getElementById("navicon2").style.filter = "invert(1)";
  document.getElementById("navicon3").style.filter = "invert(1)";
  document.getElementById("navicon4").style.filter = "invert(1)";
}