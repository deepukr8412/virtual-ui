import React from "react";

export const Button = ({ text = "Click Me", bg = "#6366f1", color = "#fff", size = "md", disabled = false, onClick = () => {} }) => {
  const sizes = { sm: "8px 16px", md: "11px 24px", lg: "14px 32px" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        color: color,
        padding: sizes[size],
        borderRadius: "10px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "700",
        fontSize: "15px",
        fontFamily: "system-ui,sans-serif",
        boxShadow: "0 4px 14px " + bg.replace(")0.4", ")"),
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s"
      }}
    >
      {text}
    </button>
  );
};