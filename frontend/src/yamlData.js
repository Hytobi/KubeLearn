// Données pour la section YAML pratique

export const yamlExamples = [
  {
    id: 'pod-basic',
    title: 'Pod simple',
    category: 'Niveau 1 - Bases',
    description: 'Un Pod basique exécutant nginx',
    explanation: 'Ce fichier YAML définit un Pod qui est la plus petite unité déployable dans Kubernetes. Le Pod contient un conteneur nginx.',
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  namespace: default
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80`,
    keyPoints: [
      'apiVersion: v1 - Version de l\'API Kubernetes',
      'kind: Pod - Type de ressource',
      'metadata - Informations sur la ressource (nom, namespace)',
      'spec - Spécifications du Pod',
      'containers - Liste des conteneurs dans le Pod'
    ]
  },
  {
    id: 'deployment-basic',
    title: 'Deployment',
    category: 'Niveau 2 - Objets',
    description: 'Un Deployment gérant 3 réplicas d\'une application',
    explanation: 'Un Deployment gère automatiquement le cycle de vie des Pods et assure qu\'un nombre défini de réplicas soit toujours en cours d\'exécution.',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: nginx:1.21
        ports:
        - containerPort: 80`,
    keyPoints: [
      'replicas: 3 - Nombre de Pods à maintenir',
      'selector - Sélectionne les Pods à gérer',
      'template - Template de Pod à créer',
      'labels - Étiquettes pour identifier les ressources'
    ]
  },
  {
    id: 'service-basic',
    title: 'Service',
    category: 'Niveau 2 - Objets',
    description: 'Service exposant un Deployment',
    explanation: 'Un Service expose les Pods sur le réseau et fournit un point d\'accès stable avec load balancing.',
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: webapp
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP`,
    keyPoints: [
      'type: ClusterIP - Service interne au cluster',
      'selector - Sélectionne les Pods à exposer',
      'port - Port exposé par le Service',
      'targetPort - Port du conteneur'
    ]
  },
  {
    id: 'configmap-basic',
    title: 'ConfigMap',
    category: 'Niveau 2 - Objets',
    description: 'Configuration d\'application',
    explanation: 'ConfigMap stocke les données de configuration sous forme de paires clé-valeur.',
    yaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  database_host: postgres.local
  log_level: info
  max_connections: "100"`,
    keyPoints: [
      'data - Paires clé-valeur de configuration',
      'Les valeurs sont toujours des chaînes',
      'Peut être monté comme volume ou variables d\'environnement'
    ]
  },
  {
    id: 'secret-basic',
    title: 'Secret',
    category: 'Niveau 2 - Objets',
    description: 'Données sensibles',
    explanation: 'Secret stocke les données sensibles encodées en base64.',
    yaml: `apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: production
type: Opaque
data:
  db-password: cGFzc3dvcmQxMjM=
  api-key: YWJjZGVmZ2hpams=`,
    keyPoints: [
      'type: Opaque - Type de Secret générique',
      'data - Valeurs encodées en base64',
      'Plus sécurisé que ConfigMap pour données sensibles'
    ]
  },
  {
    id: 'ingress-basic',
    title: 'Ingress',
    category: 'Niveau 3 - Production',
    description: 'Routage HTTP vers les Services',
    explanation: 'Ingress gère l\'accès externe HTTP/HTTPS au cluster avec routage basé sur les règles.',
    yaml: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
  namespace: production
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: webapp-service
            port:
              number: 80`,
    keyPoints: [
      'rules - Règles de routage',
      'host - Nom de domaine',
      'backend - Service de destination',
      'pathType: Prefix - Type de correspondance de chemin'
    ]
  },
  {
    id: 'namespace-basic',
    title: 'Namespace',
    category: 'Niveau 1 - Bases',
    description: 'Isolation logique',
    explanation: 'Namespace crée une partition logique dans le cluster pour isoler les ressources.',
    yaml: `apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    environment: prod
    team: backend`,
    keyPoints: [
      'Permet d\'isoler les ressources',
      'Chaque namespace a ses propres quotas',
      'Les noms doivent être uniques dans le cluster'
    ]
  }
];

export const yamlExercises = [
  {
    id: 'ex-1-1',
    levelId: 1,
    levelName: 'Niveau 1 - Débuter avec YAML',
    exerciseNumber: 1,
    totalExercises: 3,
    title: 'Créer un Pod dans un namespace',
    description: 'Complète le YAML pour créer un Pod nginx dans le namespace "dev-team"',
    objective: 'Créer un Pod nommé "mon-app" dans le namespace "dev-team"',
    template: `apiVersion: v1
kind: Pod
metadata:
  name: ___NAME___
  namespace: ___NAMESPACE___
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80`,
    blanks: [
      {
        id: 'name',
        placeholder: '___NAME___',
        correctAnswer: 'mon-app',
        hint: 'Le nom du Pod doit être "mon-app"'
      },
      {
        id: 'namespace',
        placeholder: '___NAMESPACE___',
        correctAnswer: 'dev-team',
        hint: 'Le namespace doit être "dev-team"'
      }
    ],
    explanation: 'Dans Kubernetes, chaque ressource doit avoir un nom unique dans son namespace. Le namespace permet d\'isoler les ressources.'
  },
  {
    id: 'ex-1-2',
    levelId: 1,
    levelName: 'Niveau 1 - Débuter avec YAML',
    exerciseNumber: 2,
    totalExercises: 3,
    title: 'Configurer un conteneur',
    description: 'Définis le port du conteneur et l\'image à utiliser',
    objective: 'Utiliser l\'image "redis:alpine" sur le port 6379',
    template: `apiVersion: v1
kind: Pod
metadata:
  name: redis-cache
  namespace: default
spec:
  containers:
  - name: redis
    image: ___IMAGE___
    ports:
    - containerPort: ___PORT___`,
    blanks: [
      {
        id: 'image',
        placeholder: '___IMAGE___',
        correctAnswer: 'redis:alpine',
        hint: 'L\'image doit être "redis:alpine"'
      },
      {
        id: 'port',
        placeholder: '___PORT___',
        correctAnswer: '6379',
        hint: 'Redis écoute par défaut sur le port 6379'
      }
    ],
    explanation: 'Le containerPort définit le port sur lequel le conteneur écoute. L\'image doit inclure le tag (version).'
  },
  {
    id: 'ex-1-3',
    levelId: 1,
    levelName: 'Niveau 1 - Débuter avec YAML',
    exerciseNumber: 3,
    totalExercises: 3,
    title: 'Créer un Namespace',
    description: 'Complète le YAML pour créer un nouveau namespace',
    objective: 'Créer un namespace "production" avec le label environment=prod',
    template: `apiVersion: v1
kind: ___KIND___
metadata:
  name: ___NAME___
  labels:
    environment: ___LABEL___`,
    blanks: [
      {
        id: 'kind',
        placeholder: '___KIND___',
        correctAnswer: 'Namespace',
        hint: 'Le type de ressource est "Namespace"'
      },
      {
        id: 'name',
        placeholder: '___NAME___',
        correctAnswer: 'production',
        hint: 'Le nom doit être "production"'
      },
      {
        id: 'label',
        placeholder: '___LABEL___',
        correctAnswer: 'prod',
        hint: 'La valeur du label doit être "prod"'
      }
    ],
    explanation: 'Les Namespaces permettent d\'organiser et d\'isoler les ressources. Les labels facilitent la sélection et le filtrage.'
  },
  {
    id: 'ex-2-1',
    levelId: 2,
    levelName: 'Niveau 2 - Deployments et Services',
    exerciseNumber: 1,
    totalExercises: 3,
    title: 'Créer un Deployment',
    description: 'Configure un Deployment avec le bon nombre de réplicas',
    objective: 'Déployer 5 réplicas de l\'application "webapp" avec l\'image "nginx:1.21"',
    template: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
  namespace: production
spec:
  replicas: ___REPLICAS___
  selector:
    matchLabels:
      app: ___APP_LABEL___
  template:
    metadata:
      labels:
        app: ___APP_LABEL___
    spec:
      containers:
      - name: webapp
        image: ___IMAGE___
        ports:
        - containerPort: 80`,
    blanks: [
      {
        id: 'replicas',
        placeholder: '___REPLICAS___',
        correctAnswer: '5',
        hint: 'Le nombre de réplicas doit être 5'
      },
      {
        id: 'app_label',
        placeholder: '___APP_LABEL___',
        correctAnswer: 'webapp',
        hint: 'Le label app doit correspondre au nom de l\'application'
      },
      {
        id: 'image',
        placeholder: '___IMAGE___',
        correctAnswer: 'nginx:1.21',
        hint: 'L\'image doit être "nginx:1.21"'
      }
    ],
    explanation: 'Le selector doit correspondre aux labels du template. Cela permet au Deployment de gérer les bons Pods.'
  },
  {
    id: 'ex-2-2',
    levelId: 2,
    levelName: 'Niveau 2 - Deployments et Services',
    exerciseNumber: 2,
    totalExercises: 3,
    title: 'Créer un Service',
    description: 'Expose un Deployment via un Service',
    objective: 'Créer un Service "api-service" de type NodePort sur le port 8080',
    template: `apiVersion: v1
kind: ___KIND___
metadata:
  name: ___SERVICE_NAME___
  namespace: production
spec:
  type: ___TYPE___
  selector:
    app: webapp
  ports:
  - port: ___PORT___
    targetPort: 80
    protocol: TCP`,
    blanks: [
      {
        id: 'kind',
        placeholder: '___KIND___',
        correctAnswer: 'Service',
        hint: 'Le type de ressource est "Service"'
      },
      {
        id: 'service_name',
        placeholder: '___SERVICE_NAME___',
        correctAnswer: 'api-service',
        hint: 'Le nom du service doit être "api-service"'
      },
      {
        id: 'type',
        placeholder: '___TYPE___',
        correctAnswer: 'NodePort',
        hint: 'Le type doit être "NodePort"'
      },
      {
        id: 'port',
        placeholder: '___PORT___',
        correctAnswer: '8080',
        hint: 'Le port doit être 8080'
      }
    ],
    explanation: 'Un Service de type NodePort expose l\'application sur un port de chaque Node du cluster.'
  },
  {
    id: 'ex-2-3',
    levelId: 2,
    levelName: 'Niveau 2 - Deployments et Services',
    exerciseNumber: 3,
    totalExercises: 3,
    title: 'Créer un ConfigMap',
    description: 'Configure les variables d\'environnement de ton application',
    objective: 'Créer un ConfigMap "app-config" avec database_url=postgres://db:5432',
    template: `apiVersion: v1
kind: ConfigMap
metadata:
  name: ___NAME___
  namespace: production
data:
  database_url: ___DATABASE_URL___
  log_level: info`,
    blanks: [
      {
        id: 'name',
        placeholder: '___NAME___',
        correctAnswer: 'app-config',
        hint: 'Le nom doit être "app-config"'
      },
      {
        id: 'database_url',
        placeholder: '___DATABASE_URL___',
        correctAnswer: 'postgres://db:5432',
        hint: 'L\'URL doit être "postgres://db:5432"'
      }
    ],
    explanation: 'ConfigMap permet de séparer la configuration du code. Les données peuvent être injectées comme variables d\'environnement.'
  },
  {
    id: 'ex-3-1',
    levelId: 3,
    levelName: 'Niveau 3 - Production Ready',
    exerciseNumber: 1,
    totalExercises: 2,
    title: 'Créer un Ingress',
    description: 'Configure le routage HTTP vers ton Service',
    objective: 'Créer un Ingress routant "myapp.com" vers le service "webapp-service"',
    template: `apiVersion: networking.k8s.io/v1
kind: ___KIND___
metadata:
  name: webapp-ingress
  namespace: production
spec:
  rules:
  - host: ___HOST___
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ___SERVICE_NAME___
            port:
              number: 80`,
    blanks: [
      {
        id: 'kind',
        placeholder: '___KIND___',
        correctAnswer: 'Ingress',
        hint: 'Le type de ressource est "Ingress"'
      },
      {
        id: 'host',
        placeholder: '___HOST___',
        correctAnswer: 'myapp.com',
        hint: 'Le host doit être "myapp.com"'
      },
      {
        id: 'service_name',
        placeholder: '___SERVICE_NAME___',
        correctAnswer: 'webapp-service',
        hint: 'Le nom du service doit être "webapp-service"'
      }
    ],
    explanation: 'Ingress permet de router le trafic HTTP/HTTPS externe vers les Services internes du cluster.'
  },
  {
    id: 'ex-3-2',
    levelId: 3,
    levelName: 'Niveau 3 - Production Ready',
    exerciseNumber: 2,
    totalExercises: 2,
    title: 'Application complète',
    description: 'Crée un Deployment avec ConfigMap et Secret',
    objective: 'Déployer une app utilisant app-config et app-secrets',
    template: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
  namespace: ___NAMESPACE___
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: nginx:1.21
        envFrom:
        - configMapRef:
            name: ___CONFIGMAP_NAME___
        - secretRef:
            name: ___SECRET_NAME___
        ports:
        - containerPort: 80`,
    blanks: [
      {
        id: 'namespace',
        placeholder: '___NAMESPACE___',
        correctAnswer: 'production',
        hint: 'Le namespace doit être "production"'
      },
      {
        id: 'configmap_name',
        placeholder: '___CONFIGMAP_NAME___',
        correctAnswer: 'app-config',
        hint: 'Le nom du ConfigMap doit être "app-config"'
      },
      {
        id: 'secret_name',
        placeholder: '___SECRET_NAME___',
        correctAnswer: 'app-secrets',
        hint: 'Le nom du Secret doit être "app-secrets"'
      }
    ],
    explanation: 'envFrom permet d\'injecter toutes les données d\'un ConfigMap ou Secret comme variables d\'environnement.'
  }
];

// Application complète qui fonctionne ensemble
export const completeApp = {
  name: 'Application Web Complète',
  description: 'Une application web complète avec tous les composants Kubernetes nécessaires en production',
  components: [
    'namespace-basic',
    'configmap-basic',
    'secret-basic',
    'deployment-basic',
    'service-basic',
    'ingress-basic'
  ],
  instructions: [
    '1. Créer le Namespace pour isoler l\'application',
    '2. Créer le ConfigMap avec la configuration',
    '3. Créer le Secret avec les données sensibles',
    '4. Déployer l\'application avec le Deployment',
    '5. Exposer l\'application avec le Service',
    '6. Configurer l\'accès externe avec l\'Ingress'
  ],
  expectedResult: 'Une application web accessible via myapp.example.com avec configuration et secrets gérés proprement'
};
