import React, { useState, lazy, Suspense } from 'react';
import { Trash2 } from 'lucide-react';
import { kubernetesComponents } from '../mockData';

// Lazy load to break recursion
const LazyDroppedComponent = lazy(() => import('./DroppedComponentWrapper'));

function DroppedComponent({ item, allItems, onDrop, onRemove, level = 0 }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const componentDef = kubernetesComponents.find(c => c.id === item.type);
  const children = allItems.filter(i => i.parentId === item.uniqueId);
  const canAcceptChildren = componentDef?.canContain && componentDef.canContain.length > 0;

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({
      ...item,
      isNew: false
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!canAcceptChildren) return;
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const draggedItem = JSON.parse(data);
        const canDrop = 
          draggedItem.uniqueId !== item.uniqueId &&
          draggedItem.parentId !== item.uniqueId &&
          componentDef.canContain.includes(draggedItem.type || draggedItem.id);
        
        if (canDrop) {
          setIsDragOver(true);
          e.dataTransfer.dropEffect = 'move';
        }
      }
    } catch (err) {
      // Ignore parse errors during drag
    }
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (!canAcceptChildren) return;
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const draggedItem = JSON.parse(data);
        onDrop(draggedItem, item.uniqueId);
      }
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  if (!componentDef) return null;

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="transition-all duration-200"
      style={{
        marginLeft: `${level * 20}px`,
      }}
    >
      <div
        className="p-4 rounded-lg border-2 transition-all cursor-move group relative"
        style={{
          backgroundColor: componentDef.color || '#fff',
          borderColor: isDragOver ? '#3B82F6' : '#E5E7EB',
          boxShadow: isDragOver ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{componentDef.icon}</span>
            <div>
              <div className="font-semibold text-gray-800">{componentDef.name}</div>
              <div className="text-xs text-gray-600">{componentDef.description}</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.uniqueId);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-lg"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>

        {isDragOver && (
          <div className="mt-2 text-xs text-blue-600 font-medium">
            Dépose ici pour ajouter à l'intérieur
          </div>
        )}

        {children.length > 0 && (
          <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-300">
            <Suspense fallback={<div>Loading...</div>}>
              {children.map((child) => (
                <LazyDroppedComponent
                  key={child.uniqueId}
                  item={child}
                  allItems={allItems}
                  onDrop={onDrop}
                  onRemove={onRemove}
                  level={level + 1}
                />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

export default DroppedComponent;
