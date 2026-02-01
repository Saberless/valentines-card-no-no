import { useState, useRef, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "./FloatingHearts";
import CelebrationScreen from "./CelebrationScreen";

const ValentineCard = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const moveNoButton = useCallback(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 50;
    const padding = 20;
    
    // Calculate bounds within the viewport (not just the card)
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    const newX = Math.random() * (maxX - padding) + padding;
    const newY = Math.random() * (maxY - padding) + padding;
    
    setNoButtonPosition({ x: newX, y: newY });
    setIsNoButtonMoved(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !noButtonRef.current || accepted) return;
    
    const button = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + 
      Math.pow(e.clientY - buttonCenterY, 2)
    );
    
    // Move away when cursor gets within 100px
    if (distance < 100) {
      moveNoButton();
    }
  }, [isMobile, accepted, moveNoButton]);

  const handleNoClick = () => {
    if (isMobile) {
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  if (accepted) {
    return <CelebrationScreen />;
  }

  return (
    <div 
      ref={cardRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-valentine-blush via-background to-valentine-pink"
      onMouseMove={handleMouseMove}
    >
      <FloatingHearts />
      
      {/* Main Card */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-lg animate-fade-in-up">
          <div className="rounded-3xl bg-card/90 backdrop-blur-sm p-8 md:p-12 shadow-2xl border border-valentine-pink/30">
            {/* Decorative heart */}
            <div className="flex justify-center mb-6">
              <Heart 
                className="w-16 h-16 text-primary fill-primary animate-heart-beat" 
              />
            </div>
            
            {/* Main Question */}
            <h1 className="font-script text-4xl md:text-6xl text-center text-primary mb-8 leading-relaxed">
              Will you be my Valentine?
            </h1>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-valentine-rose" />
              <Heart className="w-4 h-4 text-valentine-rose fill-valentine-rose" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-valentine-rose" />
            </div>
            
            {/* Buttons */}
            <div className="flex justify-center gap-6">
              <Button
                onClick={handleYesClick}
                className="px-8 py-6 text-lg font-elegant font-semibold bg-primary hover:bg-valentine-deep-red text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Yes! 💕
              </Button>
              
              {!isNoButtonMoved && (
                <Button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  variant="outline"
                  className="px-8 py-6 text-lg font-elegant font-semibold border-2 border-muted-foreground/30 text-muted-foreground hover:bg-muted rounded-full transition-all duration-300"
                >
                  No
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Escaped No Button */}
      {isNoButtonMoved && (
        <Button
          ref={noButtonRef}
          onClick={handleNoClick}
          variant="outline"
          style={{
            position: "fixed",
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transition: "all 0.3s ease-out",
          }}
          className="px-8 py-6 text-lg font-elegant font-semibold border-2 border-muted-foreground/30 text-muted-foreground hover:bg-muted rounded-full z-50"
        >
          No
        </Button>
      )}
    </div>
  );
};

export default ValentineCard;
