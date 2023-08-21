import { Tooltip, Button } from "@material-tailwind/react";

export default function Home() {
  return (
    <div className="bg-black">
      <Tooltip content="Material Tailwind">
        <Button color="blue">Show Tooltip</Button>
      </Tooltip>
    </div>
  );
}
