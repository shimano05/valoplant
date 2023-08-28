import Image from "next/image";
import { Tooltip, Carousel, Switch } from "@material-tailwind/react";
import { useState } from "react";
import AgentData from "@/data/agentData.json";

type SkillType = {
  skillName: string;
  skillImg: string;
};

type AgentType = {
  agentName: string;
  agentImg: string;
  skill: SkillType[];
};

type UIPropsType = {
  handleUpdateData: (newData: string) => void;
  handleSwitchTeam: (newStatus: boolean) => void;
};

export default function AgentInfoUI({ handleUpdateData, handleSwitchTeam }: UIPropsType) {
  // tooltipの開閉状態
  const [isOpen, setIsOpen] = useState<string>("");

  const [isTeammate, setIsTeammate] = useState<boolean>(true);

  const [isInMap, setIsInMap] = useState<boolean>(false);

  // エージェント情報
  const agentData: AgentType[] = AgentData;

  const handleSwitch = (mode: string, value: boolean) => {
    switch (mode) {
      case "team":
        setIsTeammate((prevIsTeammate) => !prevIsTeammate);
        handleSwitchTeam(value);
        break;

      case "map":
        setIsInMap((prevIsInMap) => !prevIsInMap);
        break;
      default:
        break;
    }
  };

  // 親コンポーネントにクリックした要素を渡す関数
  const selectElement = (e: React.MouseEvent<HTMLImageElement>) => {
    const value = e.currentTarget.alt;
    setIsOpen("");
    handleUpdateData(value);
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
    <div className="flex items-center">
      <div className="flex flex-col">
        <Switch
          label={isTeammate ? "味方" : "敵"}
          checked={isTeammate}
          value="team"
          onChange={(e) => {
            handleSwitch(e.currentTarget.value, e.currentTarget.checked);
          }}
          className="checked:bg-blue-400 bg-red-400"
          labelProps={{
            className: "text-white w-[5vh]",
          }}
        />
        <Switch
          label="地図上"
          value="map"
          checked={isInMap}
          onChange={(e) => {
            handleSwitch(e.currentTarget.value, e.currentTarget.checked);
          }}
          className="checked:bg-[rgb(46,134,201)]"
          labelProps={{
            className: "text-white w-[5vh]",
          }}
        />
      </div>
      {/* //TODO:role別にカルーセルを分けて表示する */}
      <Carousel>
        {/* キャラクターリストの大枠 */}
        <div className="flex flex-wrap">
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
          <p className="text-white">unti</p>
        </div>
      </Carousel>
    </div>
  );
}
