import { useState, useEffect } from "react";

type BatteryState = {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
};

export function useBatteryStatus(): BatteryState | null {
  const [battery, setBattery] = useState<BatteryState | null>(null);

  useEffect(() => {
    // @ts-ignore: Navigator has battery in some browsers
    if (!navigator.getBattery && !navigator.battery) {
      console.warn("Battery Status API not supported");
      return;
    }

    const getBattery = async () => {
      try {
        // @ts-ignore
        const battery = await (navigator.getBattery?.() || navigator.battery);

        const updateBattery = () => {
          setBattery({
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
          });
        };

        updateBattery();

        battery.addEventListener("chargingchange", updateBattery);
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingtimechange", updateBattery);
        battery.addEventListener("dischargingtimechange", updateBattery);

        return () => {
          battery.removeEventListener("chargingchange", updateBattery);
          battery.removeEventListener("levelchange", updateBattery);
          battery.removeEventListener("chargingtimechange", updateBattery);
          battery.removeEventListener("dischargingtimechange", updateBattery);
        };
      } catch (error) {
        console.error("Error accessing battery status:", error);
      }
    };

    getBattery();
  }, []);

  return battery;
}
