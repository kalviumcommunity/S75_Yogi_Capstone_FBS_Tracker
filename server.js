const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Match = require("./models/Match");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/fbs-football-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/test", (req, res) => {
  res.json({ message: "GET API working" });
});

app.get("/matches", async (req, res) => {
  try {
    const allMatches = await Match.find();
    res.status(200).json({ message: "Matches fetched", data: allMatches });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/matches/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ message: "Match fetched", data: match });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/matches", async (req, res) => {
  try {
    const { homeTeam, awayTeam, homeScore, awayScore } = req.body;

    if (!homeTeam || !awayTeam) {
      return res.status(400).json({ message: "homeTeam and awayTeam are required" });
    }

    const newMatch = new Match({ homeTeam, awayTeam, homeScore, awayScore });
    const savedMatch = await newMatch.save();

    res.status(201).json({ message: "Match created", data: savedMatch });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/matches/:id", async (req, res) => {
  try {
    const { homeTeam, awayTeam, homeScore, awayScore } = req.body;

    if (!homeTeam || !awayTeam) {
      return res.status(400).json({ message: "homeTeam and awayTeam are required" });
    }

    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { homeTeam, awayTeam, homeScore, awayScore },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match updated", data: updatedMatch });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});