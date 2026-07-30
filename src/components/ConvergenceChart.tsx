import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip,
} from "recharts";

// Client-only line chart (recharts is already a dependency). Gated behind a mount
// flag so it never renders during SSR — the surrounding numbers carry the meaning
// in the prerendered HTML; this is progressive enhancement.
export const ConvergenceChart = ({
  data, target, targetLabel, yLabel,
}: {
  data: { x: number; value: number }[];
  target: number;
  targetLabel: string;
  yLabel: string;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || data.length === 0) {
    return <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">Le graphique s'affiche après le premier lancer.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={224}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -8 }}>
        <XAxis dataKey="x" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
        <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={["auto", "auto"]}
          label={{ value: yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(var(--muted-foreground))" } }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }}
          formatter={(v: number) => [`${v.toFixed(2)} %`, yLabel]}
          labelFormatter={(l) => `Lancer ${l}`} />
        <ReferenceLine y={target} stroke="hsl(var(--primary))" strokeDasharray="4 4"
          label={{ value: targetLabel, position: "insideTopRight", style: { fontSize: 11, fill: "hsl(var(--primary))" } }} />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
