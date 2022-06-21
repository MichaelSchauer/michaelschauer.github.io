var stationsjson = "";
function loadJSON(){
    $.ajax({
    url: "stations.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      stationsjson = data;
      console.log(stationsjson);
      initialize()
    },
    error: function(){
      console.log("Error")
    }
  });
}


  var url ='';
  function initialize(){
    for (var i = 0; i < stationsjson.length; i++){
      var name = stationsjson[i].name;
      url = stationsjson[i].url;
      var dest = stationsjson[i].dest;
      var icon = stationsjson[i].icon;
      $("#playerwrap").append('<div class="station" onclick="play('+i+')"><div class="playstation"><img id="iconstation" src="'+icon+'"></div><div class="stationdesc"><div class="stationdescname">'+name+'</div><div class="stationdesccountry">'+dest+'</div></div></div>')
    }
  } 

  var audio = "";
  var currenttrack = '';
  function play(station){
      audio.src = "";
      audio.currentTime = 0;
      audio = new Audio(stationsjson[station].url);
      audio.id = 'webaudio'
      $('#webaudio').attr("type","audio/mpeg")
      currenttrack = stationsjson[station].url;
      audio.id = "nowplaying"; 
      audio.load();
      audio.play();
      $('#playbuttonicon').attr("src", "/resources/pause.svg");//change icons
            
      //Change Station name
      $('#h2radiop').html(stationsjson[station].name);
      $('#name').html(stationsjson[station].dest);
  }

  function playpause(){

      if (audio.duration > 0 && !audio.paused) {
        //audio playing
        $('#playbuttonicon').attr("src", "/resources/spiel.svg");//change icons
        audio.pause() 
      } else {
        //audio not playing
        $('#playbuttonicon').attr("src", "/resources/pause.svg");//change icons
        audio.play()
      }
  }

  //volume
  window.SetVolume = function(val){
      console.log('Before: ' + audio.volume);
      audio.volume = val / 100;
      console.log('After: ' + audio.volume);
  }

  //mediasession

  if('mediaSession' in navigator) {
    const player = audio;
  
    navigator.mediaSession.metadata = new MediaMetadata({
      title: stationsjson[station].name,
      artist: 'Radio',
      album: 'Made by Michael',
      artwork: [
        {
          src: stationsjson[station].icon,
          sizes: '256x256',
          type: 'image/jpeg'
        },
        {
          src: stationsjson[station].icon,
          sizes: '512x512',
          type: 'image/jpeg'
        }
      ]
    });
  
    navigator.mediaSession.setActionHandler('play', () => player.play());
    navigator.mediaSession.setActionHandler('pause', () => player.pause());

  }    
      