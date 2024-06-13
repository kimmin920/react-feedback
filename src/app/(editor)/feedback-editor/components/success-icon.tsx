import { Check } from "lucide-react";
import React from "react";

function SuccessIcon() {
  return (
    <div className="rounded-full bg-green-200 w-fit p-2">
      <Check stroke="green" width={26} height={26} />
    </div>
  );
}

export default SuccessIcon;
