import { useEffect, useState } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";

function App() {
  const [imageElement, setImageElement] = useState<HTMLImageElement | undefined>(undefined);
  const [scale, setScale] = useState<number>(1);
  const [size, setSize] = useState({ width: 700, height: 700 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.src = "/acent.png";
    img.onload = () => {
      setImageElement(img);
    };
  }, []);

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const mousePointTo = {
      x: stage.getPointerPosition().x / scale - stage.x() / scale,
      y: stage.getPointerPosition().y / scale - stage.y() / scale,
    };

    const minScale = 1; // 最小の拡大率
    const maxScale = 1.5; // 最大の拡大率
    let newScale = scale;

    console.log(e.evt.deltaY);

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
      setPos(newPos);
      stage.position(newPos);
      stage.batchDraw();
    };

    requestAnimationFrame(animate);
  };

  return (
    <Stage width={size.width} height={size.width} className="container flex justify-center">
      <Layer>
        <Rect
          x={-pos.x}
          y={-pos.y}
          width={size.width * scale > size.width ? size.width * scale : size.width}
          height={size.height * scale > size.height ? size.height * scale : size.height}
          fill="lightgray"
        />
      </Layer>
      <Layer
        draggable
        scaleX={scale}
        scaleY={scale}
        onWheel={(e) => {
          handleWheel(e);
        }}
      >
        {imageElement && (
          <Image image={imageElement} width={size.width} height={size.height} alt="map" />
        )}
      </Layer>
    </Stage>
  );
}

export default App;
