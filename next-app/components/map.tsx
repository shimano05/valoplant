import { useEffect, useState } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import Konva from "konva";

interface MapPropsType {
  mapWidth: number;
  mapHeight: number;
}

interface MapSizeType {
  width: number;
  height: number;
}

export default function Map({ mapWidth, mapHeight }: MapPropsType) {
  const [mapElement, setMapElement] = useState<HTMLImageElement | undefined>(undefined);
  const [charaElement, setCharaElement] = useState<HTMLImageElement | undefined>(undefined);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [size, setSize] = useState<MapSizeType>({
    width: mapWidth,
    height: mapHeight,
  });
  const [bgPos, setBgPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.src = "/acent.png";
    img.onload = () => {
      setMapElement(img);
    };

    const chara = new window.Image();
    chara.src = "/chara.png";
    chara.onload = () => {
      setCharaElement(chara);
    };
    setIsLoad(true);
  }, []);

  // TODO: e: anyを正しい型設定に変更する;
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage: Stage | null = e.target.getStage();
    if (!stage) {
      return; // stage が null の場合は何もしない
    }
    const mousePointTo = {
      x: stage.getPointerPosition().x / scale - stage.x() / scale,
      y: stage.getPointerPosition().y / scale - stage.y() / scale,
    };

    const minScale = 1; // 最小の拡大率
    const maxScale = 1.5; // 最大の拡大率
    let newScale = scale;

    // 上方向にスクロールは拡大、した方にスクロール縮小
    if (e.evt.deltaY < 0) {
      newScale = Math.min(scale + Math.abs(e.evt.deltaY / 1000), maxScale); //maxScaleよりも小さいならscaleが代入、小さい方を返す
    } else {
      newScale = Math.max(scale - Math.abs(e.evt.deltaY / 1000), minScale); //minScaleよりも大きいならscaleが代入、大きい方を返す
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
    <Stage width={size.width} height={size.width}>
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
        {isLoad && <Image image={charaElement} width={40} height={40} alt="chara" draggable />}
      </Layer>

      <Layer>
        <Rect fill="black" width={700} height={100} x={0} y={600} />
      </Layer>
    </Stage>
  );
}
