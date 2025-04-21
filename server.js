const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let teams = []; // In-memory team data
let scores = {}; // In-memory golfer scores

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

// Submit scores for one or more golfers
app.post('/scores', (req, res) => {
  const submittedScores = req.body;

  for (const golfer in submittedScores) {
    const scoreInput = submittedScores[golfer];
    const score = parseInt(scoreInput, 10);

    if (!isNaN(score)) {
      if (!scores[golfer]) scores[golfer] = {};
      // For now, store as R1 – we can expand to dynamic rounds later
      scores[golfer]['R1'] = score;
    }
  }

  console.log('Updated scores:', scores);
  res.status(200).json({ message: 'Scores saved' });
});

// View scores for verification
app.get('/scores', (req, res) => {
  res.json(scores);
});

app.listen(PORT, () => {
  console.log(`Golf backend running on port ${PORT}`);
});

