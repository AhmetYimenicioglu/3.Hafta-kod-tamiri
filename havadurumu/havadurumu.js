const apikey = "0db31b22099cef714fa9e3d7cb91145";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apikey}&units=metric&lang=tr`;

async function lokasyonBilgisi(city) {
  try {
    const resp = await fetch(url(city));
    const respData = await resp.json();

    if (respData.cod === "404") {
      uyariMesaji("Konum bilgisi bulunamadı!");
    } else {
      havaDurumuBilgisi(respData);
    }
  } catch (error) {
    uyariMesaji("Hava durumu alınırken hata oluştu!");
    console.error(error);
  }
}

function havaDurumuBilgisi(data) {
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Hava Durumu" />
      ${Math.round(data.main.temp)}°C
    </h2>
    <small>${data.weather[0].description}</small>
    <small><label>${data.sys.country}</label>,</small>
    <small>${data.name}</small>
  `;

  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();

  if (city) {
    lokasyonBilgisi(city);
  } else {
    uyariMesaji("Lütfen bir konum girin!");
  }
});

function uyariMesaji(mesaj) {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = mesaj;
  container.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000);

  main.innerHTML = "";
}
