import React from "react";
import { BatteryLow, BatteryMedium, BatteryFull } from "lucide-react";
{
  /* <BatteryLow color="skyblue" strokeWidth={2} size={40} />
      <BatteryMedium color="darkblue" strokeWidth={2} size={40} />
    </div> */
}
type props = {
  priority: string;
};

const PriorityLabel = ({ priority }: props) => {
  return (
    <div className="flex">
      {(() => {
        switch (priority) {
          case "high":
            return <BatteryFull color="#00c234" strokeWidth={1.8} size={40} />;
          case "medium":
            return (
              <BatteryMedium color="#c27100" strokeWidth={1.8} size={40} />
            );
          case "low":
            return <BatteryLow color="#c20000" strokeWidth={1.8} size={40} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default PriorityLabel;
