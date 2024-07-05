import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const second = dateObject.getSeconds();

      const currentTime =
        String(hour).padStart(2, "0") +
        " : " +
        String(minute).padStart(2, "0") +
        " : " +
        String(second).padStart(2, "0");

      setTime(currentTime);
    }, 1000);
  }, []);

  return <Label className="font-bold">{time}</Label>;
}
