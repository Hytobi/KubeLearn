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
        hint: "Glisse simplement un Pod depuis le panneau de gauche vers la zone de construction."
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
        hint: "D'abord place un Node dans le cluster, puis glisse un Pod à l'intérieur du Node."
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
        hint: "Glisse plusieurs Pods dans le même Node pour les y héberger."
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
        hint: "Place 2 Nodes dans le cluster, puis mets 2 Pods dans chaque Node."
      }
    ]
  },
  {
    id: 2,
    name: 'Niveau 2 — Objets',
    icon: '⚙️',
    color: '#F59E0B',
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
        hint: "Place un Namespace dans le cluster, puis glisse des Pods à l'intérieur."
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
        hint: "Place un Deployment dans le cluster ou un namespace, puis ajoute 3 Pods à l'intérieur."
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
        hint: "Place un Deployment avec des Pods, puis ajoute un Service pour les exposer."
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
        hint: "Place un Namespace, ajoute un ConfigMap et un Deployment avec des Pods dedans."
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
        hint: "Organise tout dans un Namespace : Secret, ConfigMap, et Deployment avec Pods."
      }
    ]
  },
  {
    id: 3,
    name: 'Niveau 3 — Production',
    icon: '🚀',
    color: '#8B5CF6',
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
        hint: "Crée la chaîne complète : Ingress → Service → Deployment → Pods."
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
        hint: "Organise tout dans un Namespace : config (Secret, ConfigMap), app (Deployment avec Pods), et exposition (Service, Ingress)."
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
        hint: "Crée 2 Namespaces identiques avec chacun un Deployment (2 Pods) et un Service."
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
        hint: "Infrastructure : 3 Nodes. Logique : 2 Namespaces avec chacun Secret, Deployment (3 Pods), et Service."
      }
    ]
  }
];