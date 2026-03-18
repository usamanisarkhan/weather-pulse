const countrySelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');
const weatherCard = document.getElementById('weather-card');
const countryNameEl = document.getElementById('country-name');
const countryFlagEl = document.getElementById('country-flag');
const temperatureEl = document.getElementById('temperature');
const weatherDescEl = document.getElementById('weather-desc');
const windSpeedEl = document.getElementById('wind-speed');
const humidityEl = document.getElementById('humidity');
const loader = document.getElementById('loader');

// Weather interpretation codes from Open-Meteo
const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
  80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
  95: 'Thunderstorm',
};

let selectedCountryData = null;

async function init() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
    const countries = await response.json();
    
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = JSON.stringify({
        name: country.name.common,
        code: country.cca2,
        flag: country.flags.svg || country.flags.png
      });
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

countrySelect.addEventListener('change', async (e) => {
  const data = JSON.parse(e.target.value);
  selectedCountryData = data;
  
  // Reset city select
  citySelect.innerHTML = '<option value="" disabled selected>Loading cities...</option>';
  citySelect.disabled = true;
  weatherCard.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: data.name })
    });
    const result = await response.json();
    
    citySelect.innerHTML = '<option value="" disabled selected>Select a city...</option>';
    
    if (result.data && result.data.length > 0) {
      result.data.sort().forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
      citySelect.disabled = false;
    } else {
      citySelect.innerHTML = '<option value="" disabled selected>No cities found</option>';
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    citySelect.innerHTML = '<option value="" disabled selected>Error loading cities</option>';
  } finally {
    loader.classList.add('hidden');
  }
});

citySelect.addEventListener('change', async (e) => {
  const cityName = e.target.value;
  loader.classList.remove('hidden');
  weatherCard.classList.add('hidden');

  try {
    // 1. Get coordinates for the city
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found');
    }
    
    const { latitude, longitude } = geoData.results[0];
    
    // 2. Get weather for coordinates
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
    const weatherData = await weatherRes.json();
    const current = weatherData.current;
    
    // Update UI
    countryNameEl.textContent = `${cityName}, ${selectedCountryData.name}`;
    countryFlagEl.src = selectedCountryData.flag;
    
    temperatureEl.textContent = Math.round(current.temperature_2m);
    weatherDescEl.textContent = weatherCodes[current.weather_code] || 'Cloudy';
    windSpeedEl.textContent = `${current.wind_speed_10m} km/h`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    
    loader.classList.add('hidden');
    weatherCard.classList.remove('hidden');
    
  } catch (error) {
    console.error('Error:', error);
    loader.classList.add('hidden');
    alert('Failed to fetch data for this city.');
  }
});

init();
