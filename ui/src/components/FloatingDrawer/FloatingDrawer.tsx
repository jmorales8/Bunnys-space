import React, { useContext, useState } from 'react';
import './floatingDrawer.scss';
import AudioPlayer from '../Sound/Player';
import { ThemeContext } from '../../context/ThemeContext';

const FloatingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(prev => !prev);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;

  return (
    <>
      <div className={`floating-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <AudioPlayer />
        </div>
      </div>

      <button
        className={`floating-toggle ${isOpen ? 'open' : ''} ${isDarkMode ? "floating-toggle__night" : ""}`}
        onClick={toggleDrawer}
      >
        {isOpen ? '⇚' : '⇛'}
      </button>
    </>
  );
};

export default FloatingDrawer;
