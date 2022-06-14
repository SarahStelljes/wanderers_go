var searchBtn = document.querySelector("#searchBtn");
var searchInput = document.getElementById("search-input");
var prevSearches = document.querySelector("#previous-searches");

var savedArray = [];
var requestUrl1;
var requestUrl2;
var appId = "47a754a3120aa2e98794ad83a18b147e";
var stateCodes = [
    {
        sName: "alabama",
        sAbbr: "al",
        code: "US-AL"
    },
    {
        sName: "alaska",
        sAbbr: "ak",
        code: "US-AK"
    },
    {
        sName: "arizona",
        sAbbr: "az",
        code: "US-AZ"
    },
    {
        sName: "arkansas",
        sAbbr: "ar",
        code: "US-AR"
    },
    {
        sName: "california",
        sAbbr: "ca",
        code: "US-CA"
    },
    {
        sName: "colorado",
        sAbbr: "co",
        code: "US-CO"
    },
    {
        sName: "conneticut",
        sAbbr: "ct",
        code: "US-CT"
    },
    {
        sName: "delware",
        sAbbr: "de",
        code: "US-DE"
    },
    {
        sName: "florida",
        sAbbr: "fl",
        code: "US-FL"
    },
    {
        sName: "georgia",
        sAbbr: "ga",
        code: "US-GA"
    },
    {
        sName: "hawaii",
        sAbbr: "hi",
        code: "US-HI"
    },
    {
        sName: "idaho",
        sAbbr: "id",
        code: "US-ID"
    },
    {
        sName: "illinois",
        sAbbr: "il",
        code: "US-IL"
    },
    {
        sName: "indiana",
        sAbbr: "in",
        code: "US-IN"
    },
    {
        sName: "iowa",
        sAbbr: "ia",
        code: "US-IA"
    },
    {
        sName: "kansas",
        sAbbr: "ks",
        code: "US-KS"
    },
    {
        sName: "kentucky",
        sAbbr: "ky",
        code: "US-KY"
    },
    {
        sName: "louisiana",
        sAbbr: "la",
        code: "US-LA"
    },
    {
        sName: "maine",
        sAbbr: "me",
        code: "US-ME"
    },
    {
        sName: "massachusetts",
        sAbbr: "ma",
        code: "US-MA"
    },
    {
        sName: "michigan",
        sAbbr: "mi",
        code: "US-MI"
    },
    {
        sName: "minnesota",
        sAbbr: "mn",
        code: "US-MN"
    },
    {
        sName: "mississippi",
        sAbbr: "ms",
        code: "US-MS"
    },
    {
        sName: "missouri",
        sAbbr: "mo",
        code: "US-MO"
    },
    {
        sName: "montana",
        sAbbr: "mt",
        code: "US-MT"
    },
    {
        sName: "nebraska",
        sAbbr: "ne",
        code: "US-NE"
    },
    {
        sName: "nevada",
        sAbbr: "nv",
        code: "US-NV"
    },
    {
        sName: "new hampshire",
        sAbbr: "nh",
        code: "US-NH"
    },
    {
        sName: "new jersey",
        sAbbr: "nj",
        code: "US-NJ"
    },
    {
        sName: "new mexico",
        sAbbr: "nm",
        code: "US-NM"
    },
    {
        sName: "new york",
        sAbbr: "ny",
        code: "US-NY"
    },
    {
        sName: "north carolina",
        sAbbr: "nc",
        code: "US-NC"
    },
    {
        sName: "north dakota",
        sAbbr: "nd",
        code: "US-ND"
    },
    {
        sName: "ohio",
        sAbbr: "oh",
        code: "US-OH"
    },
    {
        sName: "oklahoma",
        sAbbr: "ok",
        code: "US-OK"
    },
    {
        sName: "oregon",
        sAbbr: "or",
        code: "US-OR"
    },
    {
        sName: "pennsylvania",
        sAbbr: "pa",
        code: "US-PA"
    },
    {
        sName: "rhode island",
        sAbbr: "ri",
        code: "US-RI"
    },
    {
        sName: "south carolina",
        sAbbr: "sc",
        code: "US-SC"
    },
    {
        sName: "south dakota",
        sAbbr: "sd",
        code: "US-SD"
    },
    {
        sName: "tennessee",
        sAbbr: "tn",
        code: "US-TN"
    },
    {
        sName: "texas",
        sAbbr: "tx",
        code: "US-TX"
    },
    {
        sName: "utah",
        sAbbr: "ut",
        code: "US-UT"
    },
    {
        sName: "vermont",
        sAbbr: "vt",
        code: "US-VT"
    },
    {
        sName: "virginia",
        sAbbr: "va",
        code: "US-VA"
    },
    {
        sName: "washingtion",
        sAbbr: "wa",
        code: "US-WA"
    },
    {
        sName: "west virginia",
        sAbbr: "wv",
        code: "US-WV"
    },
    {
        sName: "wisconsin",
        sAbbr: "wi",
        code: "US-WI"
    },
    {
        sName: "wyoming",
        sAbbr: "wy",
        code: "US-WY"
    }
];
var usIsoCode = 840;

var getSearchVal = function(event){
    event.preventDefault();
    var searched;
    var searchedCity;
    var searchedState;
    searched = searchInput.value;
    searched = searched.toLowerCase();

    for(var i = 0; i < stateCodes.length; i++){
        if(searched.includes(", ")){
            searchedCity = searched.split(", ")[0];
            searchedCity = searchedCity.replace(" ","-");
            searchedState = searched.split(", ")[1];
            if(searchedState === stateCodes[i].sName || searchedState === stateCodes[i].sAbbr){
                searched = searchedCity+","+stateCodes[i].code+","+usIsoCode;
            }
        }
    }

    saveSearch(searchInput.value);
    search(searched);
}

