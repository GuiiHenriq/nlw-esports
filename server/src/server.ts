import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// List Game
app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

// Create AD
app.post("/ads", (req, res) => {
  return res.json([]);
});

// List Ads by Game
app.get("/games/:id/ads", (req, res) => {
  //const gameId = req.params.id;

  return res.json([]);
});

// Get Discord by Ad
app.get("/ads/:id/discord", (req, res) => {
  //const adId = req.params.id;

  return res.json([]);
});

app.listen(8888);
