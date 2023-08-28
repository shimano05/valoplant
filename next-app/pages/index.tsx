import Map from "@/components/map";
import AgentInfoUI from "@/components/agentInfoUI";
import SelectMapUI from "@/components/selectMapUI";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<string[]>([]);

  const [map, setMap] = useState<string>("アセント");

  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleResize = () => {
    setSize({ width: window.innerWidth * 0.7, height: window.innerHeight * 0.8 });
  };

  useEffect(() => {
    setSize({ width: window.innerWidth * 0.7, height: window.innerHeight * 0.8 });
    window.addEventListener("resize", handleResize);
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

  console.log();

  return (
    <div style={{ height: size.height }}>
      {loading && (
        <div className="flex h-[80vh]">
          {/* MAPUI */}
          <div className="bg-yellow-500 w-1/4 flex justify-center items-center">
            <SelectMapUI handleUpdateMap={handleUpdateMap} />
          </div>

          <Map reSize={size} selectData={data} selectMap={map} />

          <ul className="bg-yellow-500 w-1/4">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      )}
      {/* エージェント＆スキルUI */}
      <div className="bg-black flex justify-center items-center h-[20vh]">
        <AgentInfoUI handleUpdateData={handleUpdateData} />
      </div>
    </div>
  );
}
