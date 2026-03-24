import React from 'react';
import LevelQuiz from './components/LevelQuiz';
import './App.css';
import { Toaster } from './components/ui/toaster';

const quizDemo = {
  question: "Quel est le rôle principal d'un Pod dans Kubernetes ?",
  choices: [
    { id: 'a', text: "Gérer les permissions et la sécurité du cluster", correct: false },
    { id: 'b', text: "Exécuter un ou plusieurs conteneurs partageant les mêmes ressources", correct: true },
    { id: 'c', text: "Router le trafic réseau entre différents services", correct: false },
    { id: 'd', text: "Stocker les données de configuration du cluster", correct: false }
  ],
  explanation: "Le Pod est la plus petite unité d'exécution dans Kubernetes. Il peut contenir un ou plusieurs conteneurs qui partagent le même réseau, le même stockage et les mêmes ressources.",
  usefulCommands: [
    "kubectl get pods",
    "kubectl describe pod <nom-pod>",
    "kubectl logs <nom-pod>",
    "kubectl delete pod <nom-pod>",
    "kubectl run mon-pod --image=nginx"
  ]
};

function QuizDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <LevelQuiz 
        quiz={quizDemo}
        levelColor="#10B981"
        onComplete={() => alert('Quiz terminé !')}
      />
      <Toaster />
    </div>
  );
}

export default QuizDemo;
