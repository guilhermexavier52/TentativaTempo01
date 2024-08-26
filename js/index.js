const apiKey = "53aacc403c8d8cb4635ac1fb28b36ac6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
        }

        const data = await response.json();

        if (data.main && data.weather && data.wind) {
            // Atualiza os elementos da página com os dados recebidos
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}ºC`;
            document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
            document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

            // Atualiza o ícone do clima com base na resposta da API
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "img/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "img/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "img/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "img/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "img/mist.png";
                    break;
                default:
                    weatherIcon.src = "img/default.png";
                    break;
            }

            // Exibe a seção de clima e esconde a mensagem de erro
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else {
            throw new Error('Dados incompletos recebidos da API.');
        }
    } catch (error) {
        // Exibe a mensagem de erro e esconde a seção de clima
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Função para buscar o clima ao clicar no botão ou pressionar Enter
function searchWeather() {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
}

// Adiciona evento de clique no botão de busca
searchBtn.addEventListener("click", searchWeather);

// Adiciona evento de tecla Enter na caixa de texto
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchWeather();
    }
});
