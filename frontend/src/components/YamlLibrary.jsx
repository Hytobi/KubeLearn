import React, { useState } from 'react';
import { yamlExamples, completeApp } from '../yamlData';
import { BookOpen, Copy, Check, FileCode, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';

const YamlLibrary = () => {
  const [selectedExample, setSelectedExample] = useState(yamlExamples[0]);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (yaml, id) => {
    navigator.clipboard.writeText(yaml);
    setCopiedId(id);
    toast({
      title: "✓ Copié !",
      description: "Le YAML a été copié dans le presse-papiers",
      duration: 2000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [...new Set(yamlExamples.map(ex => ex.category))];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Bibliothèque YAML</h2>
          </div>
          <p className="text-sm text-gray-600">
            Collection d'exemples de fichiers YAML Kubernetes
          </p>
        </div>

        {/* Application complète */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-purple-900">Application Complète</h3>
          </div>
          <p className="text-xs text-purple-700 mb-3">{completeApp.description}</p>
          <div className="text-xs text-purple-800 space-y-1">
            {completeApp.instructions.map((instruction, idx) => (
              <div key={idx}>{instruction}</div>
            ))}
          </div>
        </div>

        {/* Liste par catégorie */}
        {categories.map(category => (
          <div key={category} className="mb-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              {category}
            </h3>
            <div className="space-y-1">
              {yamlExamples
                .filter(ex => ex.category === category)
                .map(example => (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedExample.id === example.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{example.title}</p>
                        <p className="text-xs text-gray-500">{example.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Zone principale */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {/* En-tête */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                  {selectedExample.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-3">{selectedExample.title}</h2>
                <p className="text-gray-600 mt-2">{selectedExample.description}</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-900 font-medium mb-2">📖 Explication :</p>
              <p className="text-blue-800">{selectedExample.explanation}</p>
            </div>
          </div>

          {/* Code YAML */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Fichier YAML</h3>
              <Button
                onClick={() => handleCopy(selectedExample.yaml, selectedExample.id)}
                size="sm"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {copiedId === selectedExample.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier
                  </>
                )}
              </Button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                {selectedExample.yaml}
              </pre>
            </div>
          </div>

          {/* Points clés */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🔑 Points clés à retenir</h3>
            <ul className="space-y-3">
              {selectedExample.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info sur l'application complète */}
          {completeApp.components.includes(selectedExample.id) && (
            <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900">
                  Fait partie de l'Application Complète
                </span>
              </div>
              <p className="text-sm text-purple-700">
                Ce fichier fait partie d'une stack complète fonctionnelle. Combine-le avec les autres 
                composants de la bibliothèque pour déployer une application complète.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YamlLibrary;
