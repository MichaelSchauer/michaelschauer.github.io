//Base Variables
const API_KEY = "775b9725cd124d28a2d44904210209";
//var longit = "48.437173"
//var latit = "14.150868"
var foreurl = "https://api.weatherapi.com/v1/forecast.json"

//Weather API Response Variables
var locname = "";
var temp_c = "";
var condition = "";
var icon = "";
var icon3 = "";
var icon6 = "";
var wind_kph = "";
var wind_dir = "";
var pressure_mb = "";
var precip_mm = "";
var cloud = "";
var uv = "";
var vis_km = "";
var maxtemp_c = "";
var mintemp_c = "";
var chance_of_rain = "";
var chance_of_snow = "";
var forecastsamedaycondition = "";
var sunrise = "";
var sunset = "";
var daynight = "";
var Temp3h = " ";
var Temp6h = " ";
var hour3 = " ";
var hour6 = " ";
var dayfor3 = "0" ;
var dayfor6 = "0" ;
var time3 = " ";
var time6 = " ";
var responsejson = " ";
var datenow = "";
var datetoday = "";
var timetoday = "";
var hournow = "";

//Convert 12H to 24H
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
        hours = '00';
    }
    
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours}:${minutes}`;
    }

    function loadContent(){
        getWeather_WeatherAPI()
    }

// Function for API Call
// Full Link Sample: https://api.weatherapi.com/v1/[Type Of Response ("forecast")].json&[Key]&[q(in form of "lon, lat")]&lang=[language("de")&days=[forecast for how many days("1")]]

function getWeather_WeatherAPI(){
    $.ajax({
        url: foreurl,
        json: "callback",
        data: {
            key: API_KEY,
            q: latit + "," + longit,
            //q: "linz",
            lang:"de",
            days: "2",
            aqi: "no",
        },
        success: function( responsejson ) {
            console.log( responsejson ); // server response
            //console.log (JSON.stringify(responsejson));

            //current
            locname = responsejson.location.name;
            console.log(locname);
            temp_c = Math.round(responsejson.current.temp_c) + " °C";
            console.log(temp_c);
            condition = responsejson.current.condition.text;
            console.log(condition);
            iconnow = responsejson.current.condition.icon.substr(responsejson.current.condition.icon.length - 7);
            //console.log(icon);
            wind_kph = Math.round(responsejson.current.wind_kph) + " km/h"
            //console.log(wind_kph);
            wind_dir = responsejson.current.wind_dir 
            //console.log(wind_dir);
            pressure_mb = responsejson.current.pressure_mb + " hPa"
            //console.log(pressure_mb);
            precip_mm = responsejson.current.precip_mm + " mm"
            //console.log(precip_mm);
            humidity = responsejson.current.humidity + " %"
            //console.log(humidity);
            cloud = responsejson.current.cloud + " %"
            //console.log(cloud);
            uv = responsejson.current.uv
            //console.log(uv);
            vis_km = responsejson.current.vis_km + " km"
            //console.log(vis_km);
            if (responsejson.current.is_day == 1) {
                daynight = "day";
            } else {
                daynight = "night";
            }
            //console.log(daynight);

            //forecast
            maxtemp_c = Math.round(responsejson.forecast.forecastday[0].day.maxtemp_c) + " °";
            //console.log(maxtemp_c);
            mintemp_c = Math.round(responsejson.forecast.forecastday[0].day.mintemp_c) + " °";
            //console.log(mintemp_c);
            chance_of_rain = responsejson.forecast.forecastday[0].day.daily_chance_of_rain + " %";
            //console.log(chance_of_rain);
            chance_of_snow = responsejson.forecast.forecastday[0].day.daily_chance_of_snow + " %";
            //console.log(chance_of_snow);
            forecastsamedaycondition = responsejson.forecast.forecastday[0].day.condition.text;
            //console.log(forecastsamedaycondition);
            sunrise = convertTime12to24(responsejson.forecast.forecastday[0].astro.sunrise);
            //console.log(sunrise);
            sunset = convertTime12to24(responsejson.forecast.forecastday[0].astro.sunset);
            //console.log(sunset);
            //Tempforecast


            datenow = new Date();
            var currenthour = datenow.getHours();
            hour3 = Number(currenthour) + 3;
            if (Number(currenthour) + 3 >= 24){
                dayfor3 = "1";
            }
            hour6 = Number(currenthour) + 6;
            console
            if (Number(currenthour) + 6 >= 24){
                dayfor6 = "1";
                hour6 = Number(currenthour) + 6 - 24
            }
            time3 = responsejson.forecast.forecastday[dayfor3].hour[hour3].time
            time3 = time3.slice(11,16)
            console.log("3H:" + time3)
            time6 = responsejson.forecast.forecastday[dayfor6].hour[hour6].time
            time6 = time6.slice(11,16)
            console.log("6H:" + time6)
            
            temp3h = responsejson.forecast.forecastday[dayfor3].hour[hour3].temp_c
            temp6h = responsejson.forecast.forecastday[dayfor6].hour[hour6].temp_c

            getDateToday()

            //Iconforecast
            icon3 = responsejson.forecast.forecastday[dayfor3].hour[hour3].condition.icon.substr(responsejson.current.condition.icon.length - 7);
            console.log("3H: " + icon3)
            icon6 = responsejson.forecast.forecastday[dayfor6].hour[hour6].condition.icon.substr(responsejson.current.condition.icon.length - 7);
            console.log("6H: " + icon6)
            writeCallbackVAR()
            quote()
        }
    });
}

function getDateToday(){
    datenowtime = new Date();
    const month = datenowtime.toLocaleString('default', { month: 'long' });
    const daynow = datenowtime.toLocaleString('default', { day: '2-digit' });
    const year = datenowtime.toLocaleString('default', { year: 'numeric' });
    hournow = String(datenowtime).slice(15,18);
    var minutesnow = String(datenowtime).slice(19,21);
    datetoday = daynow + ". " + month + " " + year;
    timetoday= hournow + ":" + minutesnow;
    document.getElementById("timep").innerHTML= timetoday;
}

function writeCallbackVAR(){
    document.getElementById("descriptionp").innerHTML= condition;
    //Tempnow
    document.getElementById("forecastthreetemp").innerHTML= temp3h;
    document.getElementById("forecastsixtemp").innerHTML= temp6h;
    document.getElementById("forecastnowtemp").innerHTML= temp_c;
    document.getElementById("forecastthreetime").innerHTML= time3;
    document.getElementById("forecastsixtime").innerHTML= time6;
    document.getElementById("tempmaxp").innerHTML= maxtemp_c;
    document.getElementById("tempminp").innerHTML= mintemp_c;
    document.getElementById("datep").innerHTML= datetoday;

    document.getElementById("uv").innerHTML= uv;
    document.getElementById("range").innerHTML= vis_km;
    document.getElementById("clouds").innerHTML= cloud;
    document.getElementById("precipation").innerHTML= precip_mm;
    document.getElementById("humidity").innerHTML= humidity;
    document.getElementById("wind").innerHTML= wind_kph;
    //icons
    var iconurlnow = "resources/weather/icons/" + daynight + "/" + iconnow;
    $('#weatherdataiconimgnow').attr('src', iconurlnow);
    var iconurl3 = "resources/weather/icons/" + daynight + "/" + icon3;
    $('#weatherdataiconimg3').attr('src', iconurl3);
    var iconurl6 = "resources/weather/icons/" + daynight + "/" + icon6;
    $('#weatherdataiconimg6').attr('src', iconurl6);
}

function quote(){
    if (hournow < 5){
        document.getElementById("quotep").innerHTML= "Gute Nacht";
        console.log("Gute Nacht")
        }if (hournow < 10 && hournow >= 5){
            document.getElementById("quotep").innerHTML= "Guten Morgen";
            console.log("Guten Morgen")
        }     if (hournow < 13 && hournow >= 10){
                document.getElementById("quotep").innerHTML= "Mahlzeit";
                console.log("Mahlzeit")
            }   if (hournow < 18 && hournow >= 13){
                document.getElementById("quotep").innerHTML= "Schönen Nachmittag";
                console.log("Schönen Nachmittag")
                    }if (hournow < 22 && hournow >= 18){
                    document.getElementById("quotep").innerHTML= "Guten Abend";
                    console.log("Guten Abend")
                        } if (hournow < 24 && hournow >= 22){
                        document.getElementById("quotep").innerHTML= "Gute Nacht";
                        console.log("Gute Nacht")
                        }
}

setInterval(function(){ 
    getDateToday()   
}, 1000);

//?key=775b9725cd124d28a2d44904210209