import { useCallback, useRef, useState } from "react";
import { Dices, RotateCcw } from "lucide-react";
import { De } from "@/components/De";
import { rollMany } from "@/data/des";

const ROLL_MS = 1500; // match the coin/die tumble duration

// Interactive dice roller. The value is drawn from the RNG BEFORE the animation;
// the tumble only visualises it. Initial value is deterministic (= faces) so the
// server-rendered result matches hydration exactly.
export const DiceStage = ({ faces, count = 1 }: { faces: number; count?: number }) => {
  const [values, setValues] = useState<number[]>(() => Array(count).fill(faces));
  const [rolling, setRolling] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [rolled, setRolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roll = useCallback(() => {
    if (timer.current) clearTimeout(timer.current); // interrupt, don't queue
    setValues(rollMany(count, faces)); // RNG first
    setRolled(true);
    setRolling(true);
    setNonce((n) => n + 1); // changes De key → clean animation restart
    timer.current = setTimeout(() => setRolling(false), ROLL_MS);
  }, [count, faces]);

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setValues(Array(count).fill(faces));
    setRolling(false);
    setRolled(false);
  };

  const sum = values.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4 min-h-36">
        {values.map((v, i) => (
          <De key={`${nonce}-${i}`} faces={faces} valeur={v} rolling={rolling} index={i} />
        ))}
      </div>

      <div className="text-center h-14" aria-live="polite">
        <p className="text-lg">
          <span className="text-muted-foreground">Résultat : </span>
          <strong className="text-2xl font-display text-primary tabular-nums">
            {rolling ? "…" : count > 1 ? `${sum}` : values[0]}
          </strong>
          {count > 1 && !rolling && (
            <span className="text-sm text-muted-foreground"> ({values.join(" + ")})</span>
          )}
        </p>
        {!rolled && !rolling && (
          <p className="text-sm text-muted-foreground">Cliquez sur « Lancer » pour {count > 1 ? "lancer les dés" : "lancer le dé"}</p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={roll} className="btn-flip flex items-center gap-2">
          <Dices className="w-5 h-5" /> {count > 1 ? "Lancer les dés" : "Lancer le dé"}
        </button>
        {rolled && (
          <button onClick={reset} className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
};
