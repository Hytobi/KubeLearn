import React, { useState } from 'react';
import DroppedComponent from './DroppedComponent';

const DroppableZone = ({ droppedItems, onDrop, onRemove }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const clusterItems = droppedItems.filter(item => !item.parentId);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const item = JSON.parse(data);
        onDrop(item, null);
      }
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex-1 min-h-[500px] rounded-xl p-6 transition-all duration-300"
      style={{
        backgroundColor: isDragOver ? '#DBEAFE' : '#F9FAFB',
        border: `3px dashed ${isDragOver ? '#3B82F6' : '#D1D5DB'}`,
      }}
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-3">
          <span className="text-4xl">📦</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Zone de construction</h3>
        <p className="text-sm text-gray-500">Glisse les composants ici depuis le panneau gauche</p>
      </div>

      <div className="space-y-4">
        {clusterItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Commence par glisser un composant ici</p>
          </div>
        ) : (
          clusterItems.map((item) => (
            <DroppedComponent
              key={item.uniqueId}
              item={item}
              allItems={droppedItems}
              onDrop={onDrop}
              onRemove={onRemove}
              level={0}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DroppableZone;