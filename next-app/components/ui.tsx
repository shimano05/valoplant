import Image from "next/image";
import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";

export default function Ui() {
  const characterData = [
    { name: "アストラ", path: "/character/Astra.png" },
    { name: "ブリムストーン", path: "/character/Brimstone.png" },
    { name: "ハーバー", path: "/character/Harbor.png" },
    { name: "オーメン", path: "/character/Omen.png" },
    { name: "ヴァイパー", path: "/character/Viper.png" },
    { name: "ジェット", path: "/character/Jett.png" },
    { name: "ネオン", path: "/character/Neon.png" },
    { name: "フェニックス", path: "/character/Phoenix.png" },
    { name: "レイズ", path: "/character/Raze.png" },
    { name: "ヨル", path: "/character/Yoru.png" },
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

  const [isOpen, setIsOpen] = useState<string>("");

  // 各キャラクターのスキルtooltips・上方向に出てくるメニュー
  const skillMenu = (
    <div className="flex space-x-1">
      {skillData.map((item) => (
        <Image
          onClick={() => setIsOpen("")}
          src={item.path}
          width={40}
          height={40}
          alt={item.name}
          key={item.name}
          className="bg-black rounded p-1"
          priority
        />
      ))}
    </div>
  );

  return (
    // キャラクターリストの大枠
    <div className=" flex justify-center bg-black">
      {characterData.map((item) => (
        // まとまり
        <div
          key={item.name}
          onMouseLeave={() => setIsOpen("")}
          onMouseEnter={() => setIsOpen(item.name)}
        >
          {/* スキル画像 */}
          <Tooltip
            content={skillMenu}
            placement="top"
            className="border-black border-2 bg-deep-orange-400"
            open={isOpen === item.name}
          >
            {/* キャラクター画像 */}
            <Image
              onClick={() => setIsOpen("")}
              src={item.path}
              width={60}
              height={60}
              alt={item.name}
              key={item.name}
              className="hover:bg-blue-gray-500 bg-blue-gray-600 rounded-lg m-1 p-1 justify-center"
              priority
            />
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
