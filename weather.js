const inputBox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const weatherImg=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.getElementById('hum');
const windSpeed=document.getElementById('wind-speed');
const body=document.querySelector('body');
const wrong=document.querySelector('.wrong');

const checkWeather =async (city)=>{
    const api_key="b28252e394e38057e785ac9074bfe7ff";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
   
    let response=await fetch(url);
    let data=await response.json();
    if(data.cod==='404'){
        wrong.style.display="flex";
        weatherImg.style.display="none";
        temperature.style.display="none";
        description.style.display="none";
        humidity.style.display="none";
        windSpeed.style.display="none";
        return;
    }
    else
    {
        wrong.style.display='none';
        weatherImg.style.display = "flex";
        temperature.style.display = "block";
        description.style.display = "block";
        humidity.style.display = "flex"; // Assuming flex because it's inside .weather-details which uses flex
        windSpeed.style.display = "flex"
    }
    temperature.innerHTML=`${Math.round(data.main.temp-273.15)}°C`;
    humidity.innerHTML=`${data.main.humidity}%`;
    windSpeed.innerHTML=`${data.wind.speed}Km/Hr`;
    description.innerHTML=data.weather[0].description;
    switch(data.weather[0].main){
        case 'Clouds':
            weatherImg.src="cloudy.jpg";
            break;
        case 'Clear':
            weatherImg.src="sun.webp";
            break;
        case 'Mist':
            weatherImg.src="mist.png";
            break;
        case 'Rain':
            weatherImg.src="rain.png";
            break;
        case 'Snow':
            weatherImg.src="snow.png";
            break;
        default: 
        weatherImg.src="sun.webp";
            break;

    }
   
}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})
body.addEventListener('keypress',(eve)=>
{
    if(eve.key==='Enter')
        checkWeather(inputBox.value);
})
let start=()=>{
    checkWeather('Pune');
    inputBox.value='Pune'
}
start();