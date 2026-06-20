document.querySelector('#search').addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityName = document.querySelector("#city_name").value;

    if (!cityName) {
        document.querySelector("#   weather").classList.remove("show");
        showalert("Você precisa digitar ou selecionar localização")
        return;
    }

    const apikey = "5bd0efe2c976460bff5110784c4fdf36";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apikey}&units=metric&lang=pt_br`

    const results = await fetch(apiurl);
    const json = await results.json();

    if(json.cod == 200) {
        showinfo({
            city: json.name,
            country: json.sys.country,
            tempmax: json.main.temp_max,
            tempmin: json.main.temp_min,
            description: json.weather[0].description,
            tempicon: json.weather[0].icon,
            sunSet: json.sys.sunset, 
            sunRise: json.sys.sunrise,
            Humidity: json.main.humidity,

        });
    } else {
        document.querySelector("#weather").classList.remove("show");
        showalert(`Desculpe, não foi possível localizar a cidade
            <img src="src/error.svg"
            `)
    }
});

function showinfo(json) {
    showalert("");
    
    document.querySelector("#weather").classList.add("show");

    document.querySelector("#tittle").innerHTML = `${json.city}, ${json.country}`;
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1)},<sup>°C</sup>`;
    document.querySelector("#temp_description").innerHTML = `${json.description}`;
    document.querySelector("#temp_img").setAttribute("src",`https://openweathermap.org/img/wn/${json.tempicon}@2x.png`);
    document.querySelector("#temp_max").innerHTML = `${json.tempmax.toFixed(1)},<sup>°C</sup>`;
    document.querySelector("#temp_min").innerHTML = `${json.tempmin.toFixed(1)},<sup>°C</sup>`;
    document.querySelector("#humidity").innerHTML = `${json.Humidity}%`;
    document.querySelector("#sunborn").innerHTML = `${json.sunRise}`;
    document.querySelector("#sundeath").innerHTML = `${json.sunSet}`;
}

function showalert(msg) {
    document.querySelector("#alert").innerHTML = msg;
}