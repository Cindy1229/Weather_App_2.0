
console.log('app.js front end');




const weatherForm = document.querySelector('form');
const search =document.querySelector('input');

const loc=document.querySelector('#location');
const temp=document.querySelector('#temperature');
const des=document.querySelector('#description');
const icon=document.querySelector('#weather-icon');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location=search.value;
    console.log(location);

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1.textContent=data.error;
        }
        else {
            loc.textContent=data.location;
            temp.innerHTML=`${data.forecastData.temp}° <span>C</span>`
            des.textContent=data.forecastData.description;
            icon.src=`http://openweathermap.org/img/wn/${data.forecastData.icon}@2x.png`
        }
    })
})

})