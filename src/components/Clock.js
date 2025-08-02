import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">⏰ Clock</h2>
      <p className="text-4xl font-mono flex justify-center items-center h-36">{time.toLocaleTimeString()}</p>
    </div>
  );
}
