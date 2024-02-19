"use strict";
window.onload = getData;

/* Fetch för att hämta data */
async function getData() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        const data = await response.json();

        displayCourse(data);
        displayProgram(data); 

    } catch (error) {
        const errorEl = document.getElementById("error");
        errorEl.innerHTML = "Kunde inte fetcha data";
        console.error(error);
    }
}

/* Filtererar och sorterar program samt kallar på funktion. */
function displayCourse(data) {
  const courses = data.filter(item => item.type === "Kurs");
  const sortedCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
  const topCourses = sortedCourses.slice(0, 6)
  const courseNames = topCourses.map(course => course.name);
  const applicantsTotal= topCourses.map(course => course.applicantsTotal);
  /* Kallar på funktion */
  createChart(courseNames, applicantsTotal);
}

/* Filtererar och sorterar program samt kallar på funktion. */
function displayProgram(data) {
  const programs = data.filter(item => item.type === "Program");
  const sortedPrograms = programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
  const topPrograms = sortedPrograms.slice(0, 5)
  const programNames = topPrograms.map(program => program.name);
  const applicantsTotalProgram = topPrograms.map(program => program.applicantsTotal);
  /* Kallar på funktion */
  createPieChart(programNames, applicantsTotalProgram);
}

/* Skapar första stapeldiagrammet */
function createChart(courseNames, applicantsTotal) {
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: courseNames,
      datasets: [{
        label: 'Mest sökta kurserna',
        data: applicantsTotal,
        borderWidth: 1
      }]
    },
    options: {
      animation: true,
      responsive: true, 
      maintainAspectRatio: true,
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/* Skapar cirkeldiagram */
function createPieChart(programNames, applicantsTotalProgram) {
  const ctx2 = document.getElementById('myChart2');
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: programNames,
      datasets: [{
        label: 'Antal sökande',
        data: applicantsTotalProgram,
        borderWidth: 1
      }]
    },
  });
}