var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Morongo Valley&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c'

var forcast = 'https://api.openweathermap.org/data/2.5/forecast?q=palm springs&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c'

var headline = document.querySelector('#topHeader')
var bod = document.querySelector('#landingSpot')

function getCurrApi(currentWeather){
    fetch(currentWeather)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            headline.textContent = data.name;
        });
        
}

getCurrApi(currentWeather);

function getForApi(forcast){
    fetch(forcast)
        .then(function (rsponse) {
            console.log(rsponse);
            return rsponse.json();
        })
        .then(function(datr){
            console.log(datr.);
            
               
                

            
        });
}
getForApi(forcast);

