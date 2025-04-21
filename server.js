const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let teams = []; // In-memory store for now

// Submit a new team
app.post('/submit-team', (req, res) => {
  const team = req.body;
  if (!team.name || !team.golfers || team.golfers.length !== 7) {
    return res.status(400).json({ error: 'Invalid team submission' });
  }

  team.timestamp = new Date().toISOString();
  teams.push(team);
  res.status(200).json({ message: 'Team submitted successfully' });
});

// Get all submitted teams
app.get('/teams', (req, res) => {
  res.json(teams);
});

app.listen(PORT, () => {
  console.log(`Golf backend running on port ${PORT}`);
});
