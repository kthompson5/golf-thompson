document.addEventListener("DOMContentLoaded", () => {
  const golferList = [
    "Scottie Scheffler", "Rory McIlroy", "Jon Rahm", "Jordan Spieth", "Brooks Koepka",
    "Viktor Hovland", "Xander Schauffele", "Patrick Cantlay", "Collin Morikawa", "Tony Finau",
    "Rickie Fowler", "Justin Thomas", "Max Homa", "Hideki Matsuyama", "Tommy Fleetwood"
  ];

  const selectsContainer = document.getElementById("golfer-selects");

  for (let i = 0; i < 7; i++) {
    const label = document.createElement("label");
    label.textContent = `Golfer ${i + 1} (Rank ${i + 1}):`;

    const select = document.createElement("select");
    select.name = `golfer${i + 1}`;
    select.required = true;

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "-- Select a Golfer --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    golferList.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

    selectsContainer.appendChild(label);
    selectsContainer.appendChild(select);
  }

  const form = document.getElementById("picks-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("playerName").value.trim();
    const password = document.getElementById("password").value.trim();
    const tiebreaker = document.getElementById("tiebreaker").value.trim();

    const golferSelections = Array.from(form.querySelectorAll("select")).map(select => select.value);

    // Check for duplicates
    const hasDuplicates = new Set(golferSelections).size !== golferSelections.length;
    if (hasDuplicates) {
      alert("Duplicate golfers selected. Please choose 7 unique golfers.");
      return;
    }

    const teamData = {
      name,
      password,
      golfers: golferSelections,
      tiebreaker
    };

    try {
      const response = await fetch("https://your-backend-url.onrender.com/submit-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(teamData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit team");
      }

      alert("Picks submitted successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error submitting your picks. Try again later.");
    }
  });
});
