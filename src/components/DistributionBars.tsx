import { rowsForN } from "@/data/probabilites";

// ponytail: CSS bars, not a chart lib. Renders server-side (text ships in the
// prerendered HTML) and can't cause a hydration mismatch. Highlights the k column.
export const DistributionBars = ({ n, highlightK }: { n: number; highlightK?: number }) => {
  const rows = rowsForN(n);
  const maxProb = Math.max(...rows.map((r) => r.probability));

  return (
    <figure className="w-full">
      <div className="flex items-end gap-1.5 overflow-x-auto pb-2" role="img"
        aria-label={`Distribution du nombre de piles sur ${n} lancers`}>
        {rows.map((r) => {
          const active = r.k === highlightK;
          return (
            <div key={r.k} className="flex flex-col items-center gap-1 min-w-8 flex-1">
              <span className={`text-[11px] tabular-nums ${active ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {r.percentage.replace(" %", "")}
              </span>
              <div className="w-full flex items-end" style={{ height: 140 }}>
                <div
                  className={`w-full rounded-t transition-colors ${active ? "bg-primary" : "bg-primary/25"}`}
                  style={{ height: `${(r.probability / maxProb) * 100}%` }}
                  title={`${r.k} piles : ${r.percentage}`}
                />
              </div>
              <span className={`text-xs tabular-nums ${active ? "text-primary font-bold" : "text-muted-foreground"}`}>
                {r.k}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Nombre de piles (en abscisse) et sa probabilité sur {n} lancers. En pourcentage au-dessus de chaque barre.
      </figcaption>
    </figure>
  );
};
