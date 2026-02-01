import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const CelebrationScreen = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string; color: string }>>([]);

  useEffect(() => {
    // Generate confetti hearts
    const hearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: [
        "text-primary",
        "text-valentine-rose",
        "text-valentine-pink",
        "text-valentine-gold",
      ][Math.floor(Math.random() * 4)],
    }));
    setConfetti(hearts);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-valentine-blush via-background to-valentine-pink">
      {/* Confetti Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map((heart) => (
          <div
            key={heart.id}
            className={`absolute ${heart.color} animate-confetti-fall`}
            style={{
              left: heart.left,
              top: "-50px",
              animationDelay: heart.delay,
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </div>
        ))}
      </div>

      {/* Celebration Content */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-lg animate-scale-in">
          <div className="rounded-3xl bg-card/90 backdrop-blur-sm p-8 md:p-12 shadow-2xl border border-valentine-pink/30 text-center">
            {/* Large Heart */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="w-24 h-24 text-primary fill-primary animate-heart-beat" />
                <Heart className="absolute inset-0 w-24 h-24 text-primary/30 fill-primary/30 animate-ping" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="font-script text-4xl md:text-5xl text-primary mb-4 leading-relaxed">
              I knew you'd say yes!
            </h1>
            
            <p className="font-elegant text-xl text-muted-foreground mb-8">
              You've made me the happiest person 💕
            </p>

            {/* Romantic Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop"
                alt="Romantic roses"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Decorative Hearts */}
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-valentine-rose fill-valentine-rose"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationScreen;
