import { useEffect, useState } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";

export default function Character() {
  const [imageElement, setImageElement] = useState<HTMLImageElement | undefined>(undefined);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/acent.png";
    img.onload = () => {
      setImageElement(img);
    };
  });

  return (
    <Stage width={300} height={300}>
      <Layer>
        {imageElement && <Image image={imageElement} alt="character" width={300} height={300} />}
      </Layer>
    </Stage>
  );
}
