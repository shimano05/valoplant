import Character from "@/components/character";
import Map from "@/components/map";

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
        // <div className="justify-center flex h-screen">
        <Map mapWidth={size.width} mapHeight={size.height} />
      ) : (
        // </div>
        <div>Loading</div>
      )}

      {/* <div>
        <Character />
      </div> */}
    </div>
  );
}
