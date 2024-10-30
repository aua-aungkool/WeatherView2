document.addEventListener("DOMContentLoaded", function() {
    const weatherTableBody = document.getElementById("weatherTableBody");
  
    async function fetchWeatherData() {
      try {
        const response = await fetch("https://www.tmd.go.th/weatherForecast7DaysWidget?province=ภูเก็ต");
        const data = await response.json();
  
        // สมมติข้อมูลที่ได้จาก API อยู่ในโครงสร้าง data.daily ที่เก็บข้อมูล 7 วัน
        data.daily.forEach(day => {
          const date = new Date(day.dt * 1000).toLocaleDateString("th-TH");
          const temp = `${day.temp.day.toFixed(1)} °C`;
          const humidity = `${day.humidity} %`;
          const weather = day.weather[0].description;
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${date}</td>
            <td>${temp}</td>
            <td>${humidity}</td>
            <td>${weather}</td>
            <td><img src="${iconUrl}" alt="${weather} icon"></td>
          `;
          weatherTableBody.appendChild(row);
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  
    fetchWeatherData();
  });
  