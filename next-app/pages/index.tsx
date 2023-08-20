import Character from "@/components/character";
import Map from "@/components/map";
export default function Home() {
  return (
    <div>
      <div className="flex justify-center h-screen">
        <Map mapWidth={700} mapHeight={700} />
      </div>
      {/* <div>
        <Character />
      </div> */}
    </div>
  );
}
