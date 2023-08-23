import Map from "@/components/map";
import AgentInfoUI from "@/components/agentInfoUI";

import React, { useEffect, useState } from "react";

export default function Home() {
  // const [size, setSize] = useState({
  //   width: 0,
  //   height: 0,
  // });

  const [Loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<string[]>([]);

  const [map, setMap] = useState<string>("アセント");

  useEffect(() => {
    // setSize({ width: window.screen.width, height: window.screen.height });
    setLoading(true);
  }, []);

  const handleUpdateData = (newData: string) => {
    const newArray = [...data];
    newArray.push(newData);
    setData(newArray);
  };

  const handleUpdateMap = (newMap: string) => {
    setMap(newMap);
  };

  console.log(map);

  return (
    <div>
      {Loading ? (
        <div className="justify-center flex">
          <Map mapWidth={800} mapHeight={800} selectData={data} selectMap={map} />
        </div>
      ) : (
        <div>Loading</div>
      )}
      <AgentInfoUI handleUpdateData={handleUpdateData} handleUpdateMap={handleUpdateMap} />
    </div>
  );
}
