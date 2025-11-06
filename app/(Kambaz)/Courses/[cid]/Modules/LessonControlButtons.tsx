import React from "react";
import { BsPlus } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckMark";

type Props = {
  moduleId: string;
  isAddOpen?: boolean;
  onToggleAdd: () => void;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
};

export default function LessonRowControls({
  moduleId,
  isAddOpen = false,
  onToggleAdd,
  deleteModule,
  editModule,
}: Props) {
  const container: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "6px 10px",
    borderRadius: 12,
    background: "transparent",
    boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
    border: "1px solid rgba(16,24,40,0.06)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  };

  const buttonBase: React.CSSProperties = {
    height: 34,
    width: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    transition:
      "transform .15s ease, box-shadow .15s ease, background-color .15s ease",
    background: "transparent",
  };

  const plusStyle: React.CSSProperties = {
    ...buttonBase,
    background: isAddOpen
      ? "linear-gradient(180deg,#e6fffa,#ccfbf1)"
      : "transparent",
    boxShadow: isAddOpen ? "0 6px 14px rgba(6,95,70,0.12)" : undefined,
    color: isAddOpen ? "#065f46" : "#047857",
    border: isAddOpen
      ? "1px solid rgba(6,95,70,0.08)"
      : "1px solid rgba(4,120,87,0.06)",
  };

  const iconBtnStyle: React.CSSProperties = {
    ...buttonBase,
    color: "#374151",
  };

  const iconHover = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLButtonElement;
    el.style.transform = "translateY(-2px) scale(1.03)";
    el.style.boxShadow = "0 6px 14px rgba(15,23,42,0.08)";
  };

  const iconUnhover = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLButtonElement;
    el.style.transform = "none";
    el.style.boxShadow = "none";
  };

  const separator: React.CSSProperties = {
    width: 1,
    height: 28,
    background: "rgba(15,23,42,0.06)",
    borderRadius: 1,
  };

  return (
    <div style={container} role="group" aria-label="Module lesson controls">
      <button
        aria-pressed={isAddOpen}
        aria-label={isAddOpen ? "Close add lesson" : "Add lesson"}
        title={isAddOpen ? "Close add lesson" : "Add lesson"}
        onClick={onToggleAdd}
        onMouseEnter={iconHover}
        onMouseLeave={iconUnhover}
        style={plusStyle}
      >
        <BsPlus size={16} />
      </button>

      <div style={separator} aria-hidden />

      {/* Action buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => editModule(moduleId)}
          onMouseEnter={iconHover}
          onMouseLeave={iconUnhover}
          aria-label="Edit module"
          title="Edit module"
          style={iconBtnStyle}
        >
          <FaPencil size={16} />
        </button>

        <button
          onClick={() => deleteModule(moduleId)}
          onMouseEnter={iconHover}
          onMouseLeave={iconUnhover}
          aria-label="Delete module"
          title="Delete module"
          style={{ ...iconBtnStyle, color: "#b91c1c" }}
        >
          <FaTrash size={16} />
        </button>

        <div style={{ display: "flex", alignItems: "center", marginLeft: 4 }}>
          <GreenCheckmark />
        </div>
      </div>
    </div>
  );
}
