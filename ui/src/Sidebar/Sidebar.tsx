import React, { useState, useRef, useEffect } from "react";
import { navButtons } from "../NavigationBar/NavigationBar";
import { Link } from "react-router-dom";

export const SidebarOverlay: React.FC = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar if clicked outside
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

  return (
    <div>
      <button onClick={() => setOpen(true)} className="toggle-button">
        Open Sidebar
      </button>
      {open && <div className="backdrop" />}

      <div ref={sidebarRef} className={`sidebar ${open ? "open" : ""}`}>
        <button
          onClick={() => setOpen(false)}
          className="toggle-button__inside"
        >
          Close
        </button>
        <div className="sidebar__buttons">
          {navButtons.map((button) => (
            <Link
              key={button.path}
              className="sidebar__button"
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
