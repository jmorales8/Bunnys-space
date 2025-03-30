import React, { useState } from 'react';
import './floatingDrawer.scss';
import AudioPlayer from '../Sound/Player';

const FloatingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(prev => !prev);

  return (
    <>
      <div className={`floating-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <AudioPlayer />
        </div>
      </div>

      <button
        className={`floating-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleDrawer}
      >
        {isOpen ? '⇚' : '⇛'}
      </button>
    </>
  );
};

export default FloatingDrawer;
