function banner() {
    setTimeout(
      function() {
        document.getElementById('bannerproof').style.display='none';
        document.getElementById('banner').style.display='flex';
        document.getElementById('disclaimerp').style.color='#636c75';
      }, 2000);
  }

function zoomin(){
    document.getElementById('cardcontainerwhite').style.width='90%';
    document.getElementById('cardcontainerwhite').style.height='95%';
    document.getElementById('slide').style.top='30px';
}