var search = function(searched){
    requestUrl1 = "http://api.openweathermap.org/geo/1.0/direct?q="+searched+"&limit=5&appid="+appId;
    fetch(requestUrl1)
        .then((res) => res.json())
        .then(function(data){
            if(data.length > 1){
                for(var i = 0; i < data.length; i++){
                    console.log(data[i]);
                }
                var lon = data[0].lon;
                var lat = data[0].lat;
                getWeather(lon, lat, data[0].name);
            }
            else if(data.length === 0){
                console.log("Something went wrong when fetching data!");
            }
            else{
                var lon = data[0].lon;
                var lat = data[0].lat;
                getWeather(lon, lat, data[0].name);
            }
        });
};

var getWeather = function(lon, lat, cityName){
    requestUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=alerts&units=imperial&appid="+appId;
    fetch(requestUrl2)
        .then((res)=>res.json())
        .then(function(data){
            getCurrent(data.current, cityName);

        });
};

var getCurrent = function(current, cityName){
    var currentDiv = document.querySelector("#current-weather");

    while(currentDiv.firstChild){
        currentDiv.removeChild(currentDiv.firstChild);
    }
    
    var cityDateCloudDiv = document.createElement("div");
    cityDateCloudDiv.className = "city-date-sky-div";
    var name = document.createElement("h2");
    var sky = document.createElement("img");
    sky.className = "sky";
    
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");

    var uvIndexDiv = document.createElement("div");
    uvIndexDiv.className = "uv-index-div";
    var uvIndexText = document.createElement("p");
    var uvIndexNumDiv = document.createElement("div");
    uvIndexNumDiv.className = "uv-index-num-div";
    var uvIndexNum = document.createElement("p");
    uvIndexNum.className = "uv-index-num";
    
    var uvNum = current.uvi;

    name.textContent = cityName+" ("+moment().format("L")+") ";
    sky.src="http://openweathermap.org/img/wn/"+current.weather[0].icon+".png";
    
    cityDateCloudDiv.appendChild(name);
    cityDateCloudDiv.appendChild(sky);

    temp.textContent = "Temp: "+current.temp+"\u00B0"+"F";
    wind.textContent = "Wind: "+current.wind_speed+" MPH";
    humidity.textContent = "Humidity: "+current.humidity+"%";

    uvIndexText.textContent = "UV Index: ";
    uvIndexDiv.appendChild(uvIndexText);

    uvIndexNum.textContent = uvNum;
    uvIndexNumDiv.appendChild(uvIndexNum);

    if(uvNum <= 2){
        uvIndexNumDiv.className = "uvi uv-low capsule";
    }
    else if(uvNum > 2 && uvNum <= 5){
        uvIndexNumDiv.className = "uvi uv-moderate capsule";
    }
    else if(uvNum > 5 && uvNum <= 7){
        uvIndexNumDiv.className = "uvi uv-high capsule";
    }
    else if(uvNum > 7 && uvNum <= 10){
        uvIndexNumDiv.className = "uvi uv-veryhigh capsule";
    }
    else if(uvNum > 10){
        uvIndexNumDiv.className = "uvi uv-extreme capsule";
    }

    uvIndexDiv.appendChild(uvIndexNumDiv);

    currentDiv.appendChild(cityDateCloudDiv);
    currentDiv.appendChild(temp);
    currentDiv.appendChild(wind);
    currentDiv.appendChild(humidity);
    currentDiv.appendChild(uvIndexDiv);
}

var saveSearch = function(saveThis){
    if(saveThis === "" || saveThis === null){
        return;
    }
    else{
        savedArray.unshift(saveThis);

        if(savedArray.length > 8){
            savedArray.pop();
        }
        localStorage.setItem("wanderersGo-searches", JSON.stringify(savedArray));

        if(prevSearches.firstChild){
            while(prevSearches.firstChild){
                prevSearches.removeChild(prevSearches.firstChild);
            }
        }
        loadPrevSearches();
    }
}

var loadPrevSearches = function(){
    var object = JSON.parse(localStorage.getItem("wanderersGo-searches")) || [];
    savedArray = object;
    for(var i = 0; i < savedArray.length; i++){
        // 
        const btnCap = document.createElement("input");
        var getArrVal = savedArray[i];
        btnCap.value = getArrVal;
        btnCap.readOnly = true;
        btnCap.className = "capsule prev-search";
        btnCap.textContent = getArrVal;
        btnCap.addEventListener("click", function(){
            var saveInput = btnCap.value;
            var btnVal = btnCap.value;
            for(var e = 0; e < stateCodes.length; e++){
                if(btnVal.includes(", ")){
                    var searchedCity;
                    var searchedState;
                    searchedCity = btnVal.split(", ")[0];
                    searchedCity = searchedCity.replace(" ","-");
                    searchedState = btnVal.split(", ")[1];
                    searchedCity = searchedCity.toLowerCase();
                    searchedState = searchedState.toLowerCase();
                    if(searchedState === stateCodes[e].sName || searchedState === stateCodes[e].sAbbr){
                        btnVal = searchedCity+","+stateCodes[e].code+","+usIsoCode;
                    }
                }
            }
            saveSearch(saveInput);
            search(btnVal);
        });

        prevSearches.appendChild(btnCap);
    }
};

loadPrevSearches();

searchBtn.addEventListener("click", getSearchVal);