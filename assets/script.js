var subBut = document.querySelector('#inputForm');
var tempSlot = document.querySelector('#currTemp');
var dscSlot = document.querySelector('#description');
var headline = document.querySelector('#topHeader');
var bod = document.querySelector('#bulk');
var pastCity = document.querySelector('#pastCity')
var cityBtn = document.querySelector('.oldCities')
var forCards
var currCity = {};
var storeCity = []
var currDate = dayjs().format('MMMM dddd DD, YYYY')
// var 
console.log(currDate)
function init() {
    
    storeCity = JSON.parse(localStorage.getItem("cityObj"));

    if (storeCity === null) {
    storeCity = [];
     } else {
        for(var i = 0; i < storeCity.length; i++){
            console.log(storeCity)
            var cityBtn = document.createElement('button')
            cityBtn.classList.add('oldCities')
            cityBtn.textContent= storeCity[i].city
            cityBtn.setAttribute('value', storeCity[i].city)
            pastCity.appendChild(cityBtn)
            console.log(cityBtn.value)
        }
     }
}

function getCurrApi(location){
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c';
    fetch(currentWeather)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            var Icon = data.weather[0].icon
            console.log(Icon)
            tempSlot.textContent = data.name + " On " + currDate;

            dscSlot.textContent = 'Temperature: ' + data.main.temp + ' Wind Speed: ' + data.wind.speed + 'mph ' + 'Humidity: ' + data.main.humidity + '%'
            var iconSlot = document.createElement('img')
            iconSlot.classList.add('iconImg')
            iconSlot.src = 'http://openweathermap.org/img/wn/'+ Icon + '@2x.png'
            tempSlot.appendChild(iconSlot);
        });
        
}

function getForApi(location){
    var datrArr = [];
var forecast = 'https:api.openweathermap.org/data/2.5/forecast?q=' + location + '&cnt=40&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c';
if(forCards){
    bod.innerHTML = ""
}
    fetch(forecast)
        .then(function (rsponse) {
            console.log(rsponse);
            return rsponse.json();
        })
        .then(function(datr){
            console.log(datr.list);
            console.log(datr.list.length);
         for(var i = 0; i < datr.list.length; i++) {
           datrArr.push(datr.list[i]);
            // console.log(datrArr)
            //   console.log(datr.list[i].main)
            
        } console.log(datrArr)
            for(var j = 3; j < datrArr.length; j += 8){
            //  console.log(datrArr[j]);
            Icon = datrArr[j].weather[0].icon
           cardImg = document.createElement('img')
           cardImg.src = 'http://openweathermap.org/img/wn/'+ Icon + '@2x.png'
              forCards = document.createElement('div');
             forCards.classList.add('card');
            forCards.innerHTML = ' Temperature: ' + datrArr[j].main.temp + '\u00B0 F';
            forCardsP = document.createElement('p')
             forCardsP.innerHTML = ' Feels Like: ' + datrArr[j].main.feels_like + '\u00B0 F';
            
             forCards.append(cardImg)
             forCards.append(forCardsP)
            
             bod.appendChild(forCards);
           }
        
          });
  }

  subBut.addEventListener('submit', function(event){
    event.preventDefault();
         var location = event.target[0].value;
            console.log(location);
    if (location){
        currCity = {city: location};
        storeCity.push(currCity);
        localStorage.setItem('cityObj', JSON.stringify(storeCity));
     getCurrApi(location);
      getForApi(location);
}
});

init();

pastCity.addEventListener("click", function(event){
    var location = event.target.value;
     getCurrApi(location);
     getForApi(location);
})