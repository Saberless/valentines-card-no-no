import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = [
    { size: "w-8 h-8", left: "5%", top: "10%", delay: "0s", duration: "float" },
    { size: "w-6 h-6", left: "15%", top: "70%", delay: "1s", duration: "float-slow" },
    { size: "w-10 h-10", left: "80%", top: "15%", delay: "2s", duration: "float" },
    { size: "w-5 h-5", left: "90%", top: "60%", delay: "0.5s", duration: "float-slow" },
    { size: "w-7 h-7", left: "70%", top: "80%", delay: "1.5s", duration: "float" },
    { size: "w-4 h-4", left: "25%", top: "30%", delay: "2.5s", duration: "float-slow" },
    { size: "w-6 h-6", left: "60%", top: "40%", delay: "0.8s", duration: "float" },
    { size: "w-8 h-8", left: "40%", top: "85%", delay: "1.2s", duration: "float-slow" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart, index) => (
        <div
          key={index}
          className={`absolute ${heart.size} text-valentine-pink/40 animate-${heart.duration}`}
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
          }}
        >
          <Heart className="w-full h-full fill-current" />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
