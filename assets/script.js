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
var forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&cnt=40&units=imperial&appid=a85e2d69a404ab1f087da912eb4b924c';
if(forCards){
    bod.innerHTML = ""
}
    fetch(forecast)
        .then(function (rsponse) {
            
            return rsponse.json();
        })
        .then(function(datr){
            console.log(datr.list);
            console.log(datr.list.length);
         for(var i = 0; i < datr.list.length; i++) {
           datrArr.push(datr.list[i]);
           
            
        } console.log(datrArr)
            for(var j = 3; j < datrArr.length; j += 8){
           
            Icon = datrArr[j].weather[0].icon
           cardImg = document.createElement('img')
           cardImg.src = 'http://openweathermap.org/img/wn/'+ Icon + '@2x.png'
              forCards = document.createElement('div');
              dateHead = document.createElement('h3')
              forCardsP1 = document.createElement('p')
              forCardsP2 = document.createElement('p')
              forCardsP3 = document.createElement('p')
              unixStamp = datrArr[j].dt;
              forDate = dayjs.unix(unixStamp)
                dateHead.textContent = forDate.format('ddd DD')
            
             forCards.classList.add('card');
            forCards.innerHTML = ' Temperature: ' + datrArr[j].main.temp + '\u00B0 F';
             forCardsP1.textContent = ' Humidity: ' + datrArr[j].main.humidity+'%';
             forCardsP2.textContent = ' Feels Like: ' + datrArr[j].main.feels_like + '\u00B0 F';
             forCardsP3.textContent = 'Wind: ' + datrArr[j].wind.speed + 'mph';
            
             forCards.append(dateHead, cardImg)
             forCards.append(forCardsP1, forCardsP2, forCardsP3);
            
             bod.appendChild(forCards);
           }
        
          });
  }

  subBut.addEventListener('submit', function(event){
    event.preventDefault();
         var location = event.target[0].value;
            console.log(location);
    if (!storeCity.includes(location)){
       
        newbtn = document.createElement('button');
        newbtn.setAttribute('value', location);
        newbtn.textContent = location;
        newbtn.classList.add('oldCities')
        pastCity.appendChild(newbtn);
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
