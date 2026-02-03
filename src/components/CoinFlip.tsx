import { useState, useCallback, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import coinPile from "@/assets/coin-pile.png";
import coinFace from "@/assets/coin-face.png";

type Result = "pile" | "face" | null;

export const CoinFlip = () => {
  const [result, setResult] = useState<Result>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(0);
  const coinRef = useRef<HTMLDivElement>(null);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create coin flip sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Multiple oscillators for a richer coin sound
    const playTone = (freq: number, delay: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + delay);
      oscillator.frequency.exponentialRampToValueAtTime(freq * 0.7, audioContext.currentTime + delay + duration);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + delay + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + duration);
      
      oscillator.start(audioContext.currentTime + delay);
      oscillator.stop(audioContext.currentTime + delay + duration);
    };

    // Coin flip sound sequence
    playTone(2000, 0, 0.1);
    playTone(1800, 0.15, 0.08);
    playTone(1600, 0.28, 0.08);
    playTone(1400, 0.4, 0.1);
    playTone(1200, 0.55, 0.15);
    // Landing sound
    playTone(800, 1.4, 0.2);
  }, [soundEnabled]);

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    playSound();

    // Random result
    const newResult: Result = Math.random() < 0.5 ? "pile" : "face";
    
    // Calculate rotation: multiple full spins + final position
    // Pile = 0deg (or 360deg multiples), Face = 180deg
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 full rotations
    const baseRotation = spins * 360;
    const finalRotation = newResult === "pile" ? baseRotation : baseRotation + 180;
    
    setCurrentRotation(finalRotation);

    setTimeout(() => {
      setResult(newResult);
      setIsFlipping(false);
      setFlipCount((prev) => prev + 1);
    }, 1600);
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

      {/* 3D Coin Container */}
      <div className="coin-scene">
        <div
          ref={coinRef}
          className={`coin-3d ${isFlipping ? "flipping" : ""}`}
          style={{
            transform: `rotateY(${currentRotation}deg)`,
          }}
        >
          {/* Pile side (number "1") */}
          <div className="coin-side coin-side-pile">
            <img 
              src={coinPile} 
              alt="Pile - 1 Euro" 
              className="w-full h-full object-cover rounded-full"
              draggable={false}
            />
          </div>
          
          {/* Face side (French tree) */}
          <div className="coin-side coin-side-face">
            <img 
              src={coinFace} 
              alt="Face - 1 Euro" 
              className="w-full h-full object-cover rounded-full"
              draggable={false}
            />
          </div>
          
          {/* Coin edge */}
          <div className="coin-edge"></div>
        </div>
      </div>

      {/* Result display */}
      <div className="h-20 flex items-center justify-center">
        {result && !isFlipping && (
          <div className="text-center animate-scale-in">
            <p className="result-display">{result === "pile" ? "Pile !" : "Face !"}</p>
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
