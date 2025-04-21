document.addEventListener("DOMContentLoaded", async () => {
  const pairingsContainer = document.getElementById("pairings-list");

  // Dummy data for pairings (to be replaced with real source)
  const allPairings = [
    ["Scottie Scheffler", "Max Homa", "Tony Finau"],
    ["Rory McIlroy", "Justin Thomas", "Jordan Spieth"],
    ["Jon Rahm", "Brooks Koepka", "Rickie Fowler"],
    ["Collin Morikawa", "Viktor Hovland", "Xander Schauffele"],
    ["Patrick Cantlay", "Tommy Fleetwood", "Hideki Matsuyama"]
  ];

  try {
    const res = await fetch("https://golf-thompson.onrender.com/teams");
    const teams = await res.json();

    const pickedGolfers = new Set();
    teams.forEach(team => team.golfers.forEach(name => pickedGolfers.add(name)));

    const relevantPairings = allPairings.filter(group =>
      group.some(player => pickedGolfers.has(player))
    );

    relevantPairings.forEach((group, i) => {
      const box = document.createElement("div");
      box.classList.add("pairing-box");

      const title = document.createElement("h2");
      title.textContent = `Group ${i + 1}`;
      box.appendChild(title);

      const ul = document.createElement("ul");
      group.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name + (pickedGolfers.has(name) ? " ⭐" : "");
        ul.appendChild(li);
      });

      box.appendChild(ul);
      pairingsContainer.appendChild(box);
    });

    if (relevantPairings.length === 0) {
      pairingsContainer.innerHTML = '<p>No current pairings found for selected golfers.</p>';
    }
  } catch (err) {
    console.error("Error loading pairings:", err);
    pairingsContainer.innerHTML = '<p>Unable to load pairings at this time.</p>';
  }
});
