import React, { useState } from 'react';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const StageQuiz = ({ quiz, levelColor, onContinue }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoiceSelect = (choiceId) => {
    if (!showResult) {
      setSelectedChoice(choiceId);
    }
  };

  const handleSubmit = () => {
    if (selectedChoice) {
      setShowResult(true);
    }
  };

  const selectedChoiceData = quiz.choices.find(c => c.id === selectedChoice);
  const isCorrect = selectedChoiceData?.correct;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border-2 border-gray-200 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ backgroundColor: `${levelColor}20` }}
        >
          🤔
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Question rapide</h3>
          <p className="text-sm text-gray-600">Vérifie ta compréhension !</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-4">
        <p className="font-semibold text-gray-800">{quiz.question}</p>
      </div>

      {/* Choix */}
      <div className="space-y-2 mb-4">
        {quiz.choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          const showCorrect = showResult && choice.correct;
          const showIncorrect = showResult && isSelected && !choice.correct;

          return (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
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
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">{choice.id.toUpperCase()}.</span>
                  <span className="text-gray-800">{choice.text}</span>
                </div>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bouton de validation */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!selectedChoice}
          className="w-full py-2 text-base font-semibold"
          style={{ backgroundColor: levelColor }}
        >
          Valider
        </Button>
      )}

      {/* Résultat */}
      {showResult && (
        <>
          <div className={`p-3 rounded-lg border-2 mb-3 ${
            isCorrect 
              ? 'bg-green-50 border-green-500' 
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h4 className={`font-bold text-sm mb-1 ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? '✓ Correct !' : '✗ Incorrect'}
                </h4>
                <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {quiz.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Commandes */}
          {quiz.commands && quiz.commands.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-400">Commandes utiles</span>
              </div>
              <div className="space-y-1">
                {quiz.commands.map((command, index) => (
                  <div key={index} className="font-mono text-xs text-green-400">
                    <span className="text-gray-500">$</span> {command}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={onContinue}
            className="w-full py-2 text-base font-semibold"
            style={{ backgroundColor: levelColor }}
          >
            Continuer
          </Button>
        </>
      )}
    </div>
  );
};

export default StageQuiz;
