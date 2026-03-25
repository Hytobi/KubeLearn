import React, { useState } from 'react';
import { devopsLessons, devopsTools } from '../devopsData';
import { CheckCircle2, XCircle, ChevronRight, BookOpen, Code } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';

const DevOpsSection = ({ score, onScoreUpdate }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  const currentLesson = devopsLessons[currentLessonIndex];
  const currentTool = devopsTools.find(t => t.id === currentLesson.toolId);
  const progress = ((completedLessons.size / devopsLessons.length) * 100).toFixed(0);

  const handleChoiceSelect = (choiceId) => {
    if (!showResult) {
      setSelectedChoice(choiceId);
    }
  };

  const handleSubmit = () => {
    if (!selectedChoice) return;

    setShowResult(true);
    const isCorrect = currentLesson.exercise.choices.find(c => c.id === selectedChoice)?.correct;

    if (isCorrect && !completedLessons.has(currentLesson.id)) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
      if (onScoreUpdate) {
        onScoreUpdate(100); // +100 points
      }
      toast({
        title: "✅ Excellent !",
        description: "Bonne réponse ! +100 points",
        duration: 3000,
      });
    } else if (isCorrect) {
      toast({
        title: "✓ Correct !",
        description: "Leçon déjà complétée",
        duration: 2000,
      });
    } else {
      toast({
        title: "❌ Pas correct",
        description: "Réessaie !",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < devopsLessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const handleSelectLesson = (index) => {
    setCurrentLessonIndex(index);
    setSelectedChoice(null);
    setShowResult(false);
  };

  const selectedChoiceData = currentLesson.exercise.choices.find(c => c.id === selectedChoice);
  const isCorrect = selectedChoiceData?.correct;

  // Grouper les leçons par outil
  const lessonsByTool = devopsTools.map(tool => ({
    tool,
    lessons: devopsLessons.filter(l => l.toolId === tool.id)
  }));

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🛠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Outils DevOps</h2>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-indigo-900">Progression</span>
              <span className="text-sm font-bold text-indigo-900">{progress}%</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-indigo-700 mt-2">
              {completedLessons.size} / {devopsLessons.length} leçons complétées
            </p>
          </div>
        </div>

        {/* Liste des leçons par outil */}
        {lessonsByTool.map(({ tool, lessons }) => (
          <div key={tool.id} className="mb-4">
            <div 
              className="flex items-center gap-2 mb-2 p-2 rounded-lg"
              style={{ backgroundColor: `${tool.color}15` }}
            >
              <span className="text-xl">{tool.icon}</span>
              <h3 className="font-bold text-sm" style={{ color: tool.color }}>
                {tool.name}
              </h3>
            </div>
            
            <div className="space-y-1 ml-2">
              {lessons.map((lesson) => {
                const lessonIndex = devopsLessons.findIndex(l => l.id === lesson.id);
                const isCompleted = completedLessons.has(lesson.id);
                const isCurrent = lessonIndex === currentLessonIndex;
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lessonIndex)}
                    className={`w-full text-left p-2 rounded-lg border transition-all text-sm ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-50'
                        : isCompleted
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">
                        Leçon {lesson.lessonNumber}: {lesson.title}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Zone principale */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: `${currentTool.color}20` }}
              >
                {currentTool.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">
                  Leçon {currentLessonIndex + 1} / {devopsLessons.length}
                </p>
                <h2 className="text-2xl font-bold" style={{ color: currentTool.color }}>
                  {currentTool.name} - {currentLesson.title}
                </h2>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>
            </div>
          </div>

          {/* Théorie */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5" style={{ color: currentTool.color }} />
              <h3 className="text-xl font-bold text-gray-800">Théorie</h3>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-700 whitespace-pre-line">
                {currentLesson.content.theory}
              </div>
            </div>
          </div>

          {/* Exemple de code */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5" style={{ color: currentTool.color }} />
              <h3 className="text-xl font-bold text-gray-800">Exemple</h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                {currentLesson.content.example}
              </pre>
            </div>
          </div>

          {/* Commandes */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🔧 Commandes essentielles</h3>
            <div className="bg-gray-900 rounded-lg p-4 space-y-2">
              {currentLesson.content.commands.map((command, index) => (
                <div key={index} className="font-mono text-sm text-green-400">
                  <span className="text-gray-500">$</span> {command}
                </div>
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🤔</span>
              <h3 className="text-xl font-bold text-gray-800">Teste tes connaissances</h3>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="font-semibold text-gray-800">{currentLesson.exercise.question}</p>
            </div>

            <div className="space-y-3 mb-4">
              {currentLesson.exercise.choices.map((choice) => {
                const isSelected = selectedChoice === choice.id;
                const showCorrect = showResult && choice.correct;
                const showIncorrect = showResult && isSelected && !choice.correct;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg text-gray-700">{choice.id.toUpperCase()}.</span>
                        <span className="text-gray-800">{choice.text}</span>
                      </div>
                      {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                      {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {!showResult && (
              <Button
                onClick={handleSubmit}
                disabled={!selectedChoice}
                className="w-full py-3 text-lg font-semibold"
                style={{ backgroundColor: currentTool.color }}
              >
                Valider ma réponse
              </Button>
            )}

            {showResult && (
              <div className={`p-4 rounded-lg border-2 ${
                isCorrect 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mt-1" />
                  )}
                  <div>
                    <h4 className={`font-bold text-lg mb-2 ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? '🎉 Bravo !' : '❌ Pas tout à fait...'}
                    </h4>
                    <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {currentLesson.exercise.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentLessonIndex === 0}
              variant="outline"
              className="px-6 py-3 font-semibold"
            >
              ← Précédent
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentLessonIndex === devopsLessons.length - 1}
              className="px-6 py-3 font-semibold"
              style={{ backgroundColor: currentTool.color }}
            >
              Suivant →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsSection;
