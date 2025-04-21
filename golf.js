document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("golf-form");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerName = document.getElementById("playerName").value.trim();
    const golferInputs = document.querySelectorAll("input[name='golfer']");
    const tiebreaker = document.getElementById("tiebreaker").value.trim();

    const golfers = Array.from(golferInputs).map(input => input.value.trim()).filter(name => name !== "");

    if (golfers.length !== 7) {
      alert("Please enter all 7 golfers.");
      return;
    }

    const teamData = {
      name: playerName,
      golfers: golfers,
      tiebreaker: tiebreaker,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem("golfTeam_" + playerName.toLowerCase().replace(/\s+/g, "_"), JSON.stringify(teamData));

    confirmation.innerHTML = `
      <strong>Team Submitted!</strong><br>
      Name: ${teamData.name}<br>
      Golfers: ${teamData.golfers.join(", ")}<br>
      Tiebreaker: ${teamData.tiebreaker}
    `;
    confirmation.style.display = "block";
    form.reset();
  });
});