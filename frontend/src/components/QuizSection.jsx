import React, { useState } from 'react';
import { getAllQuizzes } from '../mockData';
import { CheckCircle2, XCircle, BookOpen, Award } from 'lucide-react';
import { Button } from './ui/button';

const QuizSection = ({ score, onScoreUpdate }) => {
  const allQuizzes = getAllQuizzes();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuizzes, setAnsweredQuizzes] = useState(new Set());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizPoints, setQuizPoints] = useState(new Map()); // Suivre les points par quiz

  const currentQuiz = allQuizzes[currentQuizIndex];
  const progress = ((answeredQuizzes.size / allQuizzes.length) * 100).toFixed(0);

  const handleChoiceSelect = (choiceId) => {
    if (!showResult) {
      setSelectedChoice(choiceId);
    }
  };

  const handleSubmit = () => {
    if (selectedChoice) {
      setShowResult(true);
      const isCorrect = currentQuiz.choices.find(c => c.id === selectedChoice)?.correct;
      
      // Ajouter points si correct et pas déjà répondu correctement
      if (isCorrect && !quizPoints.has(currentQuiz.id)) {
        setCorrectAnswers(prev => prev + 1);
        if (onScoreUpdate) {
          onScoreUpdate(100); // +100 points
        }
        setQuizPoints(prev => new Map(prev).set(currentQuiz.id, true));
      }
      
      setAnsweredQuizzes(prev => new Set([...prev, currentQuiz.id]));
    }
  };

  const handleNext = () => {
    if (currentQuizIndex < allQuizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const handleSelectQuiz = (index) => {
    setCurrentQuizIndex(index);
    setSelectedChoice(null);
    setShowResult(false);
  };

  const selectedChoiceData = currentQuiz.choices.find(c => c.id === selectedChoice);
  const isCorrect = selectedChoiceData?.correct;
  const isAlreadyAnswered = answeredQuizzes.has(currentQuiz.id);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar avec liste des quiz */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Section QUIZ</h2>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-900">Progression</span>
              <span className="text-sm font-bold text-purple-900">{progress}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-purple-700 mt-2">
              {answeredQuizzes.size} / {allQuizzes.length} questions répondues
            </p>
            <p className="text-xs text-purple-700">
              {correctAnswers} bonnes réponses
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {allQuizzes.map((quiz, index) => {
            const isAnswered = answeredQuizzes.has(quiz.id);
            const isCurrent = index === currentQuizIndex;
            
            return (
              <button
                key={quiz.id}
                onClick={() => handleSelectQuiz(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'border-purple-500 bg-purple-50'
                    : isAnswered
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      {quiz.levelName}
                    </p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {quiz.stageTitle}
                    </p>
                  </div>
                  {isAnswered && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zone principale du quiz */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          {/* En-tête du quiz */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${currentQuiz.levelColor}20` }}
              >
                🎓
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">
                  Question {currentQuizIndex + 1} / {allQuizzes.length}
                </p>
                <h2 className="text-xl font-bold text-gray-800">{currentQuiz.levelName}</h2>
                <p className="text-sm text-gray-600">{currentQuiz.stageTitle}</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
              <p className="text-lg font-semibold text-gray-800">{currentQuiz.question}</p>
            </div>

            {/* Choix */}
            <div className="space-y-3">
              {currentQuiz.choices.map((choice) => {
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

            {/* Bouton de validation */}
            {!showResult && (
              <Button
                onClick={handleSubmit}
                disabled={!selectedChoice}
                className="w-full mt-6 py-3 text-lg font-semibold"
                style={{ backgroundColor: currentQuiz.levelColor }}
              >
                Valider ma réponse
              </Button>
            )}

            {/* Résultat */}
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
                      {currentQuiz.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Commandes utiles */}
          {showResult && currentQuiz.commands && (
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6" style={{ color: currentQuiz.levelColor }} />
                <h3 className="text-xl font-bold text-gray-800">Commandes kubectl utiles</h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 space-y-2">
                {currentQuiz.commands.map((command, index) => (
                  <div key={index} className="font-mono text-sm text-green-400">
                    <span className="text-gray-500">$</span> {command}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuizIndex === 0}
              variant="outline"
              className="px-6 py-3 font-semibold"
            >
              ← Précédent
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentQuizIndex === allQuizzes.length - 1}
              className="px-6 py-3 font-semibold"
              style={{ backgroundColor: currentQuiz.levelColor }}
            >
              Suivant →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
