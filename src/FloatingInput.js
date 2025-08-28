import React, { useState } from "react";

function FloatingInput({ inputText, setInputText, handleSubmit }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(6px)",
    borderRadius: "50px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: isHovered || isFocused ? "10px 16px" : "6px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: isHovered || isFocused ? "clamp(400px, 70%, 800px)" : "clamp(300px, 50%, 600px)",
    transition: "all 0.3s ease",
  };

  const inputStyle = {
    backgroundColor: "transparent",
    outline: "none",
    boxShadow: "none",
    flex: 1,
    resize: "none",
    height: isFocused ? "70px" : "38px",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    border: "none",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="text"
        className="form-control border-0"
        placeholder="Enter your query..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        style={inputStyle}
      />
      <button
        className="btn btn-primary rounded-pill px-3"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default FloatingInput;
