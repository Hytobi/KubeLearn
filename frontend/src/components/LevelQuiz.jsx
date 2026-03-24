import React, { useState } from 'react';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const LevelQuiz = ({ quiz, levelColor, onComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showCommands, setShowCommands] = useState(false);

  const handleChoiceSelect = (choiceId) => {
    if (!showResult) {
      setSelectedChoice(choiceId);
    }
  };

  const handleSubmit = () => {
    if (selectedChoice) {
      setShowResult(true);
      const isCorrect = quiz.choices.find(c => c.id === selectedChoice)?.correct;
      if (isCorrect) {
        setTimeout(() => setShowCommands(true), 1000);
      }
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  const selectedChoiceData = quiz.choices.find(c => c.id === selectedChoice);
  const isCorrect = selectedChoiceData?.correct;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${levelColor}20` }}
          >
            🎓
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Question de fin de niveau</h2>
            <p className="text-sm text-gray-600">Teste tes connaissances !</p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
          <p className="text-lg font-semibold text-gray-800">{quiz.question}</p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {quiz.choices.map((choice) => {
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

        {/* Submit Button */}
        {!showResult && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedChoice}
            className="w-full mt-6 py-3 text-lg font-semibold"
            style={{ backgroundColor: levelColor }}
          >
            Valider ma réponse
          </Button>
        )}

        {/* Result Message */}
        {showResult && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            isCorrect 
              ? 'bg-green-50 border-green-500' 
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-2 ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? '🎉 Bravo ! Bonne réponse !' : '❌ Pas tout à fait...'}
                </h3>
                <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                  {quiz.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Useful Commands */}
      {showCommands && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6" style={{ color: levelColor }} />
            <h3 className="text-xl font-bold text-gray-800">Commandes utiles</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Voici quelques commandes kubectl essentielles pour ce niveau :
          </p>
          <div className="bg-gray-900 rounded-lg p-4 space-y-2">
            {quiz.usefulCommands.map((command, index) => (
              <div key={index} className="font-mono text-sm text-green-400">
                <span className="text-gray-500">$</span> {command}
              </div>
            ))}
          </div>
          <Button
            onClick={handleContinue}
            className="w-full mt-6 py-3 text-lg font-semibold"
            style={{ backgroundColor: levelColor }}
          >
            Continuer vers le niveau suivant
          </Button>
        </div>
      )}

      {showResult && !isCorrect && (
        <div className="text-center mt-6">
          <Button
            onClick={handleContinue}
            variant="outline"
            className="px-8 py-3 text-lg font-semibold border-2"
            style={{ borderColor: levelColor, color: levelColor }}
          >
            Continuer quand même
          </Button>
        </div>
      )}
    </div>
  );
};

export default LevelQuiz;
