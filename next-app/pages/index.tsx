import Character from "@/components/character";
import Map from "@/components/map";
import Ui from "@/components/ui";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setSize({ width: window.screen.width, height: window.screen.height });
    setLoading(true);
  }, []);

  console.log(size);

  return (
    <div>
      {Loading ? (
        <div className="justify-center flex">
          <Map mapWidth={700} mapHeight={700} />
        </div>
      ) : (
        <div>Loading</div>
      )}
      <Ui />
    </div>
  );
}
