import React, { useState } from 'react';
import './floatingDrawer.scss';

const FloatingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(prev => !prev);

  return (
    <>
      <div className={`floating-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <h2>Mini Panel</h2>
          <p>This is a floating panel that slides in with a button on its edge.</p>
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
