import React, { useState, useRef, useEffect, useContext } from "react";
import { navButtons } from "../NavigationBar/NavigationBar";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export const SidebarOverlay: React.FC = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
const sidebarClass = open
  ? isDarkMode
    ? "sidebar__opened__night"
    : "sidebar__opened"
  : "sidebar";

  return (
    <div>
      <button onClick={() => setOpen(true)} className="sidebar__toggle__open">
        Open Sidebar
      </button>
      {open && <div className="sidebar__backdrop" />}

      <div ref={sidebarRef} className={`
        ${isDarkMode ? `${open ? "sidebar__opened__night" : "sidebar__night"}` : `${open ? "sidebar__opened" : "sidebar"}`}
        `}>
        <button
          onClick={() => setOpen(false)}
          className="sidebar__toggle__close"
        >
          Close
        </button>
        <div className="sidebar__buttons">
          {navButtons.map((button) => (
            <Link
              key={button.path}
              className={isDarkMode ? "sidebar__button__night" : "sidebar__button"}
              to={button.path}
              onClick={() => setOpen(false)}
            >
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
