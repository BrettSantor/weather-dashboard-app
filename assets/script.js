var subBut = document.querySelector('#inputForm');
var tempSlot = document.querySelector('#currTemp');
var headline = document.querySelector('#topHeader');
var bod = document.querySelector('#bulk');
var currCity = {};
var storeCity = []

function getCurrApi(location){
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c';
    fetch(currentWeather)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data.main.temp);
            headline.textContent = data.name + " " + data.main.temp;
        
           
        });
        
}

function getForApi(location){
    var datrArr = [];
var forecast = 'https:api.openweathermap.org/data/2.5/forecast?q=' + location + '&cnt=40&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c';
    fetch(forecast)
        .then(function (rsponse) {
            console.log(rsponse);
            return rsponse.json();
        })
        .then(function(datr){
            console.log(datr.list);
            console.log(datr.list.length);
         for(var i = 0; i < datr.list.length; i++) {
           datrArr.push(datr.list[i].main);
            // console.log(datrArr)
            //   console.log(datr.list[i].main)
            
        } console.log(datrArr)
            for(var j = 3; j < datrArr.length; j += 8){
             console.log(datrArr[j]);
             var forCards = document.createElement('div');
             forCards.classList.add('card');
            forCards.textContent = 'temp: ' + datrArr[j].temp;
             bod.appendChild(forCards);
           }
          });
  }

  subBut.addEventListener('submit', function(event){
    event.preventDefault();
         var location = event.target[0].value;
            console.log(location);
    if (location){
        currCity = {city: location}
        storeCity.push(currCity)
        localStorage.setItem('cityObj', JSON.stringify(storeCity));
     getCurrApi(location);
      getForApi(location);
}
})
