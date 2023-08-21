import Image from "next/image";
import { Tooltip } from "@mui/material";

export default function Home() {
  const characterData = [
    { name: "アストラ", path: "/character/Astra.png", size: 0 },
    { name: "ブリムストーン", path: "/character/Brimstone.png", size: 0 },
    { name: "ハーバー", path: "/character/Harbor.png", size: 0 },
    { name: "オーメン", path: "/character/Omen.png", size: 0 },
    { name: "ヴァイパー", path: "/character/Viper.png", size: 0 },
    { name: "ジェット", path: "/character/Jett.png", size: 0 },
    { name: "ネオン", path: "/character/Neon.png", size: 0 },
    { name: "フェニックス", path: "/character/Phoenix.png", size: 0 },
    { name: "レイズ", path: "/character/Raze.png", size: 0 },
    { name: "ヨル", path: "/character/Yoru.png", size: 0 },
  ];

  const skillData = [
    {
      name: "インセンディアリー",
      path: "/skill/Incendiary.png",
    },
    {
      name: "スカイスモーク",
      path: "/skill/SkySmoke.png",
    },
    {
      name: " スティムビーコン",
      path: "/skill/StimBeacon.png",
    },
    {
      name: "オービタルストライク",
      path: "/skill/OrbitalStrike.png",
    },
  ];

  const skillMenu = (
    <div className="flex">
      {skillData.map((item) => (
        <div key={item.name} className="m-1 ">
          <Image src={item.path} width={40} height={40} alt={item.name} priority />
        </div>
      ))}
    </div>
  );

  // TODO:material-tailwindの導入

  return (
    <div className="">
      <div className=" flex justify-center bg-black">
        {characterData.map((item) => (
          <Tooltip key={item.name} title={skillMenu} placement="top" leaveDelay={0}>
            <div
              key={item.name}
              className="hover:bg-slate-400 bg-slate-500 rounded-lg m-1 p-1 justify-center"
            >
              <Image src={item.path} width={60} height={60} alt={item.name} priority />
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
