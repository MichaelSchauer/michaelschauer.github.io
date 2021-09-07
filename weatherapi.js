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

//Var Sunposition
var sunpercent = "";

//Air Quality
var humidity = "";
var co = "";
var no2 = "";
var o3 = "";
var so2 = "";
var pm2_5 = "";
var pm10 = "";
var gb_defra_index = "";

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
    
function sunposition(){
    var now = String(new Date());
    var minutessunrise = parseInt(String(sunrise.slice(0,2))) * 60 + parseInt(String(sunrise.slice(3,5)));
    var minutessunset = parseInt(String(sunset.slice(0,2))) * 60 + parseInt(String(sunset.slice(3,5)));
    var minutesnow = now.slice(16,18) + now.slice(19,21);
    var minutesnow = parseInt(now.slice(16,18)) * 60 + parseInt(now.slice(19,21));
    var minutesday = minutessunset - minutessunrise;
    var minutesleft = minutessunset - minutesnow;
    sunpercent = String(Math.round(100 - (minutesleft / minutesday)*100) + "%");
    console.log (sunrise + " Sonnenaufgang");
    console.log (sunset + " Sonnenuntergang");


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
            days: "1",
            aqi: "yes",
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
            icon = responsejson.current.condition.icon.substr(responsejson.current.condition.icon.length - 7);
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
            maxtemp_c = Math.round(responsejson.forecast.forecastday[0].day.maxtemp_c) + " °C";
            //console.log(maxtemp_c);
            mintemp_c = Math.round(responsejson.forecast.forecastday[0].day.mintemp_c) + " °C";
            //console.log(mintemp_c);
            chance_of_rain = responsejson.forecast.forecastday[0].day.daily_chance_of_rain + " %";
            //console.log(chance_of_rain);
            chance_of_snow = responsejson.forecast.forecastday[0].day.daily_chance_of_snow + " %";
            //console.log(chance_of_snow);
            forecastsamedaycondition = responsejson.forecast.forecastday[0].day.condition.text;
            //console.log(forecastsamedaycondition);
            sunrise = convertTime12to24(responsejson.forecast.forecastday[0].astro.sunrise);
            console.log(sunrise);
            sunset = convertTime12to24(responsejson.forecast.forecastday[0].astro.sunset);
            console.log(sunset);

            //air quality
            co = responsejson.current.air_quality.co.toFixed(2) + " μg/m3"
            o3 = responsejson.current.air_quality.o3.toFixed(2) + " μg/m3"
            no2 = responsejson.current.air_quality.no2.toFixed(2) + " μg/m3"
            so2 = responsejson.current.air_quality.so2.toFixed(2) + " μg/m3"
            pm2_5 = responsejson.current.air_quality.pm2_5.toFixed(2) + " μg/m3"
            pm_10 = responsejson.current.air_quality.o3.toFixed(2) + " μg/m3"
            gb_defra_index = responsejson.current.air_quality["gb-defra-index"];
            writeCallbackData()
            sunposition();
        }
    });
}

//?key=775b9725cd124d28a2d44904210209