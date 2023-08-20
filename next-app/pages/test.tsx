import { useEffect, useState } from "react";
import { Stage, Layer, Image, Rect, Group } from "react-konva";
import Konva from "konva";

export default function Character() {
  const [scale, setScale] = useState<number>(1);

  const handlewheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    let newScale = scale;

    const wheelValue = e.evt.deltaY;
    console.log(wheelValue);

    console.log(newScale);

    wheelValue < 0 ? (newScale = newScale + 0.1) : (newScale = newScale - 0.1);
    setScale(newScale);
  };

  console.log(scale);

  return (
    <Stage width={600} height={600}>
      <Layer onWheel={(e) => handlewheel(e)}>
        <Rect width={600} height={600} fill="black" />
        <Group scale={{ x: scale, y: scale }} width={600} height={500}>
          <Rect width={300} height={300} fill="white" x={300} y={300} draggable />
          <Rect width={100} height={100} fill="red" x={100} y={100} draggable />
          <Rect width={100} height={100} fill="green" draggable />
        </Group>
        <Rect width={600} height={100} x={0} y={500} fill="pink" />
      </Layer>
    </Stage>
  );
}
