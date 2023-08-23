import Image from "next/image";
import { Button, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import AgentData from "@/data/agentData.json";
import MapData from "@/data/mapData.json";

type SkillType = {
  skillName: string;
  skillImg: string;
};

type AgentType = {
  agentName: string;
  agentImg: string;
  skill: SkillType[];
};

type MapType = {
  mapName: string;
  mapImg: string;
};

type UiPropsType = {
  handleUpdateData: (newData: string) => void;
  handleUpdateMap: (newMap: string) => void;
};

export default function Ui({ handleUpdateData, handleUpdateMap }: UiPropsType) {
  // tooltipの開閉状態
  const [isOpen, setIsOpen] = useState<string>("");

  // エージェント情報
  const agentData: AgentType[] = AgentData;

  const mapData: MapType[] = MapData;

  // 親コンポーネントにクリックした要素を渡す関数
  const selectElement = (e: React.MouseEvent<HTMLImageElement>) => {
    const value = e.currentTarget.alt;
    setIsOpen("");
    handleUpdateData(value);
  };

  const selectMap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    handleUpdateMap(value);
  };

  // 各エージェントのスキルtooltips・上方向に出てくるメニュー
  const skillMenu = (agent: AgentType) => {
    return (
      <div className="flex space-x-1">
        {agent.skill.map((skill: SkillType) => (
          <Image
            onClick={(e) => selectElement(e)}
            src={skill.skillImg}
            width={40}
            height={40}
            alt={skill.skillName}
            key={skill.skillName}
            className="bg-black rounded p-1"
            priority
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* キャラクターリストの大枠 */}
      <div className=" flex justify-center bg-black">
        {agentData.map((agent: AgentType) => (
          // まとまり
          <div
            key={agent.agentName}
            onMouseLeave={() => setIsOpen("")}
            onMouseEnter={() => setIsOpen(agent.agentName)}
          >
            {/* スキル画像 */}
            <Tooltip
              content={skillMenu(agent)}
              placement="top"
              className="border-black border-2 bg-deep-orange-400"
              open={isOpen === agent.agentName}
            >
              {/* キャラクター画像 */}
              <Image
                onClick={(e) => selectElement(e)}
                src={agent.agentImg}
                width={60}
                height={60}
                alt={agent.agentName}
                className="hover:bg-blue-gray-500 bg-blue-gray-600 rounded-lg m-1 p-1 justify-center"
                priority
              />
            </Tooltip>
          </div>
        ))}
      </div>
      <div>
        {mapData.map((map) => (
          <Button key={map.mapName} onClick={(e) => selectMap(e)} value={map.mapName}>
            {map.mapName}
          </Button>
        ))}
      </div>
    </div>
  );
}
