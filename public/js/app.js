
console.log('app.js front end');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const loc = document.querySelector('#location');
const temp = document.querySelector('#temperature');
const des = document.querySelector('#description');
const icon = document.querySelector('#weather-icon');

//obatin data from backend and display
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            }
            else {
                loc.textContent = data.location;
                temp.innerHTML = `${data.forecastData.temp}° <span>C</span>`
                des.textContent = data.forecastData.description;
                icon.src = `http://openweathermap.org/img/wn/${data.forecastData.icon}@2x.png`
            }
        });
    });
});


//Ask for geolocation
if ('geolocation' in navigator) {
    console.log("navi");
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} 

function setPosition(position){
    let lat=position.coords.latitude;
    let long=position.coords.longitude;
    console.log(lat);
    console.log(long);
  
    //Get the weather info from the API
    getWeather(lat, long);
  }
  
  //Show the error
  function showError(error){
    //notificationElement.style.display="block";
    //notificationElement.innerHTML=`<p> ${error.message} </p>`;
    console.log("error");
  }

  function getWeather(lat, long) {
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&%20exclude={part}&appid=672a1acbfbd8f8852bd51abc05329ca8&units=metric`;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if (!data.cod) {
                loc.textContent = `Current position: latitude: ${Math.round(lat)}, longitude: ${Math.round(long)}`;
                temp.innerHTML = `${data.current.temp}° <span>C</span>`
                des.textContent = data.current.weather[0].description;
                icon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
            }
        })
    })
  }