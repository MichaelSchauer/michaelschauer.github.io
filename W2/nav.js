
/*window.onscroll = function (e) {
  console.log(window.scrollY); // Value of scroll Y in px
};*/

function loadApp(){
  $("#search").hide();
  $("#section_map").hide();
  $("#section_forecast").show();
  $("#forecast_header").hide();
  API_Call();
}
  
  function switch_section(num){
    if (num == 0){
      if ($("#search").hasClass("search_active")){
        $("#search").removeClass("search_active")
        $("#search").hide();
        $("#forecast_header").hide();  
      } else{
        $("#search").show();  
        $("#search").addClass("search_active")
        $("#forecast_header").show();  
      }
    }
    if (num == 1){
      $("#section_forecast").show();
      $("#section_map").hide();
      $("#navicon2").addClass('iconactive');
      $("#navicon3").removeClass('iconactive');
    }
    if (num == 2){
      $("#section_map").show();
      $("#section_forecast").hide();
      $("#navicon3").addClass('iconactive');
      $("#navicon2").removeClass('iconactive');
    }
  }