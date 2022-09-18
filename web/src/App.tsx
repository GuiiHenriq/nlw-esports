import { useState, useEffect } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import "./styles/main.css";
import Logo from "./assets/logo.svg";

import { GameCard } from "./components/GameCard";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8888/games").then((res) => {
      setGames(res.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={Logo} alt="Logo NLW eSports" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-title-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>

      <section className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </section>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
