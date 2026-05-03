"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";

export function LocationCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: profile.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass card-hover flex h-full flex-col justify-between rounded-3xl p-6">
      <div className="flex items-center gap-2 text-text-muted">
        <MapPin className="h-4 w-4" />
        <span className="text-sm">Based in</span>
      </div>
      <div>
        <div className="text-2xl font-semibold tracking-tight text-text">
          {profile.location}
        </div>
        <div className="mt-2 flex items-baseline gap-2 text-text-muted">
          <span className="font-mono text-3xl text-text">{time || "--:--:--"}</span>
          <span className="text-xs uppercase tracking-wider">local time</span>
        </div>
      </div>
    </div>
  );
}
