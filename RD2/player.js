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
    $('#playerwrap').append('<div id="filter" onclick="filtervisibility()"><button id="filterbtn"><img src="resources/filter.svg"></button></div>' +
   ' <div id="filteroptions" style="display: none;"><button class="filteropt" onclick="filter(at)">Österreich</button><button class="filteropt" onclick="filter(de)">Deutschland</button><button class="filteropt" onclick="filter(gb)">Großbritannien</button><button class="filteropt" onclick="filter(us)">USA</button></div>'
    );

    $('#playerwrap').append('<div id="playerlist"></div>')

    for (var i = 0; i < stationsjson.length; i++){
      var name = stationsjson[i].name;
      url = stationsjson[i].url;
      var dest = stationsjson[i].dest;
      var icon = stationsjson[i].icon;
      $("#playerlist").append('<div class="station" onclick="play('+i+')"><div class="playstation"><img id="iconstation" src="'+icon+'"></div><div class="stationdesc"><div class="stationdescname">'+name+'</div><div class="stationdesccountry">'+dest+'</div></div></div>')
    }
  } 

var audio = "";
var currenttrack = '';
var currentstation = '';
var intervalexists = 0;
function play(station){
  //clear interval
   /* if(intervalexists == 1) {
      clearInterval(interval);
    }
    intervalexists = 1; */
    currentstation = station;
    audio.src = "";
    audio.currentTime = 0;
    audio = new Audio(stationsjson[station].url);
    audio.id = 'webaudio'
    $('#webaudio').attr("type","audio/mpeg")
    currenttrack = stationsjson[station].url;
    audio.id = "nowplaying"; 
    audio.load();
    audio.play();

    /*//refresh time interval
    getTime(stationsjson[station].timelocation)
    const interval = setInterval(function() {
      //Count time
      sstation ++;
      
      if (sstation > 59){
        sstation = 0
        mstation ++;
      }
      if (mstation > 59){
        mstation = 0
        hstation ++;
      }
      if (hstation > 23){
        hstation = 0;
      }
      console.log(hstation+":"+mstation+":"+sstation)
    }, 1000); */

  //MediaSession
  if ('mediaSession' in navigator) {
    const player = audio; //define player
    navigator.mediaSession.metadata = new MediaMetadata({
    title: stationsjson[station].name,
    artist: stationsjson[station].dest,
    album: "",
    artwork: [
        { src: stationsjson[station].icon, type: 'image' }
    ]
    });
    navigator.mediaSession.setActionHandler('play', () => player.play());
    navigator.mediaSession.setActionHandler('pause', () => player.pause());
    navigator.mediaSession.setActionHandler('previoustrack', function() {
      var nextstation = Number(currentstation - 1)
      play(nextstation)
    });
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      var prevstation = Number(currentstation + 1)
      play(prevstation)
    });
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      player.currentTime = audio.currentTime - (details.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      player.currentTime = audio.currentTime + (details.seekOffset || 10);
    });
    }

    $('#h2radiop').html("Laden...");
    $('#name').html("");

    $('#playbuttonicon').attr("src", "resources/pause.svg");//change icons

    audio.onloadeddata = function() {
      $('#h2radiop').html(stationsjson[station].name);
      $('#name').html(stationsjson[station].dest);
    };

  }

  function playpause(){

      if (audio.duration > 0 && !audio.paused) {
        //audio playing
        $('#playbuttonicon').attr("src", "resources/spiel.svg");//change icons
        audio.pause() 
      } else {
        //audio not playing
        $('#playbuttonicon').attr("src", "resources/pause.svg");//change icons
        audio.play()
      }
  }

  //volume
  window.SetVolume = function(val){
      audio.volume = val / 100;
  }

//filter


function filtervisibility(){
    if($('#filteroptions').css('display') == 'none'){
      $("#filteroptions").show(100);
      $("#playerlist").hide(100);
    } else {
      $("#filteroptions").hide(100);
      $("#playerlist").show(100);
    }
}

//Countryvariables
var at = "AT"
var de = "DE"
var gb = "GB"
var us = "US"
function filter(countrycode){
  $(".station").remove();

  console.log(countrycode)
  for (var i = 0; i < stationsjson.length; i++){
    if (stationsjson[i].country == countrycode){
      var name = stationsjson[i].name;
      url = stationsjson[i].url;
      var dest = stationsjson[i].dest;
      var icon = stationsjson[i].icon;
      $("#playerlist").append('<div class="station" onclick="play('+i+')"><div class="playstation"><img id="iconstation" src="'+icon+'"></div><div class="stationdesc"><div class="stationdescname">'+name+'</div><div class="stationdesccountry">'+dest+'</div></div></div>')
    }
  }
  filtervisibility();
}

var hstation = "";
var mstation = "";
var sstation = "";
function getTime(timelocation){
  var timeapiurl = "http://worldtimeapi.org/api/timezone/" + timelocation;
  console.log(timeapiurl)
  $.ajax({
    url: timeapiurl,
    type: "GET",
    dataType: "json",
    success: function (data) {
      //console.log(data);
      var tnew = data.datetime
      var timehours = tnew.slice(11,16)

      //console.log ("Dateobject " + tnew)
      console.log("Lokalzeit des Senders: " + timehours);

      //timedifference
      hstation = ("0" + tnew.slice(11,13)).slice(-2)
      mstation = ("0" + tnew.slice(14,16)).slice(-2)
      sstation = ("0" + tnew.slice(17,19)).slice(-2)
      /*var differenceh = Number(hlocal) - Number(hstation)
      var differencem = Number(mlocal) - Number(mstation)
      //console.log(differenceh)
      //console.log(differencem) */  
    },
    error: function(){
      console.log("Error")
    }
  });
}