import React from 'react';

const KubeComponent = ({ component, isInSidebar = false }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({
      ...component,
      isNew: isInSidebar
    }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-move transition-all duration-200 hover:scale-105"
    >
      <div
        className="p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"
        style={{ backgroundColor: component.color }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{component.icon}</span>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">{component.name}</div>
            <div className="text-xs text-gray-600">{component.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KubeComponent;