// Mock data pour KubeLearn

export const kubernetesComponents = [
  {
    id: 'pod',
    name: 'Pod',
    icon: '📦',
    description: 'Unité de base',
    fullDescription: "Unité minimale de déploiement. Contient 1+ conteneurs partageant réseau et stockage.",
    command: 'kubectl get pods\nkubectl run mon-pod --image=nginx',
    canContain: [],
    color: '#FED7AA'
  },
  {
    id: 'node',
    name: 'Node',
    icon: '🖥️',
    description: 'Serveur physique/VM',
    fullDescription: "Machine physique ou VM du cluster. Héberge les Pods. Peut être ajouté/retiré dynamiquement.",
    command: 'kubectl get nodes\nkubectl describe node worker-1',
    canContain: ['pod', 'deployment'],
    color: '#D1FAE5'
  },
  {
    id: 'cluster',
    name: 'Cluster',
    icon: '🔷',
    description: 'Ensemble de Nodes',
    fullDescription: "Ensemble du système K8s : Control Plane + Nodes Workers. Géré par un cloud ou on-premise.",
    command: 'kubectl cluster-info\nkubectl get all --all-namespaces',
    canContain: ['node', 'namespace'],
    color: '#E0E7FF'
  },
  {
    id: 'namespace',
    name: 'Namespace',
    icon: '📁',
    description: 'Isolation logique',
    fullDescription: "Partition logique du cluster. Isole les ressources entre équipes ou environnements.",
    command: 'kubectl create namespace prod\nkubectl get all -n prod',
    canContain: ['pod', 'deployment', 'service', 'configmap', 'secret'],
    color: '#FEF3C7'
  },
  {
    id: 'deployment',
    name: 'Deployment',
    icon: '🚀',
    description: 'Gestion de Pods',
    fullDescription: "Gère le déploiement et la mise à l'échelle des Pods. Assure le nombre de réplicas souhaité.",
    command: 'kubectl create deployment nginx --image=nginx\nkubectl scale deployment nginx --replicas=3',
    canContain: ['pod'],
    color: '#DBEAFE'
  },
  {
    id: 'service',
    name: 'Service',
    icon: '🌐',
    description: 'Exposition réseau',
    fullDescription: "Expose les Pods sur le réseau. Fournit un point d'accès stable avec load balancing.",
    command: 'kubectl expose deployment nginx --port=80\nkubectl get services',
    canContain: [],
    color: '#E0E7FF'
  },
  {
    id: 'configmap',
    name: 'ConfigMap',
    icon: '⚙️',
    description: 'Configuration',
    fullDescription: "Stocke la configuration de l'application. Variables d'environnement, fichiers de config.",
    command: 'kubectl create configmap app-config --from-literal=env=prod\nkubectl get configmaps',
    canContain: [],
    color: '#FEF3C7'
  },
  {
    id: 'secret',
    name: 'Secret',
    icon: '🔐',
    description: 'Données sensibles',
    fullDescription: "Stocke les données sensibles (mots de passe, tokens, clés). Encodé en base64.",
    command: 'kubectl create secret generic db-password --from-literal=password=secret123\nkubectl get secrets',
    canContain: [],
    color: '#FEE2E2'
  },
  {
    id: 'ingress',
    name: 'Ingress',
    icon: '🔀',
    description: 'Routage HTTP/HTTPS',
    fullDescription: "Gère l'accès externe au cluster. Routage HTTP/HTTPS, SSL/TLS, load balancing.",
    command: 'kubectl create ingress simple --rule="foo.com/bar=svc:8080"\nkubectl get ingress',
    canContain: [],
    color: '#E9D5FF'
  }
];

