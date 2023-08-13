import { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";

function App() {
  const [imageElement, setImageElement] = useState<HTMLImageElement | undefined>(undefined);
  const [scale, setScale] = useState(1);
  const [size, setSize] = useState({ width: 700, height: 700 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/acent.png";
    img.onload = () => {
      setImageElement(img);
    };
  }, []);

  const handleZoom = ({ wheelDelta, layerX, layerY }) => {
    const step = 0.2;

    if (scale === 1) {
      if (wheelDelta > 0) {
        setScale(scale + step);
        setIsDragging(true);
      }
    } else if (scale > 1) {
      setIsDragging(true);
      if (wheelDelta > 0) {
        setScale(scale + step);
      } else if (wheelDelta < 0) {
        setScale(scale - step);
      }
    }
  };

  const handleMouseMove = ({ layerX, layerY }) => {
    setMousePosition({ x: layerX, y: layerY });
  };

  useEffect(() => {
    console.clear();
    console.log(mousePosition);
  }, [mousePosition]);

  return (
    <div className="container flex justify-center mx-auto items-center mt-12">
      <Stage
        width={size.width}
        height={size.width}
        onWheel={(e) => handleZoom(e.evt)}
        onMouseMove={(e) => handleMouseMove(e.evt)}
        className="bg-black"
        draggable={isDragging}
      >
        <Layer scaleX={scale} scaleY={scale}>
          {imageElement && <Image image={imageElement} alt="map" />}
          {imageElement && <Image image={imageElement} alt="map" width={100} height={100} draggable />}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
