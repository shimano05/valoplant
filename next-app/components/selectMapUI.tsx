import MapData from "@/data/mapData.json";
import { Button, Tooltip } from "@material-tailwind/react";

type MapType = {
  mapName: string;
  mapImg: string;
};

type UIPropsType = {
  handleUpdateMap: (newMap: string) => void;
};

export default function SelectMapUI({ handleUpdateMap }: UIPropsType) {
  const mapData: MapType[] = MapData;

  const selectMap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    handleUpdateMap(value);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {mapData.map((map) => (
        <Button
          key={map.mapName}
          onClick={(e) => selectMap(e)}
          value={map.mapName}
          className="m-1 w-7/12"
        >
          {map.mapName}
        </Button>
      ))}
    </div>
  );
}
