"use strict";


const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
    const searchInp = document.getElementById("searchInp").value;
    console.log(searchInp);
    getData(searchInp);
    
})

async function getData(searchVal) {
    try {
        const response = await fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&q=' + searchVal + '&format=jsonv2&limit=1');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Kunde inte fetcha, följande felmeddelande skapades:', error);
    }
}
