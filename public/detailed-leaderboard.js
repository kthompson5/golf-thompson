document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("detailed-leaderboard");

  try {
    const res = await fetch("https://your-backend-url.onrender.com/teams");
    const teams = await res.json();

    teams.forEach((team) => {
      const box = document.createElement("div");
      box.classList.add("team-box");

      const title = document.createElement("h2");
      title.textContent = team.name;
      box.appendChild(title);

      const ul = document.createElement("ul");

      team.golfers.forEach((golfer, index) => {
        const li = document.createElement("li");
        li.textContent = `#${index + 1}: ${golfer}`;
        ul.appendChild(li);
      });

      const tiebreaker = document.createElement("p");
      tiebreaker.innerHTML = `<strong>Tiebreaker:</strong> ${team.tiebreaker}`;
      box.appendChild(ul);
      box.appendChild(tiebreaker);

      container.appendChild(box);
    });
  } catch (err) {
    console.error("Error loading detailed leaderboard:", err);
    container.innerHTML = `<p>Unable to load detailed leaderboard data.</p>`;
  }
});
