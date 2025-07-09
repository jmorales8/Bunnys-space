import React, { useState, useRef, useEffect } from "react";
import { navButtons } from "../NavigationBar/NavigationBar";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <button onClick={() => setOpen(true)} className="sidebar__toggle__open">
        Open Sidebar
      </button>
      {open && <div className="sidebar__backdrop" />}

      <div ref={sidebarRef} className={`${open ? "sidebar__opened" : "sidebar"}`}>
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
