const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "GET API working" });
});
let matches = [];

app.post("/matches", (req, res) => {
  const { homeTeam, awayTeam, homeScore, awayScore } = req.body;

  if (!homeTeam || !awayTeam) {
    return res.status(400).json({ message: "homeTeam and awayTeam are required" });
  }

  const newMatch = {
    id: matches.length + 1,
    homeTeam,
    awayTeam,
    homeScore: homeScore || 0,
    awayScore: awayScore || 0,
  };

  matches.push(newMatch);
  res.status(201).json({ message: "Match created", data: newMatch });
});
app.put("/matches/:id", (req, res) => {
  const matchId = parseInt(req.params.id);
  const match = matches.find((m) => m.id === matchId);

  if (!match) {
    return res.status(404).json({ message: "Match not found" });
  }

  const { homeTeam, awayTeam, homeScore, awayScore } = req.body;

  if (!homeTeam || !awayTeam) {
    return res.status(400).json({ message: "homeTeam and awayTeam are required" });
  }

  match.homeTeam = homeTeam;
  match.awayTeam = awayTeam;
  match.homeScore = homeScore || 0;
  match.awayScore = awayScore || 0;

  res.status(200).json({ message: "Match updated", data: match });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000/test`);
});
