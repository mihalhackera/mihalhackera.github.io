const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonthIndex = new Date().getMonth();
const goalPerMonth = 20;

function createTable() {
  let tableBody = document.getElementById("movieTable");
  tableBody.innerHTML = "";

  for (let i = 0; i <= currentMonthIndex; i++) {
    let row = document.createElement("tr");

    let monthCell = document.createElement("td");
    monthCell.textContent = months[i];
    row.appendChild(monthCell);

    let moviesCell = document.createElement("td");
    let input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.value = localStorage.getItem(months[i]) || "0";
    input.addEventListener("input", updateSummary);
    input.addEventListener("change", function() {
      localStorage.setItem(months[i], input.value);
    });
    moviesCell.appendChild(input);
    row.appendChild(moviesCell);

    tableBody.appendChild(row);
  }
  updateSummary();
}

function updateSummary() {
  let totalWatched = 0;
  document.querySelectorAll("tbody input").forEach(input => {
    totalWatched += parseInt(input.value) || 0;
  });

  let minExpected = currentMonthIndex * goalPerMonth;
  let expectedTotal = (currentMonthIndex + 1) * goalPerMonth;
  let moviesDifference = expectedTotal - totalWatched;
  let daysLeft = new Date(new Date().getFullYear(), currentMonthIndex + 1, 0).getDate() - new Date().getDate();
  let moviesPerDay = (moviesDifference > 0 && daysLeft > 0) ? (moviesDifference / daysLeft).toFixed(2) : 0;

  // Update lower summary values
  document.getElementById("totalNumber").textContent = totalWatched;
  let moviesLeft = moviesDifference > 0 ? moviesDifference : 0;
  document.getElementById("moviesLeftNumber").textContent = moviesLeft;
  document.getElementById("moviesPerDayNumber").textContent = moviesPerDay;

  updateProgressBar(totalWatched, minExpected, expectedTotal);
}

function updateProgressBar(watched, minGoal, maxGoal) {
  let progress = Math.min((watched / maxGoal) * 100, 100);
  let progressBar = document.getElementById("progressBar");
  progressBar.style.width = progress + "%";

  if (watched < minGoal) {
    progressBar.style.backgroundColor = "#D61F1F";
  } else if (watched >= minGoal && watched < maxGoal) {
    progressBar.style.backgroundColor = "#FFD301";
  } else {
    progressBar.style.backgroundColor = "#006B3D";
  }
}

createTable();
