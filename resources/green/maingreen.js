//#############################################################//
//Adjust Values to fit the Person who uses the APP

const clientname = 'Max Mustermann'; 
const birthday = '11.11.2000'

//#############################################################//
function bannername() {
    document.getElementById('namep').innerHTML = clientname;
    document.getElementById('birthday').innerHTML = birthday;
    document.getElementById('namepslide').innerHTML = clientname;
    document.getElementById('birthdayslide').innerHTML = birthday;
    setTimeout(
      function() {
        document.getElementById('bannerproof').style.display='none';
        document.getElementById('banner').style.display='flex';
        document.getElementById('disclaimerp').style.color='#636c75';
      }, 2000);
  }

function zoomin(){
    document.getElementById('cardcontainerwhite').style.transform='scale(95%)';
    document.getElementById('cardcontainerwhite').style.filter='brightness(75%)';
    document.getElementById('slide').style.top='30px';
    document.getElementById('cardcontainerwhite').style.borderRadius='18px';
    document.getElementById('cardwrap').style.borderRadius='18px';
    document.getElementById('closeslide').style.top='30px';
    document.getElementsByTagName('body')[0].style.overflow = "auto";
}

function closeslide(){
  document.getElementById('cardcontainerwhite').style.transform='scale(100%)';
  document.getElementById('cardcontainerwhite').style.filter='brightness(100%)';
  document.getElementById('slide').style.top='100vh';
  document.getElementById('cardcontainerwhite').style.borderRadius='0px';
  document.getElementById('cardwrap').style.borderRadius='0px';
  document.getElementsByTagName('body')[0].style.overflow = "hidden";

}

function closeslide2(){
  document.getElementById('cardcontainerwhite').style.transform='scale(100%)';
  document.getElementById('cardcontainerwhite').style.filter='brightness(100%)';
  document.getElementById('slideimp').style.top='100vh';
  document.getElementById('cardcontainerwhite').style.borderRadius='0px';
  document.getElementById('cardwrap').style.borderRadius='0px';
  document.getElementsByTagName('body')[0].style.overflow = "hidden";
  //document.getElementById("closeslide").onclick = "closeslide()";
}

function slideimp(){
  document.getElementById('cardcontainerwhite').style.transform='scale(95%)';
  document.getElementById('cardcontainerwhite').style.filter='brightness(75%)';
  document.getElementById('slideimp').style.top='30px';
  document.getElementById('cardcontainerwhite').style.borderRadius='18px';
  document.getElementById('cardwrap').style.borderRadius='18px';
  document.getElementById('closeslide').style.top='30px';
  document.getElementsByTagName('body')[0].style.overflow = "auto";
  //document.getElementById("closeslide").onclick = "closeslide()";
}