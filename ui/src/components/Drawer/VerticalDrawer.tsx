import { ReactNode, useEffect, useState } from "react";

interface DrawerProps {
  children: ReactNode;
  direction: number;

}
export const Drawer: React.FC<DrawerProps> = ({
  children,
  direction,
}) => {
  const [open, setOpen] = useState(true);
  const [directionArrow, setDirectionArrow] = useState("=>");

  // Update arrow once on mount based on direction
  useEffect(() => {
    switch (direction) {
      case 1:
        setDirectionArrow("⤊");
        break;
      case 2:
        setDirectionArrow("=>");
        break;
      case 3:
        setDirectionArrow("⤋");
        break;
      case 4:
        setDirectionArrow("<=");
        break;
      default:
        setDirectionArrow("?");
    }
  }, [direction]);

  return (
    <div className={`drawer ${open ? "drawer--hidden" : ""}`}>
      <div className="drawer__content">
        {children}
      </div>
      <div className="drawer__button__container">
        <button className="drawer__button" onClick={() => setOpen(!open)}>
          {directionArrow}
        </button>
      </div>
    </div>
  );
};
