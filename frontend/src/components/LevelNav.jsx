import React from 'react';
import { Check } from 'lucide-react';

const LevelNav = ({ levels, currentLevel, currentStageId, onLevelChange, completedStages }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-6 py-3 border-b border-gray-200">
      {levels.map((level, idx) => {
        const isActive = level.id === currentLevel;
        const isCompleted = level.stages.every(stage => completedStages.includes(stage.id));
        
        return (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
              isActive 
                ? 'bg-opacity-10 border-2' 
                : 'hover:bg-gray-50 border-2 border-transparent'
            }`}
            style={{
              backgroundColor: isActive ? `${level.color}20` : 'transparent',
              borderColor: isActive ? level.color : 'transparent',
              color: level.color,
            }}
          >
            <span>{level.icon}</span>
            <span>{level.name}</span>
            {isCompleted && (
              <Check className="w-4 h-4" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LevelNav;