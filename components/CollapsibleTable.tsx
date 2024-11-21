import React, { useState } from 'react';

const CollapsibleTable = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="mt-4 overflow-hidden overflow-x-hidden">
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="px-4 py-2 bg-green-500 rounded"
      >
        {isCollapsed ? 'Expandir Lista' : 'Esconder Lista'}
      </button>
      
      {!isCollapsed && children}
    </div>
  );
};

export default CollapsibleTable;
