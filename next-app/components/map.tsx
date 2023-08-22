import { useEffect, useState } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import Konva from "konva";
import Data from "@/data/agentData.json";

type MapPropsType = {
  mapWidth: number;
  mapHeight: number;
  selectData: string[];
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

export default function Map({ mapWidth, mapHeight, selectData }: MapPropsType) {
  const [mapElement, setMapElement] = useState<HTMLImageElement | undefined>(undefined);
  const [charaElement, setCharaElement] = useState<HTMLImageElement | undefined>(undefined);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [size, setSize] = useState<MapSizeType>({
    width: mapWidth,
    height: mapHeight,
  });
  const [bgPos, setBgPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 元データ
  const agentData: AgentType[] = Data;

  // 各エージェントのImageElementをまとめた配列
  const [agentImgs, setAgentImgs] = useState<HTMLImageElement[]>([]);

  //TODO:非同期処理 resoleve Promise.allについて学習する

  // ImageElementの配列の初期設定;
  const createImgElement = async (agentData: AgentType[]) => {
    const imgArray: HTMLImageElement[] = [];
    const promises: Promise<void>[] = [];

    agentData.forEach((agent) => {
      const img = new window.Image();
      img.src = agent.agentImg;
      img.alt = agent.agentName;

      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          imgArray.push(img);
          resolve();
        };
      });

      promises.push(promise);
    });

    await Promise.all(promises); // すべての画像の読み込みが完了するのを待つ
    setAgentImgs(imgArray);
  };

  useEffect(() => {
    createImgElement(agentData);
    setIsLoad(true);
  }, [agentData]);

  // TODO:エージェント同様に画像を読み込んでマップを切り替えられるようにする
  // マップ読み込み（仮）
  useEffect(() => {
    const img = new window.Image();
    img.src = "map/acent.png";
    img.onload = () => {
      setMapElement(img);
    };
    setIsLoad(true);
  }, []);

  // 拡大縮小の処理
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    // TODO: stage: Stage | nullを正しい型設定に変更する
    const stage: Stage | null = e.target.getStage();
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
        {isLoad && <Image image={mapElement} width={size.width} height={size.height} alt="map" />}

        {agentImgs.flatMap((agent) =>
          selectData.map(
            (name, selectIndex) =>
              name === agent.alt && (
                // TODO:追加する際の初期値の設定&マウスをドラックして離したところを初期位置にする
                <Image
                  key={`selected-agent-${selectIndex}`}
                  image={agent}
                  width={50}
                  height={50}
                  alt={agent.alt}
                  x={50 * selectIndex} // 位置をずらしてる（仮）
                  y={0}
                  fill="black"
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
