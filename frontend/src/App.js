import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import DroppableZone from './components/DroppableZone';
import ReferencePanel from './components/ReferencePanel';
import LevelNav from './components/LevelNav';
import { levels } from './mockData';
import { CheckCircle2, Lightbulb, Trash2 } from 'lucide-react';
import { Button } from './components/ui/button';
import { toast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [droppedItems, setDroppedItems] = useState([]);
  const [completedStages, setCompletedStages] = useState([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentLevelData = levels.find(l => l.id === currentLevel);
  const currentStage = currentLevelData?.stages[currentStageIndex];

  const generateUniqueId = () => {
    return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleDrop = (draggedItem, parentId) => {
    if (draggedItem.isNew) {
      // Nouveau composant depuis la sidebar
      const newItem = {
        uniqueId: generateUniqueId(),
        type: draggedItem.id,
        parentId: parentId,
      };
      setDroppedItems(prev => [...prev, newItem]);
    } else {
      // Déplacement d'un composant existant
      setDroppedItems(prev =>
        prev.map(item => {
          if (item.uniqueId === draggedItem.uniqueId) {
            return { ...item, parentId: parentId };
          }
          return item;
        })
      );
    }
  };

  const handleRemove = (uniqueId) => {
    setDroppedItems(prev => {
      const removeRecursive = (items, id) => {
        const children = items.filter(item => item.parentId === id);
        let toRemove = [id];
        children.forEach(child => {
          toRemove = [...toRemove, ...removeRecursive(items, child.uniqueId)];
        });
        return toRemove;
      };

      const idsToRemove = removeRecursive(prev, uniqueId);
      return prev.filter(item => !idsToRemove.includes(item.uniqueId));
    });
  };

  const handleClearAll = () => {
    setDroppedItems([]);
    setShowHint(false);
  };

  const validateConfiguration = () => {
    if (!currentStage) return;

    const requirements = currentStage.requiredComponents;
    let isValid = true;
    let validationMessages = [];

    requirements.forEach(req => {
      let matchingItems = [];
      
      if (req.parentType === 'cluster') {
        matchingItems = droppedItems.filter(item => 
          item.type === req.type && !item.parentId
        );
      } else if (req.parentType === 'any') {
        matchingItems = droppedItems.filter(item => item.type === req.type);
      } else {
        matchingItems = droppedItems.filter(item => {
          if (item.type !== req.type) return false;
          if (!item.parentId) return false;
          const parent = droppedItems.find(p => p.uniqueId === item.parentId);
          return parent && parent.type === req.parentType;
        });
      }

      if (matchingItems.length < req.count) {
        isValid = false;
        validationMessages.push(
          `Il faut ${req.count} ${req.type}(s) ${req.parentType !== 'any' ? `dans ${req.parentType}` : ''}, tu en as ${matchingItems.length}`
        );
      }
    });

    if (isValid) {
      toast({
        title: "✅ Bravo !",
        description: "Configuration correcte ! Passage à l'étape suivante.",
        duration: 3000,
      });
      
      if (!completedStages.includes(currentStage.id)) {
        setCompletedStages(prev => [...prev, currentStage.id]);
        setScore(prev => prev + 10);
      }

      setTimeout(() => {
        if (currentStageIndex < currentLevelData.stages.length - 1) {
          setCurrentStageIndex(prev => prev + 1);
          setDroppedItems([]);
          setShowHint(false);
        } else {
          // Niveau terminé
          if (currentLevel < levels.length) {
            setCurrentLevel(prev => prev + 1);
            setCurrentStageIndex(0);
            setDroppedItems([]);
            setShowHint(false);
          } else {
            toast({
              title: "🎉 Félicitations !",
              description: "Tu as terminé tous les niveaux !",
              duration: 5000,
            });
          }
        }
      }, 2000);
    } else {
      toast({
        title: "❌ Pas tout à fait...",
        description: validationMessages.join(' • '),
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Kube</span>
            <span className="text-gray-800">Learn</span>
          </h1>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-md">
          Score : {score} pts
        </div>
      </header>

      {/* Level Navigation */}
      <LevelNav
        levels={levels}
        currentLevel={currentLevel}
        currentStageId={currentStage?.id}
        onLevelChange={(levelId) => {
          setCurrentLevel(levelId);
          setCurrentStageIndex(0);
          setDroppedItems([]);
          setShowHint(false);
        }}
        completedStages={completedStages}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Stage Info */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="px-3 py-1 rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: currentLevelData?.color }}
              >
                {currentLevelData?.name.split('—')[0].trim()}
              </span>
              <span className="text-sm text-gray-500">
                Étape {currentStage?.number} / {currentStage?.total}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🌱</span>
              {currentStage?.title}
            </h2>
            
            <p className="text-gray-600 mb-4">{currentStage?.description}</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start gap-2">
                <span className="text-lg">🎯</span>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Objectif :</p>
                  <p className="text-blue-800">{currentStage?.objective}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster Zone */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-purple-600 text-lg">☸️</span>
              <h3 className="font-semibold text-gray-700 uppercase text-sm tracking-wide">Cluster Kubernetes</h3>
            </div>
            
            <DroppableZone
              droppedItems={droppedItems}
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6">
            <Button
              onClick={validateConfiguration}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Valider ma réponse
            </Button>
            
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Indice
            </Button>
            
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Tout effacer
            </Button>
          </div>

          {showHint && (
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">💡 Indice :</p>
                  <p className="text-yellow-800">{currentStage?.hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <ReferencePanel currentStage={currentStage} />
      </div>

      <Toaster />
    </div>
  );
}

export default App;