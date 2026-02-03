import { useState, useCallback, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Result = "pile" | "face" | null;

export const CoinFlip = () => {
  const [result, setResult] = useState<Result>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const coinRef = useRef<HTMLDivElement>(null);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create a simple coin flip sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }, [soundEnabled]);

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    playSound();

    // Random result
    const newResult: Result = Math.random() < 0.5 ? "pile" : "face";
    
    // Set the final rotation based on result
    const finalRotation = newResult === "pile" ? "0deg" : "180deg";
    
    if (coinRef.current) {
      coinRef.current.style.setProperty("--final-rotation", finalRotation);
    }

    setTimeout(() => {
      setResult(newResult);
      setIsFlipping(false);
      setFlipCount((prev) => prev + 1);
    }, 1500);
  }, [isFlipping, playSound]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        flipCoin();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [flipCoin]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Sound toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        aria-label={soundEnabled ? "Désactiver le son" : "Activer le son"}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-muted-foreground" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Coin */}
      <div className="relative perspective-1000">
        <div
          ref={coinRef}
          className={`coin ${isFlipping ? "flipping" : ""}`}
          style={{
            transform: result === "face" ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="coin-face front shine">
            <span>P</span>
          </div>
          <div className="coin-face back shine">
            <span>F</span>
          </div>
        </div>
      </div>

      {/* Result display */}
      <div className="h-20 flex items-center justify-center">
        {result && !isFlipping && (
          <div className="text-center animate-scale-in">
            <p className="result-display">{result === "pile" ? "Pile" : "Face"}</p>
            <p className="text-muted-foreground mt-2">
              Lancers effectués : {flipCount}
            </p>
          </div>
        )}
        {isFlipping && (
          <p className="text-xl text-muted-foreground animate-pulse">
            La pièce tourne...
          </p>
        )}
        {!result && !isFlipping && (
          <p className="text-lg text-muted-foreground">
            Cliquez sur le bouton pour lancer
          </p>
        )}
      </div>

      {/* Flip button */}
      <button
        onClick={flipCoin}
        disabled={isFlipping}
        className="btn-flip disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Lancer la pièce"
      >
        🪙 Lancer la pièce
      </button>

      <p className="text-sm text-muted-foreground">
        Ou appuyez sur <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Espace</kbd>
      </p>
    </div>
  );
};
