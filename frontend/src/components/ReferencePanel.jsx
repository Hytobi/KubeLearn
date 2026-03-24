import React from 'react';
import { kubernetesComponents } from '../mockData';
import { BookOpen } from 'lucide-react';

const ReferencePanel = ({ currentStage }) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <BookOpen className="w-4 h-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">Fiche de référence</h2>
        </div>
      </div>
      
      <div className="space-y-4">
        {kubernetesComponents.map((component) => (
          <div key={component.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{component.icon}</span>
              <h3 className="font-semibold text-gray-800">{component.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{component.fullDescription}</p>
            <div className="bg-gray-50 rounded p-2 mt-2">
              <code className="text-xs text-blue-600 whitespace-pre-wrap break-all">{component.command}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferencePanel;