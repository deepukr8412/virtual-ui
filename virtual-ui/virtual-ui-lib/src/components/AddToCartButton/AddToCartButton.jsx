import React, { useState } from "react";

export const AddToCartButton = ({
  text = "Add to Cart",
  accent = "#7c3aed",
  bg = "#0f172a",
  size = "md",
  icon = true,
  quantity = 1,
  onClick = () => {}
}) => {
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(quantity);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const sizes = { sm: "8px 12px", md: "12px 20px", lg: "14px 28px" };
  const handleClick = () => {
    setAdded(true);
    onClick(count);
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", background: alpha(accent, 0.1), borderRadius: "8px", border: "1px solid " + alpha(accent, 0.2) }}>
        <button 
          onClick={() => setCount(prev => Math.max(1, prev - 1))}
          style={{
            background: "transparent",
            border: "none",
            color: accent,
            fontSize: "16px",
            fontWeight: "700",
            padding: "4px 10px",
            cursor: "pointer"
          }}
        >
          -
        </button>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff", padding: "0 8px" }}>{count}</span>
        <button 
          onClick={() => setCount(prev => prev + 1)}
          style={{
            background: "transparent",
            border: "none",
            color: accent,
            fontSize: "16px",
            fontWeight: "700",
            padding: "4px 10px",
            cursor: "pointer"
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={handleClick}
        style={{
          background: added ? "#059669" : accent,
          color: "#fff",
          padding: sizes[size],
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "14px",
          fontFamily: "system-ui,sans-serif",
          boxShadow: "0 4px 14px " + alpha(accent, 0.4),
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minWidth: "120px",
          justifyContent: "center"
        }}
      >
        {icon && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        )}
        {added ? "Added!" : text}
      </button>
    </div>
  );
};