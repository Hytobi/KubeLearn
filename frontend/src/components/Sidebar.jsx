import React from 'react';
import KubeComponent from './KubeComponent';
import { kubernetesComponents } from '../mockData';
import { Package } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <Package className="w-4 h-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">Composants disponibles</h2>
        </div>
        <p className="text-xs text-gray-500">Glisse dans le cluster →</p>
      </div>
      
      <div className="space-y-3">
        {kubernetesComponents.map((component) => (
          <KubeComponent key={component.id} component={component} isInSidebar={true} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;