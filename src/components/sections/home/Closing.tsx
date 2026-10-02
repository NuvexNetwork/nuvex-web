import { CtaBanner } from "@/components/sections/CtaBanner";
import { closing } from "@/data/home";

export function Closing() {
  return (
    <CtaBanner
      id="closing-title"
      title={closing.title}
      accent={closing.accent}
      action={closing.action}
    />
  );
}