export const levels = [
  {
    id: 1,
    name: 'Niveau 1 — Bases',
    icon: '🌱',
    color: '#10B981',
    quiz: {
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
    },
    stages: [
      {
        id: '1-1',
        number: 1,
        total: 4,
        title: "C'est quoi un Pod ?",
        description: "Le Pod est la plus petite unité déployable dans Kubernetes. Il contient un ou plusieurs conteneurs qui partagent le même réseau et stockage.",
        objective: "Place 1 Pod dans le cluster pour le démarrer",
        requiredComponents: [
          { type: 'pod', count: 1, parentType: 'cluster' }
        ],
        hint: "Glisse simplement un Pod depuis le panneau de gauche vers la zone de construction.",
        quiz: {
          question: "Un Pod peut-il contenir plusieurs conteneurs ?",
          choices: [
            { id: 'a', text: "Non, un Pod ne peut contenir qu'un seul conteneur", correct: false },
            { id: 'b', text: "Oui, un Pod peut contenir un ou plusieurs conteneurs", correct: true },
            { id: 'c', text: "Oui, mais seulement deux conteneurs maximum", correct: false },
            { id: 'd', text: "Non, il faut créer plusieurs Pods", correct: false }
          ],
          explanation: "Un Pod peut contenir un ou plusieurs conteneurs qui partagent le même réseau, le même stockage et les mêmes ressources.",
          commands: ["kubectl get pods", "kubectl describe pod <nom-pod>"]
        }
      },
      {
        id: '1-2',
        number: 2,
        total: 4,
        title: "Les Nodes : machines du cluster",
        description: "Un Node est une machine (physique ou virtuelle) qui exécute les Pods. Chaque cluster a besoin d'au moins un Node.",
        objective: "Place 1 Node dans le cluster et mets 1 Pod dedans",
        requiredComponents: [
          { type: 'node', count: 1, parentType: 'cluster' },
          { type: 'pod', count: 1, parentType: 'node' }
        ],
        hint: "D'abord place un Node dans le cluster, puis glisse un Pod à l'intérieur du Node.",
        quiz: {
          question: "Quel est le rôle d'un Node dans Kubernetes ?",
          choices: [
            { id: 'a', text: "Héberger et exécuter les Pods", correct: true },
            { id: 'b', text: "Stocker les configurations", correct: false },
            { id: 'c', text: "Gérer les utilisateurs", correct: false },
            { id: 'd', text: "Créer des backups automatiques", correct: false }
          ],
          explanation: "Un Node est une machine physique ou virtuelle qui héberge et exécute les Pods. C'est la ressource de calcul du cluster.",
          commands: ["kubectl get nodes", "kubectl describe node <nom-node>"]
        }
      },
      {
        id: '1-3',
        number: 3,
        total: 4,
        title: "Plusieurs Pods sur un Node",
        description: "Un Node peut héberger plusieurs Pods. Le scheduler de Kubernetes décide automatiquement où placer chaque Pod.",
        objective: "Place 1 Node avec 3 Pods dedans",
        requiredComponents: [
          { type: 'node', count: 1, parentType: 'cluster' },
          { type: 'pod', count: 3, parentType: 'node' }
        ],
        hint: "Glisse plusieurs Pods dans le même Node pour les y héberger.",
        quiz: {
          question: "Combien de Pods un Node peut-il héberger ?",
          choices: [
            { id: 'a', text: "Un seul Pod par Node", correct: false },
            { id: 'b', text: "Maximum 10 Pods", correct: false },
            { id: 'c', text: "Plusieurs Pods, selon les ressources disponibles", correct: true },
            { id: 'd', text: "Exactement 5 Pods", correct: false }
          ],
          explanation: "Un Node peut héberger plusieurs Pods. Le nombre exact dépend des ressources disponibles (CPU, mémoire) sur le Node.",
          commands: ["kubectl get pods -o wide", "kubectl top nodes"]
        }
      },
      {
        id: '1-4',
        number: 4,
        total: 4,
        title: "Cluster multi-nodes",
        description: "Un cluster de production contient généralement plusieurs Nodes pour assurer haute disponibilité et répartition de charge.",
        objective: "Crée un cluster avec 2 Nodes, chacun ayant 2 Pods",
        requiredComponents: [
          { type: 'node', count: 2, parentType: 'cluster' },
          { type: 'pod', count: 4, parentType: 'node' }
        ],
        hint: "Place 2 Nodes dans le cluster, puis mets 2 Pods dans chaque Node.",
        quiz: {
          question: "Pourquoi utilise-t-on plusieurs Nodes dans un cluster ?",
          choices: [
            { id: 'a', text: "C'est obligatoire dans Kubernetes", correct: false },
            { id: 'b', text: "Pour la haute disponibilité et répartition de charge", correct: true },
            { id: 'c', text: "Pour économiser de l'argent", correct: false },
            { id: 'd', text: "Pour accélérer les déploiements", correct: false }
          ],
          explanation: "Plusieurs Nodes assurent la haute disponibilité : si un Node tombe, les Pods peuvent continuer à fonctionner sur d'autres Nodes. Cela permet aussi de répartir la charge.",
          commands: ["kubectl get nodes", "kubectl drain <node-name>"]
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Niveau 2 — Objets',
    icon: '⚙️',
    color: '#F59E0B',
    quiz: {
      question: "Quelle est la différence principale entre un Deployment et un Pod ?",
      choices: [
        { id: 'a', text: "Un Deployment ne peut contenir qu'un seul Pod", correct: false },
        { id: 'b', text: "Un Deployment gère automatiquement les réplicas et les mises à jour des Pods", correct: true },
        { id: 'c', text: "Un Pod est plus rapide qu'un Deployment", correct: false },
        { id: 'd', text: "Un Deployment ne peut pas être supprimé", correct: false }
      ],
      explanation: "Un Deployment est un objet Kubernetes de niveau supérieur qui gère automatiquement le cycle de vie des Pods. Il assure qu'un nombre spécifié de réplicas est toujours en cours d'exécution et facilite les mises à jour progressives.",
      usefulCommands: [
        "kubectl create deployment nginx --image=nginx",
        "kubectl get deployments",
        "kubectl scale deployment nginx --replicas=3",
        "kubectl rollout status deployment/nginx",
        "kubectl set image deployment/nginx nginx=nginx:1.21"
      ]
    },
    stages: [
      {
        id: '2-1',
        number: 1,
        total: 5,
        title: "Les Namespaces : organiser les ressources",
        description: "Les Namespaces permettent de séparer logiquement les ressources dans un cluster. Idéal pour isoler dev, staging et production.",
        objective: "Crée 1 Namespace dans le cluster avec 2 Pods dedans",
        requiredComponents: [
          { type: 'namespace', count: 1, parentType: 'cluster' },
          { type: 'pod', count: 2, parentType: 'namespace' }
        ],
        hint: "Place un Namespace dans le cluster, puis glisse des Pods à l'intérieur.",
        quiz: {
          question: "À quoi servent les Namespaces dans Kubernetes ?",
          choices: [
            { id: 'a', text: "À séparer et isoler logiquement les ressources", correct: true },
            { id: 'b', text: "À accélérer les Pods", correct: false },
            { id: 'c', text: "À créer des backups", correct: false },
            { id: 'd', text: "À gérer les mots de passe", correct: false }
          ],
          explanation: "Les Namespaces permettent de partitionner un cluster en plusieurs espaces virtuels pour isoler les ressources entre équipes, projets ou environnements.",
          commands: ["kubectl create namespace prod", "kubectl get namespaces"]
        }
      },
      {
        id: '2-2',
        number: 2,
        total: 5,
        title: "Deployments : gérer les réplicas",
        description: "Un Deployment gère automatiquement les Pods et assure qu'un nombre défini de réplicas est toujours en cours d'exécution.",
        objective: "Crée 1 Deployment avec 3 Pods dedans",
        requiredComponents: [
          { type: 'deployment', count: 1, parentType: 'any' },
          { type: 'pod', count: 3, parentType: 'deployment' }
        ],
        hint: "Place un Deployment dans le cluster ou un namespace, puis ajoute 3 Pods à l'intérieur.",
        quiz: {
          question: "Que se passe-t-il si un Pod d'un Deployment est supprimé ?",
          choices: [
            { id: 'a', text: "Le Deployment recrée automatiquement un nouveau Pod", correct: true },
            { id: 'b', text: "Rien, le Pod est définitivement perdu", correct: false },
            { id: 'c', text: "Le cluster s'arrête", correct: false },
            { id: 'd', text: "Il faut recréer manuellement le Pod", correct: false }
          ],
          explanation: "Un Deployment surveille constamment ses Pods et en recrée automatiquement pour maintenir le nombre de réplicas souhaité.",
          commands: ["kubectl get deployments", "kubectl scale deployment <name> --replicas=5"]
        }
      },
      {
        id: '2-3',
        number: 3,
        total: 5,
        title: "Services : exposer les applications",
        description: "Les Services exposent vos Pods sur le réseau et fournissent un load balancing automatique.",
        objective: "Crée 1 Deployment avec 2 Pods et 1 Service",
        requiredComponents: [
          { type: 'deployment', count: 1, parentType: 'any' },
          { type: 'pod', count: 2, parentType: 'deployment' },
          { type: 'service', count: 1, parentType: 'any' }
        ],
        hint: "Place un Deployment avec des Pods, puis ajoute un Service pour les exposer.",
        quiz: {
          question: "Quel est le rôle principal d'un Service ?",
          choices: [
            { id: 'a', text: "Créer des Pods", correct: false },
            { id: 'b', text: "Exposer les Pods sur le réseau avec une IP stable", correct: true },
            { id: 'c', text: "Surveiller les logs", correct: false },
            { id: 'd', text: "Gérer les Namespaces", correct: false }
          ],
          explanation: "Un Service fournit un point d'accès réseau stable (IP fixe) pour un ensemble de Pods, avec load balancing automatique.",
          commands: ["kubectl expose deployment <name> --port=80", "kubectl get services"]
        }
      },
      {
        id: '2-4',
        number: 4,
        total: 5,
        title: "Configuration avec ConfigMap",
        description: "Les ConfigMaps stockent la configuration de vos applications de manière découplée du code.",
        objective: "Crée 1 Namespace avec 1 ConfigMap et 1 Deployment contenant 2 Pods",
        requiredComponents: [
          { type: 'namespace', count: 1, parentType: 'cluster' },
          { type: 'configmap', count: 1, parentType: 'namespace' },
          { type: 'deployment', count: 1, parentType: 'namespace' },
          { type: 'pod', count: 2, parentType: 'deployment' }
        ],
        hint: "Place un Namespace, ajoute un ConfigMap et un Deployment avec des Pods dedans.",
        quiz: {
          question: "Quelle est la différence entre ConfigMap et Secret ?",
          choices: [
            { id: 'a', text: "ConfigMap pour configuration non-sensible, Secret pour données sensibles", correct: true },
            { id: 'b', text: "ConfigMap est plus rapide", correct: false },
            { id: 'c', text: "Secret ne peut pas être modifié", correct: false },
            { id: 'd', text: "Il n'y a aucune différence", correct: false }
          ],
          explanation: "ConfigMap stocke des données de configuration non-sensibles, tandis que Secret stocke des données sensibles (mots de passe, tokens) avec encodage base64.",
          commands: ["kubectl create configmap <name> --from-literal=key=value", "kubectl get configmaps"]
        }
      },
      {
        id: '2-5',
        number: 5,
        total: 5,
        title: "Sécurité avec Secrets",
        description: "Les Secrets permettent de stocker des données sensibles comme des mots de passe ou des tokens.",
        objective: "Crée 1 Namespace avec 1 Secret, 1 ConfigMap et 1 Deployment avec 2 Pods",
        requiredComponents: [
          { type: 'namespace', count: 1, parentType: 'cluster' },
          { type: 'secret', count: 1, parentType: 'namespace' },
          { type: 'configmap', count: 1, parentType: 'namespace' },
          { type: 'deployment', count: 1, parentType: 'namespace' },
          { type: 'pod', count: 2, parentType: 'deployment' }
        ],
        hint: "Organise tout dans un Namespace : Secret, ConfigMap, et Deployment avec Pods.",
        quiz: {
          question: "Comment sont encodées les données dans un Secret ?",
          choices: [
            { id: 'a', text: "En texte clair", correct: false },
            { id: 'b', text: "En base64", correct: true },
            { id: 'c', text: "Avec chiffrement AES-256", correct: false },
            { id: 'd', text: "Avec un hash MD5", correct: false }
          ],
          explanation: "Les Secrets Kubernetes stockent les données encodées en base64 (pas chiffré par défaut). Pour un vrai chiffrement, il faut activer le chiffrement at-rest.",
          commands: ["kubectl create secret generic <name> --from-literal=password=secret", "kubectl get secrets"]
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Niveau 3 — Production',
    icon: '🚀',
    color: '#8B5CF6',
    quiz: {
      question: "Pourquoi utilise-t-on un Ingress plutôt qu'un Service de type LoadBalancer ?",
      choices: [
        { id: 'a', text: "Un Ingress est plus rapide qu'un LoadBalancer", correct: false },
        { id: 'b', text: "Un Ingress permet de gérer plusieurs services avec une seule IP et offre le routage HTTP/HTTPS", correct: true },
        { id: 'c', text: "Un Ingress ne nécessite pas de configuration", correct: false },
        { id: 'd', text: "Un LoadBalancer ne fonctionne pas avec Kubernetes", correct: false }
      ],
      explanation: "Un Ingress permet de gérer l'accès externe à plusieurs services avec une seule adresse IP, offrant des fonctionnalités avancées comme le routage basé sur les chemins, la terminaison SSL/TLS, et l'équilibrage de charge au niveau HTTP/HTTPS.",
      usefulCommands: [
        "kubectl get ingress",
        "kubectl describe ingress <nom-ingress>",
        "kubectl create ingress simple --rule='foo.com/bar=svc:8080'",
        "kubectl get services",
        "kubectl create secret tls mon-tls --cert=cert.pem --key=key.pem"
      ]
    },
    stages: [
      {
        id: '3-1',
        number: 1,
        total: 4,
        title: "Ingress : routage HTTP avancé",
        description: "L'Ingress gère l'accès externe à vos services, avec routage HTTP/HTTPS et SSL/TLS.",
        objective: "Crée 1 Ingress, 1 Service, 1 Deployment avec 2 Pods",
        requiredComponents: [
          { type: 'ingress', count: 1, parentType: 'any' },
          { type: 'service', count: 1, parentType: 'any' },
          { type: 'deployment', count: 1, parentType: 'any' },
          { type: 'pod', count: 2, parentType: 'deployment' }
        ],
        hint: "Crée la chaîne complète : Ingress → Service → Deployment → Pods.",
        quiz: {
          question: "Que fait un Ingress Controller ?",
          choices: [
            { id: 'a', text: "Implémente les règles définies dans l'Ingress", correct: true },
            { id: 'b', text: "Crée automatiquement des Pods", correct: false },
            { id: 'c', text: "Gère les Namespaces", correct: false },
            { id: 'd', text: "Supprime les Services inutiles", correct: false }
          ],
          explanation: "Un Ingress Controller est un composant qui lit les ressources Ingress et configure un reverse proxy (nginx, traefik, etc.) pour implémenter les règles de routage.",
          commands: ["kubectl get ingress", "kubectl describe ingress <name>"]
        }
      },
      {
        id: '3-2',
        number: 2,
        total: 4,
        title: "Application complète avec configuration",
        description: "Une application production complète avec configuration, secrets, déploiement et exposition.",
        objective: "Dans 1 Namespace : 1 Secret, 1 ConfigMap, 1 Deployment (3 Pods), 1 Service, 1 Ingress",
        requiredComponents: [
          { type: 'namespace', count: 1, parentType: 'cluster' },
          { type: 'secret', count: 1, parentType: 'namespace' },
          { type: 'configmap', count: 1, parentType: 'namespace' },
          { type: 'deployment', count: 1, parentType: 'namespace' },
          { type: 'pod', count: 3, parentType: 'deployment' },
          { type: 'service', count: 1, parentType: 'namespace' },
          { type: 'ingress', count: 1, parentType: 'namespace' }
        ],
        hint: "Organise tout dans un Namespace : config (Secret, ConfigMap), app (Deployment avec Pods), et exposition (Service, Ingress).",
        quiz: {
          question: "Dans quel ordre les composants sont-ils généralement créés en production ?",
          choices: [
            { id: 'a', text: "Ingress → Service → Deployment → ConfigMap/Secret", correct: false },
            { id: 'b', text: "ConfigMap/Secret → Deployment → Service → Ingress", correct: true },
            { id: 'c', text: "Service → Ingress → Deployment → ConfigMap", correct: false },
            { id: 'd', text: "L'ordre n'a pas d'importance", correct: false }
          ],
          explanation: "On crée d'abord la configuration (ConfigMap/Secret), puis l'application (Deployment), ensuite l'exposition interne (Service), et enfin l'accès externe (Ingress).",
          commands: ["kubectl apply -f app-config.yaml", "kubectl rollout status deployment/<name>"]
        }
      },
      {
        id: '3-3',
        number: 3,
        total: 4,
        title: "Multi-environnements production",
        description: "Architecture avec plusieurs environnements (dev, staging, prod) dans le même cluster.",
        objective: "Crée 2 Namespaces, chacun avec : 1 Deployment (2 Pods), 1 Service",
        requiredComponents: [
          { type: 'namespace', count: 2, parentType: 'cluster' },
          { type: 'deployment', count: 2, parentType: 'namespace' },
          { type: 'pod', count: 4, parentType: 'deployment' },
          { type: 'service', count: 2, parentType: 'namespace' }
        ],
        hint: "Crée 2 Namespaces identiques avec chacun un Deployment (2 Pods) et un Service.",
        quiz: {
          question: "Pourquoi séparer dev/staging/prod dans différents Namespaces ?",
          choices: [
            { id: 'a', text: "Pour isoler les ressources et éviter les conflits", correct: true },
            { id: 'b', text: "C'est obligatoire dans Kubernetes", correct: false },
            { id: 'c', text: "Pour économiser de la mémoire", correct: false },
            { id: 'd', text: "Pour accélérer les déploiements", correct: false }
          ],
          explanation: "Séparer les environnements dans différents Namespaces permet d'isoler les ressources, d'appliquer des quotas différents, et d'éviter les conflits de noms.",
          commands: ["kubectl config set-context --current --namespace=prod", "kubectl get all -n staging"]
        }
      },
      {
        id: '3-4',
        number: 4,
        total: 4,
        title: "Cluster production haute disponibilité",
        description: "Architecture complète : plusieurs Nodes, environnements séparés, avec toutes les ressources nécessaires.",
        objective: "Crée 3 Nodes, 2 Namespaces, et dans chaque namespace : 1 Secret, 1 Deployment (3 Pods), 1 Service",
        requiredComponents: [
          { type: 'node', count: 3, parentType: 'cluster' },
          { type: 'namespace', count: 2, parentType: 'cluster' },
          { type: 'secret', count: 2, parentType: 'namespace' },
          { type: 'deployment', count: 2, parentType: 'namespace' },
          { type: 'pod', count: 6, parentType: 'deployment' },
          { type: 'service', count: 2, parentType: 'namespace' }
        ],
        hint: "Infrastructure : 3 Nodes. Logique : 2 Namespaces avec chacun Secret, Deployment (3 Pods), et Service.",
        quiz: {
          question: "Qu'est-ce que la haute disponibilité (HA) dans Kubernetes ?",
          choices: [
            { id: 'a', text: "Avoir des backups réguliers", correct: false },
            { id: 'b', text: "Répliquer les composants sur plusieurs Nodes pour éviter les pannes", correct: true },
            { id: 'c', text: "Utiliser des Pods plus puissants", correct: false },
            { id: 'd', text: "Activer le mode debug", correct: false }
          ],
          explanation: "La haute disponibilité consiste à répliquer les composants critiques sur plusieurs Nodes pour qu'en cas de panne d'un Node, l'application continue de fonctionner.",
          commands: ["kubectl get pods -o wide", "kubectl cordon <node-name>", "kubectl drain <node-name>"]
        }
      }
    ]
  }
];

// Fonction pour obtenir toutes les questions de quiz
export const getAllQuizzes = () => {
  const allQuizzes = [];
  
  levels.forEach(level => {
    level.stages.forEach(stage => {
      if (stage.quiz) {
        allQuizzes.push({
          id: stage.id,
          levelId: level.id,
          levelName: level.name,
          levelColor: level.color,
          stageTitle: stage.title,
          ...stage.quiz
        });
      }
    });
  });
  
  return allQuizzes;
};
