import { useEffect, useState } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import Konva from "konva";
import AgentData from "@/data/agentData.json";
import MapData from "@/data/mapData.json";

type MapPropsType = {
  selectData: string[];
  selectMap: string;
  reSize: MapSizeType;
};

type MapSizeType = {
  width: number;
  height: number;
};

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

export default function Map({ selectData, selectMap, reSize }: MapPropsType) {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [size, setSize] = useState<MapSizeType>({
    width: 0,
    height: 0,
  });
  const [bgPos, setBgPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 元データagent&map
  const agentData: AgentType[] = AgentData;
  const mapData: MapType[] = MapData;

  // 各agentとskillのImageElementをまとめた配列
  const [agentImgs, setAgentImgs] = useState<HTMLImageElement[]>([]);

  // 各MapのImageElementをまとめた配列
  const [mapImgs, setMapImgs] = useState<HTMLImageElement[]>([]);

  //TODO:非同期処理 resoleve Promise.allについて学習する

  // agent&skillのImageElementの配列の初期設定;
  const createAgentImgElement = async (agentData: AgentType[]) => {
    const imgArray: HTMLImageElement[] = [];
    const promises: Promise<void>[] = [];

    agentData.forEach((agent) => {
      const agentImg = new window.Image();
      agentImg.src = agent.agentImg;
      agentImg.alt = agent.agentName;

      const skillImgPromise = new Promise<void>((resolve) => {
        agent.skill.forEach((skill: SkillType) => {
          const skillImg = new window.Image();
          skillImg.src = skill.skillImg;
          skillImg.alt = skill.skillName;
          skillImg.onload = () => {
            imgArray.push(skillImg);
            resolve();
          };
        });
      });

      const agentImgPromise = new Promise<void>((resolve) => {
        agentImg.onload = () => {
          imgArray.push(agentImg);
          resolve();
        };
      });

      promises.push(agentImgPromise, skillImgPromise);
    });

    await Promise.all(promises); // すべての画像の読み込みが完了するのを待つ
    setAgentImgs(imgArray);
  };

  // mapのImageElementの配列の初期設定;
  const createMapImgElement = async (mapData: MapType[]) => {
    const imgArray: HTMLImageElement[] = [];
    const promises: Promise<void>[] = [];

    mapData.forEach((map) => {
      const mapImg = new window.Image();
      mapImg.src = map.mapImg;
      mapImg.alt = map.mapName;

      const promise = new Promise<void>((resolve) => {
        mapImg.onload = () => {
          imgArray.push(mapImg);
          resolve();
        };
      });

      promises.push(promise);
    });

    await Promise.all(promises); // すべての画像の読み込みが完了するのを待つ
    setMapImgs(imgArray);
  };

  useEffect(() => {
    setSize({ width: reSize.width, height: reSize.height }); // リサイズ時にサイズを更新
    createAgentImgElement(agentData);
    createMapImgElement(mapData);
    setIsLoad(true);
  }, [agentData, mapData, reSize]);

  // 拡大縮小の処理
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    // TODO: stage: Stage | nullを正しい型設定に変更する
    const stage: Stage | null = e.currentTarget.getStage();
    if (!stage) {
      return; // stage が null の場合は何もしない
    }

    const mousePointTo = {
      x: stage.getPointerPosition().x / scale - stage.x() / scale,
      y: stage.getPointerPosition().y / scale - stage.y() / scale,
    };

    // 最小の拡大率
    const minScale = 1;

    // 最大の拡大率
    const maxScale = 1.5;

    let newScale = scale;

    // 上方向にスクロールは拡大、した方にスクロール縮小
    if (e.evt.deltaY < 0) {
      //maxScaleよりも小さいならscaleが代入、小さい方を返す
      newScale = Math.min(scale + Math.abs(e.evt.deltaY / 1000), maxScale);
    } else {
      //minScaleよりも大きいならscaleが代入、大きい方を返す
      newScale = Math.max(scale - Math.abs(e.evt.deltaY / 1000), minScale);
    }

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };

    // requestAnimationFrame を使用してアニメーションの更新を行う
    const animate = () => {
      setScale(newScale);
      setBgPos(newPos);
      stage.position(newPos);
      stage.batchDraw();
    };
    requestAnimationFrame(animate);
  };

  return (
    <Stage width={size.width} height={size.height}>
      {/* bgColorLayer */}
      <Layer>
        <Rect
          x={-bgPos.x}
          y={-bgPos.y}
          width={size.width * scale > size.width ? size.width * scale : size.width}
          height={size.height * scale > size.height ? size.height * scale : size.height}
          fill="lightgray"
        />
      </Layer>

      {/* MainLayer */}
      <Layer
        draggable
        scaleX={scale}
        scaleY={scale}
        onWheel={(e) => {
          handleWheel(e);
        }}
      >
        {/* mapElement */}
        {isLoad &&
          mapImgs.map(
            (map) =>
              selectMap === map.alt && (
                <Image
                  key={map.alt}
                  image={map}
                  x={(size.width - size.height) / 2}
                  y={(size.height - size.height) / 2}
                  width={size.height}
                  height={size.height}
                  alt={map.alt}
                />
              )
          )}

        {/* skill&agent Element */}
        {isLoad &&
          agentImgs.flatMap((img) =>
            selectData.map(
              (name, selectIndex) =>
                name === img.alt && (
                  // TODO:追加する際の初期値の設定&マウスをドラックして離したところを初期位置にする
                  <Image
                    key={`${img.alt}${selectIndex}`}
                    image={img}
                    width={30}
                    height={30}
                    alt={img.alt}
                    x={50 * selectIndex} // 位置をずらしてる（仮）
                    y={0}
                    cornerRadius={10}
                    draggable
                  />
                )
            )
          )}
      </Layer>
    </Stage>
  );
}
