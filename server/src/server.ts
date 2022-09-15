import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { convertHour } from "./utils/convert-hour";
import { convertMinutes } from "./utils/convert-minutes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
 
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
app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const payload: any = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: payload.name,
      yearsPlaying: payload.yearsPlaying,
      discord: payload.discord,
      weekDays: payload.weekDays.join(','),
      hourStart: convertHour(payload.hourStart),
      hourEnd: convertHour(payload.hourEnd),
      useVoiceChannel: payload.useVoiceChannel,
    },
  })

  return res.status(201).json(ad);
});

// List Ads by Game
app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutes(ad.hourStart),
        hourEnd: convertMinutes(ad.hourEnd)
      };
    })
  );
});

// Get Discord by Ad
app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});

app.listen(8888);
