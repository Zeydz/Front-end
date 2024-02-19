"use strict";
/* Hämtar sökknappen samt skapar en eventlistenet för värdet på input. Skickar med value till nästa funktion */
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
  const searchInp = document.getElementById("searchInp").value;
  getData(searchInp);
});

/* Fetchar data med value från eventlistener. Skickar data till cordMap. */
async function getData(searchVal) {
  try {
    const response = await fetch(
      "https://nominatim.openstreetmap.org/search?addressdetails=1&q=" +
        searchVal +
        "&format=jsonv2&limit=1"
    );
    let data = await response.json();
    cordMap(data);
  } catch (error) {
    console.error("Kunde inte fetcha, följande felmeddelande skapades:", error);
  }
}

/* Funktion för att få fram kordinaterna i variabler, för att på så sätt ändra innehåll i iframen. */
function cordMap(cords) {
    let longitude = cords[0].lon;
    let latitude = cords[0].lat;
    let boxLatitude1 = cords[0].boundingbox[0];
    let boxLatitude2 = cords[0].boundingbox[1];
    let boxLongitude1 = cords[0].boundingbox[2];
    let boxLongitude2 = cords[0].boundingbox[3];
    /* Hämtar element och ändrar SRC-länken med rätt data */
    document.getElementById("map").src = ("https://www.openstreetmap.org/export/embed.html?bbox=" + boxLongitude1 + "%2C" + boxLatitude1 + "%2C" + boxLongitude2 + "%2C" + boxLatitude2 + "&layer=mapnik&marker=" + latitude + "%2C" + longitude);
}
