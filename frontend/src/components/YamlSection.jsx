import React, { useState } from 'react';
import { yamlExercises } from '../yamlData';
import { CheckCircle2, XCircle, Code, Award, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';

const YamlSection = ({ score, onScoreUpdate }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showHint, setShowHint] = useState(false);

  const currentExercise = yamlExercises[currentExerciseIndex];
  const progress = ((completedExercises.size / yamlExercises.length) * 100).toFixed(0);

  const handleInputChange = (blankId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
  };

  const validateAnswers = () => {
    let allCorrect = true;
    const results = {};

    currentExercise.blanks.forEach(blank => {
      const userAnswer = (userAnswers[blank.id] || '').trim();
      const isCorrect = userAnswer.toLowerCase() === blank.correctAnswer.toLowerCase();
      results[blank.id] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setShowResult(true);

    if (allCorrect) {
      if (!completedExercises.has(currentExercise.id)) {
        setCompletedExercises(prev => new Set([...prev, currentExercise.id]));
        if (onScoreUpdate) {
          onScoreUpdate(50); // +50 points par exercice
        }
        toast({
          title: "✅ Parfait !",
          description: "Exercice complété ! +50 points",
          duration: 3000,
        });
      } else {
        toast({
          title: "✓ Correct !",
          description: "Exercice déjà complété précédemment",
          duration: 2000,
        });
      }
    } else {
      toast({
        title: "❌ Pas tout à fait...",
        description: "Vérifie tes réponses et réessaie",
        variant: "destructive",
        duration: 3000,
      });
    }

    return results;
  };

  const [validationResults, setValidationResults] = useState({});

  const handleValidate = () => {
    const results = validateAnswers();
    setValidationResults(results);
  };

  const handleNext = () => {
    if (currentExerciseIndex < yamlExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setUserAnswers({});
      setShowResult(false);
      setValidationResults({});
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setUserAnswers({});
      setShowResult(false);
      setValidationResults({});
      setShowHint(false);
    }
  };

  const handleSelectExercise = (index) => {
    setCurrentExerciseIndex(index);
    setUserAnswers({});
    setShowResult(false);
    setValidationResults({});
    setShowHint(false);
  };

  const renderYamlWithBlanks = () => {
    let yamlContent = currentExercise.template;
    
    currentExercise.blanks.forEach(blank => {
      const userValue = userAnswers[blank.id] || '';
      const isValidated = showResult;
      const isCorrect = validationResults[blank.id];
      
      const inputClass = `inline-block px-2 py-1 border-2 rounded font-mono text-sm ${
        !isValidated 
          ? 'border-blue-400 bg-blue-50' 
          : isCorrect 
          ? 'border-green-500 bg-green-50' 
          : 'border-red-500 bg-red-50'
      }`;

      const inputHtml = `<input 
        type="text" 
        data-blank-id="${blank.id}"
        value="${userValue}"
        placeholder="${blank.placeholder}"
        class="${inputClass}"
        style="width: ${Math.max(150, blank.placeholder.length * 8)}px;"
      />`;

      yamlContent = yamlContent.replace(blank.placeholder, inputHtml);
    });

    return yamlContent;
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Section YAML</h2>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-900">Progression</span>
              <span className="text-sm font-bold text-blue-900">{progress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-blue-700 mt-2">
              {completedExercises.size} / {yamlExercises.length} exercices complétés
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {yamlExercises.map((exercise, index) => {
            const isCompleted = completedExercises.has(exercise.id);
            const isCurrent = index === currentExerciseIndex;
            
            return (
              <button
                key={exercise.id}
                onClick={() => handleSelectExercise(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50'
                    : isCompleted
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      {exercise.levelName}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      Ex {exercise.exerciseNumber}/{exercise.totalExercises}: {exercise.title}
                    </p>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zone principale */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">
                  Exercice {currentExerciseIndex + 1} / {yamlExercises.length}
                </p>
                <h2 className="text-xl font-bold text-gray-800">{currentExercise.levelName}</h2>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentExercise.title}</h3>
            <p className="text-gray-600 mb-3">{currentExercise.description}</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex items-start gap-2">
                <span className="text-lg">🎯</span>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Objectif :</p>
                  <p className="text-blue-800">{currentExercise.objective}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zone YAML */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Fichier YAML à compléter</h3>
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Indices
              </Button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre 
                className="text-sm text-green-400 font-mono"
                dangerouslySetInnerHTML={{ __html: renderYamlWithBlanks() }}
                onClick={(e) => {
                  if (e.target.tagName === 'INPUT') {
                    const blankId = e.target.dataset.blankId;
                    e.target.addEventListener('input', (ev) => {
                      handleInputChange(blankId, ev.target.value);
                    });
                  }
                }}
              />
            </div>

            {showHint && (
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="font-semibold text-yellow-900 mb-2">💡 Indices :</p>
                <ul className="space-y-1">
                  {currentExercise.blanks.map(blank => (
                    <li key={blank.id} className="text-sm text-yellow-800">
                      • {blank.hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              onClick={handleValidate}
              className="w-full mt-4 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Valider mon YAML
            </Button>
          </div>

          {/* Explication */}
          {showResult && (
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📚 Explication</h3>
              <p className="text-gray-700">{currentExercise.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentExerciseIndex === 0}
              variant="outline"
              className="px-6 py-3 font-semibold"
            >
              ← Précédent
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentExerciseIndex === yamlExercises.length - 1}
              className="px-6 py-3 font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Suivant →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YamlSection;
