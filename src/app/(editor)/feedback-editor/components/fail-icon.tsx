import { X } from "lucide-react";
import React from "react";

function FailIcon() {
  return (
    <div className="rounded-full bg-red-200 w-fit p-2">
      <X stroke="red" width={26} height={26} />
    </div>
  );
}

export default FailIcon;
