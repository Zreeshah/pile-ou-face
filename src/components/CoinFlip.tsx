import { useState, useCallback, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Helmet } from "react-helmet-async";
import coinPile from "@/assets/coin-pile.png";
import coinFace from "@/assets/coin-face.png";
import coinFlipSound from "@/assets/coin-flip-sound.mp3";

type Result = "pile" | "face" | null;

export const CoinFlip = () => {
  const [result, setResult] = useState<Result>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showFace, setShowFace] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(coinFlipSound);
  }, []);

  const playSound = useCallback(() => {
    if (!soundEnabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [soundEnabled]);

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);
    playSound();

    // Random result
    const newResult: Result = Math.random() < 0.5 ? "pile" : "face";

    // Set which side to show after animation
    setTimeout(() => {
      setShowFace(newResult === "face");
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
      <Helmet>
        <link rel="preload" as="image" href={coinPile} type="image/png" />
      </Helmet>

      {/* Sound toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        aria-label={soundEnabled ? "Désactiver le son" : "Activer le son"}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-muted-foreground" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Coin Container */}
      <div className="coin-container">
        <div className={`coin ${isFlipping ? "flipping" : ""}`}>
          {/* Show the appropriate side based on result */}
          <div 
            className="coin-image"
            style={{
              opacity: !isFlipping && showFace ? 0 : 1,
            }}
          >
            <img 
              src={coinPile} 
              alt="Pile - 1 Euro" 
              width="175"
              height="175"
              decoding="async"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <div 
            className="coin-image coin-image-back"
            style={{
              opacity: !isFlipping && showFace ? 1 : 0,
            }}
          >
            <img 
              src={coinFace} 
              alt="Face - 1 Euro" 
              width="175"
              height="175"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
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
