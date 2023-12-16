document.getElementById('location_button').onclick=getLocation;

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            getAPI(lon,lat,'3d41a5deefdb8039304d267939512f4d');
            
    })
    }
}




function getAPI(lon,lat,key){
    fetch( `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data);
        document.getElementById('lon').innerHTML=data.lon;
        document.getElementById('lat').innerHTML=data.lat;
        document.getElementById('timezone').innerHTML=data.timezone;
        document.getElementById('temp').innerHTML=`${(data.current.temp-273.15).toFixed(2)}°C`;
        document.getElementById('humidity').innerHTML=`${data.current.humidity}%`;
        document.getElementById('weather').innerHTML=(data.current.weather[0].description);
        document.getElementById('icon').src=`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;


    }).catch(err=>{
        console.log(err);
        document.getElementById('error').innerHTML=err;
    })
}