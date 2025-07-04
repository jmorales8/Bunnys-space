import React, { useContext, useState, ReactNode } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface FloatingDrawerProps {
  children: ReactNode;
}

const FloatingDrawer: React.FC<FloatingDrawerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(prev => !prev);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("FloatingDrawer must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;

  return (
    <>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer__content">
          {children}
        </div>
      </div>

      <button
        className={`drawer__toggle ${isOpen ? 'open' : ''} ${isDarkMode ? 'drawer__toggle__night' : ''}`}
        onClick={toggleDrawer}
        aria-label="Toggle drawer"
      >
        {isOpen ? '⇚' : '⇛'}
      </button>
    </>
  );
};

export default FloatingDrawer;
