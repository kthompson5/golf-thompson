document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#leaderboard-table tbody");

  try {
    const res = await fetch("https://golf-thompson.onrender.com/teams");
    const teams = await res.json();

    // Temporary mock scoring values per round
    teams.forEach((team) => {
      const row = document.createElement("tr");
      const r1 = getRandomScore();
      const r2 = getRandomScore();
      const r3 = getRandomScore();
      const r4 = getRandomScore();
      const total = r1 + r2 + r3 + r4;

      row.innerHTML = `
        <td>${team.name}</td>
        <td>${r1}</td>
        <td>${r2}</td>
        <td>${r3}</td>
        <td>${r4}</td>
        <td class="total-score">${total}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading leaderboard:", err);
    tableBody.innerHTML = `<tr><td colspan="6">Unable to load leaderboard data.</td></tr>`;
  }
});

function getRandomScore() {
  return Math.floor(Math.random() * 21) - 10; // Random score between -10 and +10
}
