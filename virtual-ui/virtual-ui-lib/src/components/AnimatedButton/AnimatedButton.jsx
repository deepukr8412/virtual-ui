import React, { useState, useEffect } from "react";

export const AnimatedButton = ({
  text = "Hover Me",
  bg = "#6366f1",
  color = "#fff",
  size = "md",
  disabled = false,
  loading = false,
  onClick = () => {},
  animationSpeed = 0.4
}) => {
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  const buttonRef = React.useRef(null);
  
  const sizes = { sm: "8px 16px", md: "12px 24px", lg: "16px 32px" };
  const fontSize = { sm: "13px", md: "15px", lg: "17px" };
  
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
    onClick();
  };
  
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);
  
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: bg,
        color: color,
        padding: sizes[size],
        borderRadius: "12px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "700",
        fontSize: fontSize[size],
        fontFamily: "system-ui,sans-serif",
        boxShadow: hovered ? "0 8px 24px " + alpha(bg, 0.4) : "0 4px 12px " + alpha(bg, 0.3),
        opacity: disabled ? 0.6 : 1,
        transition: `all ${animationSpeed}s ease`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        minWidth: "120px"
      }}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            top: ripple.y + "px",
            left: ripple.x + "px",
            transform: "translate(-50%, -50%)",
            width: "0px",
            height: "0px",
            borderRadius: "50%",
            background: alpha(color, 0.3),
            animation: `ripple ${animationSpeed}s ease-out forwards`,
            pointerEvents: "none"
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ripple {
            to {
              width: 200px;
              height: 200px;
              opacity: 0;
            }
          }
        `
      }} />
      {loading ? "Loading..." : text}
    </button>
  );
};