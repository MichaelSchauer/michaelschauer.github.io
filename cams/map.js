document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([48.099399, 14.250617], 8.5);
  
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
    
    // L.marker([49.005, -1.95]).addTo(map)
    //   .bindPopup('Mont St Michel.')
    //   .openPopup();
    
    // var popup = L.popup();
    // function onMapClick(e) {
    //   popup
    //       .setLatLng(e.latlng)
    //       .setContent("You clicked at " + e.latlng.toString())
    //       .openOn(map);
    // }
  
    // map.on('click', onMapClick);

    // var marker = L.marker([48.337796, 14.205510],{title: "Title" }  ).addTo(map);
    // marker.bindPopup("This is popup content");
    // marker.on('click', onClick);
    var myIcon = L.icon({
        iconUrl: 'res/dot.svg',
        iconSize: [24, 24],
        iconAnchor: [0, 0],
        popupAnchor: [0, -20],
    });
    d3.json("res/stations.json").then(function(data) {
        console.log(data)
        for(var i = 0; i < data.length; i++){
            var lon = data[i].lon;
            var lat = data[i].lat;
            var img = data[i].url;
            var name = data[i].name;
            var marker = L.marker([lon, lat],{icon: myIcon}  ).addTo(map);
            marker.bindPopup("<div>"+name+"<div>");
            marker.on('click', onClick);

        }
    })  
    function onClick(e) {
        var popup = e.target.getPopup();
        var content = popup.getContent();
        map.setView(e.target.getLatLng());
        console.log(content);
    }
  
  });



 function addMarkers(){
    d3.json("res/stations.json").then(function(data) {
        console.log(data)
        for(var i = 0; i < data.length; i++){
            var lon = data[i].lon;
            var lat = data[i].lat;
            var img = data[i].url;
            var name = data[i].name;
            var marker = L.marker([lon, lat],{title: "Cam" }  ).addTo(map);
            marker.bindPopup("<div>"+name+"<div>");
            marker.on('click', onClick);

        }
    })
 }