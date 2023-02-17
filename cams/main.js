function loadCams(){
    d3.json("res/stations.json").then(function(data_json) {
        console.log(data_json)
        for(var i = 0; i < data_json.length; i++){
            var url = JSON.stringify(data_json[i].url);
            var name = data_json[i].name;
            $("#list").append("<card><div class='image' style='background-image: url("+data_json[i].url+");' onclick='window.location = "+url+"'></div><p>"+name+"</p></card>");

            // <div class='image' style='background-image: url("+data_json[i].url+");' onclick='window.location = "+data_json[i].url+";></div>
        }
    })
   

}