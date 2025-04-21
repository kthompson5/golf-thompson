document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("admin-score-form");
  const scoreFields = document.getElementById("golfer-score-fields");

  try {
    const res = await fetch("https://golf-thompson-1.onrender.com/teams");
    const teams = await res.json();

    const allGolfers = new Set();
    teams.forEach(team => team.golfers.forEach(g => allGolfers.add(g)));
    const golferList = Array.from(allGolfers).sort();

    golferList.forEach(name => {
      const div = document.createElement("div");
      div.className = "golfer-section";

      const label = document.createElement("label");
      label.textContent = `${name} – Enter Round Score:`;
      label.setAttribute("for", name);

      const input = document.createElement("input");
      input.type = "text";
      input.id = name;
      input.name = name;
      input.placeholder = "e.g. -3 or +2";

      div.appendChild(label);
      div.appendChild(input);
      scoreFields.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading golfers:", err);
    scoreFields.innerHTML = "<p>Unable to load golfers.</p>";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {};

    const inputs = form.querySelectorAll("input[type='text']");
    inputs.forEach(input => {
      const val = input.value.trim();
      if (val) data[input.name] = val;
    });

    try {
      const res = await fetch("https://golf-thompson.onrender.com/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Failed to save scores");
      alert("Scores saved successfully!");
    } catch (err) {
      console.error("Error submitting scores:", err);
      alert("Failed to save scores. Try again.");
    }
  });
});
