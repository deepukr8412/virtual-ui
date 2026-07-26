import React, { useState } from "react";

export const Calculator = ({
  bg = "#0f172a",
  buttonBg = "#1e293b",
  accent = "#6366f1",
  textColor = "#ffffff",
  secondaryText = "rgba(255,255,255,0.5)",
  width = "320px"
}) => {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const clear = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const deleteChar = () => {
    if (currentValue.length === 1) {
      setCurrentValue("0");
      setOverwrite(true);
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  const addDigit = (digit) => {
    if (currentValue === "0" || overwrite) {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue(currentValue + digit);
    }
  };

  const addDecimal = () => {
    if (overwrite) {
      setCurrentValue("0.");
      setOverwrite(false);
      return;
    }

    if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
    }
  };

  const selectOperation = (op) => {
    if (currentValue === "0" && op === "-") {
      setCurrentValue("-");
      setOverwrite(false);
      return;
    }

    if (currentValue === "-") return;

    if (previousValue) {
      const result = calculate();
      setCurrentValue(String(result));
      setPreviousValue(String(result));
    } else {
      setPreviousValue(currentValue);
    }
    setOperation(op);
    setOverwrite(true);
  };

  const calculate = () => {
    if (!previousValue || !operation) return parseFloat(currentValue);

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operation) {
      case "+": return prev + current;
      case "-": return prev - current;
      case "×": return prev * current;
      case "÷": return prev / current;
      default: return current;
    }
  };

  const equals = () => {
    if (!previousValue || !operation) return;

    const result = calculate();
    setCurrentValue(String(result));
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const buttonStyle = (isAccent = false, isOperation = false) => ({
    background: isAccent ? accent : isOperation ? alpha(accent, 0.15) : buttonBg,
    color: isAccent ? "#fff" : isOperation ? accent : textColor,
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "600",
    height: "60px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "system-ui, sans-serif",
    boxShadow: isAccent ? "0 4px 14px " + alpha(accent, 0.3) : "none"
  });

  return (
    <div style={{
      background: bg,
      borderRadius: "20px",
      padding: "20px",
      width: width,
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        color: secondaryText,
        fontSize: "14px",
        height: "20px",
        textAlign: "right",
        marginBottom: "4px",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}>
        {previousValue} {operation}
      </div>
      <div style={{
        color: textColor,
        fontSize: "36px",
        fontWeight: "700",
        textAlign: "right",
        marginBottom: "20px",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}>
        {currentValue}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px"
      }}>
        <button onClick={clear} style={buttonStyle(false, true)}>AC</button>
        <button onClick={deleteChar} style={buttonStyle(false, true)}>DEL</button>
        <button onClick={() => selectOperation("÷")} style={buttonStyle(false, true)}>÷</button>
        <button onClick={() => selectOperation("×")} style={buttonStyle(false, true)}>×</button>
        <button onClick={() => addDigit("7")} style={buttonStyle()}>7</button>
        <button onClick={() => addDigit("8")} style={buttonStyle()}>8</button>
        <button onClick={() => addDigit("9")} style={buttonStyle()}>9</button>
        <button onClick={() => selectOperation("-")} style={buttonStyle(false, true)}>-</button>
        <button onClick={() => addDigit("4")} style={buttonStyle()}>4</button>
        <button onClick={() => addDigit("5")} style={buttonStyle()}>5</button>
        <button onClick={() => addDigit("6")} style={buttonStyle()}>6</button>
        <button onClick={() => selectOperation("+")} style={buttonStyle(false, true)}>+</button>
        <button onClick={() => addDigit("1")} style={buttonStyle()}>1</button>
        <button onClick={() => addDigit("2")} style={buttonStyle()}>2</button>
        <button onClick={() => addDigit("3")} style={buttonStyle()}>3</button>
        <button onClick={equals} style={buttonStyle(true)}>=</button>
        <button onClick={() => addDigit("0")} style={buttonStyle()}>0</button>
        <button onClick={addDecimal} style={buttonStyle()}>.</button>
        <button onClick={equals} style={buttonStyle(true)} colSpan={2}>=</button>
      </div>
    </div>
  );
};