// $(document).ready(function(){
  
// })
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentLat = "";
var currentLon = "";
function getPosition(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  }else{
    console.log("sorry");
  }
}
function getWeather() {
  getPosition();
  var xhr = new XMLHttpRequest();
  xhr.open( 'GET', "http://api.openweathermap.org/data/2.5/weather?lat="+currentLat+"&lon="+currentLon+"&APPID=c7294a560e0aac2d8389242ba90f4a6a", false );
  xhr.send();
  var responseContent = JSON.parse(xhr.responseText);
  //console.log(responseContent);
  
  showInWindow(responseContent);
  changeBGColor();
}
function showInWindow(responseContent){
  var cityName = responseContent.name +" "+ responseContent.sys.country;
  var weatherType = responseContent.weather[0].main;
  var weatherId = responseContent.weather.id;
  document.getElementById("weatherInfo").innerHTML = weatherType;
  document.getElementById("cityInfo").innerHTML = cityName;
  console.log(weatherType);
}
function showError(error){
  switch(error.code){
    case error.PERMISSION_DENIED:
      alert("SB浏览器拒绝对获取地理位置的请求")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("位置信息不可用垃圾") 
      break;
    case error.TIMEOUT:
      alert("请求超时") 
      break;
    case error.UNKNOWN_ERROR:
      alert("秘制错误") 
      break;
  }
}
function showPosition(position){
  //console.log(position.coords.latitude);
      currentLat = position.coords.latitude;
      currentLat = currentLat.toFixed(0);
      //currentLat = currentLat.toString();
      currentLon = position.coords.longitude;
      currentLon = currentLon.toFixed(0);
      //console.log(currentLat+currentLon);
}
function changeBGColor(){
  var BGColor = Math.floor(Math.random()*colors.length);
  $("html body").animate({
    backgroundColor: colors[BGColor],
    //color: colors[BGColor]
  },1000);
  //console.log(BGColor);
}