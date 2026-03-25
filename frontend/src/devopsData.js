// Données pour la section Outils DevOps (Helm, Docker, Prometheus, Grafana)

export const devopsTools = [
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    description: 'Conteneurisation d\'applications',
    color: '#0DB7ED',
    fullDescription: 'Docker permet de packager une application avec toutes ses dépendances dans un conteneur portable et léger.'
  },
  {
    id: 'helm',
    name: 'Helm',
    icon: '⎈',
    description: 'Package manager Kubernetes',
    color: '#0F1689',
    fullDescription: 'Helm facilite le déploiement et la gestion d\'applications Kubernetes complexes via des charts réutilisables.'
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    icon: '📊',
    description: 'Collecte de métriques',
    color: '#E6522C',
    fullDescription: 'Prometheus collecte et stocke les métriques de vos applications et infrastructure pour le monitoring.'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    icon: '📈',
    description: 'Visualisation de données',
    color: '#F46800',
    fullDescription: 'Grafana crée des dashboards interactifs pour visualiser les métriques collectées par Prometheus.'
  }
];

export const devopsLessons = [
  // DOCKER LESSONS
  {
    id: 'docker-1',
    toolId: 'docker',
    toolName: 'Docker',
    levelId: 1,
    lessonNumber: 1,
    totalLessons: 3,
    title: 'Introduction à Docker',
    description: 'Comprends les concepts de base : images, conteneurs, et Dockerfile',
    content: {
      theory: `Docker permet de créer des conteneurs qui encapsulent ton application avec toutes ses dépendances.

**Concepts clés :**
- **Image** : Template en lecture seule contenant l'application
- **Conteneur** : Instance en cours d'exécution d'une image
- **Dockerfile** : Instructions pour créer une image
- **Registry** : Stockage d'images (ex: Docker Hub)

**Avantages :**
✓ Portabilité - Fonctionne partout de manière identique
✓ Isolation - Chaque conteneur est isolé
✓ Légèreté - Plus léger qu'une VM
✓ Rapidité - Démarrage en secondes`,
      example: `# Dockerfile exemple
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
      commands: [
        'docker build -t mon-app:1.0 .',
        'docker run -p 3000:3000 mon-app:1.0',
        'docker ps',
        'docker images',
        'docker stop <container-id>'
      ]
    },
    exercise: {
      question: 'Que fait la commande "docker run -p 8080:80 nginx" ?',
      choices: [
        { id: 'a', text: 'Arrête nginx sur le port 8080', correct: false },
        { id: 'b', text: 'Lance nginx et map le port 80 du conteneur vers le port 8080 de l\'hôte', correct: true },
        { id: 'c', text: 'Crée une image nginx', correct: false },
        { id: 'd', text: 'Supprime tous les conteneurs nginx', correct: false }
      ],
      explanation: 'Le flag -p map un port de l\'hôte vers un port du conteneur. Format: -p <port-hôte>:<port-conteneur>'
    }
  },
  {
    id: 'docker-2',
    toolId: 'docker',
    toolName: 'Docker',
    levelId: 1,
    lessonNumber: 2,
    totalLessons: 3,
    title: 'Créer un Dockerfile',
    description: 'Apprends à écrire un Dockerfile pour une application Node.js',
    content: {
      theory: `Un Dockerfile contient les instructions pour créer une image Docker.

**Instructions principales :**
- **FROM** : Image de base
- **WORKDIR** : Définit le répertoire de travail
- **COPY** : Copie des fichiers dans l'image
- **RUN** : Exécute des commandes (installation, build)
- **EXPOSE** : Documente les ports utilisés
- **CMD** : Commande par défaut au démarrage`,
      example: `# Multi-stage build pour optimiser la taille
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]`,
      commands: [
        'docker build -t myapp:latest .',
        'docker build -t myapp:v2 --no-cache .',
        'docker tag myapp:latest username/myapp:latest',
        'docker push username/myapp:latest'
      ]
    },
    exercise: {
      question: 'Pourquoi utilise-t-on un multi-stage build ?',
      choices: [
        { id: 'a', text: 'Pour réduire la taille finale de l\'image', correct: true },
        { id: 'b', text: 'Pour accélérer l\'exécution', correct: false },
        { id: 'c', text: 'C\'est obligatoire', correct: false },
        { id: 'd', text: 'Pour créer plusieurs images', correct: false }
      ],
      explanation: 'Le multi-stage build permet de garder uniquement ce qui est nécessaire à l\'exécution, réduisant drastiquement la taille de l\'image finale.'
    }
  },
  {
    id: 'docker-3',
    toolId: 'docker',
    toolName: 'Docker',
    levelId: 1,
    lessonNumber: 3,
    totalLessons: 3,
    title: 'Docker Compose',
    description: 'Orchestre plusieurs conteneurs avec Docker Compose',
    content: {
      theory: `Docker Compose permet de définir et gérer des applications multi-conteneurs.

**Cas d'usage :**
- Application web + base de données
- Microservices locaux
- Stack de développement complète

**Avantages :**
✓ Configuration en un seul fichier YAML
✓ Démarrage/arrêt de tous les services en une commande
✓ Réseau automatique entre conteneurs
✓ Variables d'environnement centralisées`,
      example: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
      commands: [
        'docker-compose up -d',
        'docker-compose ps',
        'docker-compose logs -f web',
        'docker-compose down'
      ]
    },
    exercise: {
      question: 'Que fait "docker-compose up -d" ?',
      choices: [
        { id: 'a', text: 'Arrête tous les conteneurs', correct: false },
        { id: 'b', text: 'Démarre tous les services en arrière-plan', correct: true },
        { id: 'c', text: 'Supprime les volumes', correct: false },
        { id: 'd', text: 'Affiche les logs', correct: false }
      ],
      explanation: 'Le flag -d (detached) lance les conteneurs en arrière-plan, libérant le terminal.'
    }
  },

  // HELM LESSONS
  {
    id: 'helm-1',
    toolId: 'helm',
    toolName: 'Helm',
    levelId: 2,
    lessonNumber: 1,
    totalLessons: 3,
    title: 'Introduction à Helm',
    description: 'Découvre Helm, le package manager de Kubernetes',
    content: {
      theory: `Helm est le package manager de Kubernetes, comme npm pour Node.js ou apt pour Linux.

**Concepts clés :**
- **Chart** : Package Helm contenant tous les manifests Kubernetes
- **Release** : Instance d'un chart déployé
- **Values** : Paramètres configurables du chart
- **Repository** : Collection de charts

**Pourquoi Helm ?**
✓ Réutilisabilité - Partage et réutilise des configurations
✓ Versionning - Gère les versions de déploiements
✓ Rollback - Retour arrière facile
✓ Templates - Configuration dynamique avec Go templates`,
      example: `# Structure d'un Helm Chart
mychart/
  Chart.yaml          # Métadonnées du chart
  values.yaml         # Valeurs par défaut
  templates/
    deployment.yaml
    service.yaml
    ingress.yaml
  charts/             # Dépendances`,
      commands: [
        'helm create mychart',
        'helm install myapp mychart/',
        'helm list',
        'helm upgrade myapp mychart/',
        'helm rollback myapp'
      ]
    },
    exercise: {
      question: 'Qu\'est-ce qu\'un Helm Chart ?',
      choices: [
        { id: 'a', text: 'Un graphique de monitoring', correct: false },
        { id: 'b', text: 'Un package contenant des manifests Kubernetes', correct: true },
        { id: 'c', text: 'Un type de conteneur', correct: false },
        { id: 'd', text: 'Une commande kubectl', correct: false }
      ],
      explanation: 'Un Chart est un package Helm qui contient tous les fichiers YAML nécessaires pour déployer une application Kubernetes.'
    }
  },
  {
    id: 'helm-2',
    toolId: 'helm',
    toolName: 'Helm',
    levelId: 2,
    lessonNumber: 2,
    totalLessons: 3,
    title: 'Values et Templates',
    description: 'Utilise les values.yaml et les templates Go',
    content: {
      theory: `Les templates Helm utilisent le langage Go pour rendre les manifests dynamiques.

**Syntaxe importante :**
- \`{{ .Values.nom }}\` - Accède aux valeurs
- \`{{ .Release.Name }}\` - Nom de la release
- \`{{ .Chart.Name }}\` - Nom du chart
- \`{{- if condition }}\` - Conditions
- \`{{- range .Values.list }}\` - Boucles

**values.yaml :**
Contient toutes les valeurs configurables du chart.`,
      example: `# values.yaml
replicaCount: 3
image:
  repository: nginx
  tag: "1.21"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: 80

# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-{{ .Chart.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        ports:
        - containerPort: {{ .Values.service.port }}`,
      commands: [
        'helm install myapp mychart/ --values custom-values.yaml',
        'helm get values myapp',
        'helm upgrade myapp mychart/ --set replicaCount=5',
        'helm template mychart/'
      ]
    },
    exercise: {
      question: 'Comment surcharger une valeur lors de l\'installation d\'un chart ?',
      choices: [
        { id: 'a', text: 'Modifier directement le chart', correct: false },
        { id: 'b', text: 'Utiliser --set ou --values avec un fichier personnalisé', correct: true },
        { id: 'c', text: 'C\'est impossible', correct: false },
        { id: 'd', text: 'Supprimer et réinstaller', correct: false }
      ],
      explanation: 'On peut surcharger les valeurs avec --set pour une valeur unique ou --values pour un fichier complet.'
    }
  },
  {
    id: 'helm-3',
    toolId: 'helm',
    toolName: 'Helm',
    levelId: 2,
    lessonNumber: 3,
    totalLessons: 3,
    title: 'Déployer avec Helm',
    description: 'Déploie une application complète avec Helm',
    content: {
      theory: `Déployer une application avec Helm est simple et reproductible.

**Workflow typique :**
1. Ajouter un repository Helm
2. Chercher le chart souhaité
3. Personnaliser les values
4. Installer le chart
5. Vérifier le déploiement
6. Mettre à jour si nécessaire

**Charts populaires :**
- nginx-ingress, cert-manager, postgres, redis, mongodb`,
      example: `# Ajouter un repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Installer PostgreSQL
helm install my-postgres bitnami/postgresql \\
  --set auth.postgresPassword=secret \\
  --set primary.persistence.size=10Gi

# Vérifier
helm status my-postgres
kubectl get pods -l app.kubernetes.io/instance=my-postgres`,
      commands: [
        'helm repo add stable https://charts.helm.sh/stable',
        'helm search repo nginx',
        'helm show values bitnami/nginx',
        'helm install nginx bitnami/nginx',
        'helm uninstall nginx'
      ]
    },
    exercise: {
      question: 'Que fait la commande "helm rollback myapp 2" ?',
      choices: [
        { id: 'a', text: 'Supprime la release myapp', correct: false },
        { id: 'b', text: 'Revient à la version 2 de la release myapp', correct: true },
        { id: 'c', text: 'Crée 2 réplicas', correct: false },
        { id: 'd', text: 'Met à jour vers la version 2', correct: false }
      ],
      explanation: 'helm rollback permet de revenir à une version précédente d\'une release, utile en cas de problème après une mise à jour.'
    }
  },

  // PROMETHEUS LESSONS
  {
    id: 'prometheus-1',
    toolId: 'prometheus',
    toolName: 'Prometheus',
    levelId: 3,
    lessonNumber: 1,
    totalLessons: 2,
    title: 'Introduction à Prometheus',
    description: 'Comprends comment Prometheus collecte les métriques',
    content: {
      theory: `Prometheus est un système de monitoring qui collecte et stocke les métriques en time-series.

**Architecture :**
- **Prometheus Server** : Collecte et stocke les métriques
- **Exporters** : Exposent les métriques des applications
- **AlertManager** : Gère les alertes
- **PromQL** : Langage de requête des métriques

**Types de métriques :**
- **Counter** : Compteur qui augmente (requêtes HTTP)
- **Gauge** : Valeur qui monte/descend (température, mémoire)
- **Histogram** : Distribution de valeurs (latence)
- **Summary** : Similar à histogram avec quantiles`,
      example: `# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        target_label: __metrics_path__
        regex: (.+)`,
      commands: [
        'kubectl apply -f prometheus-deployment.yaml',
        'kubectl port-forward svc/prometheus 9090:9090',
        'curl http://localhost:9090/metrics',
        'promtool check config prometheus.yml'
      ]
    },
    exercise: {
      question: 'Quel est le rôle d\'un exporter Prometheus ?',
      choices: [
        { id: 'a', text: 'Exporter des données vers une base de données', correct: false },
        { id: 'b', text: 'Exposer les métriques d\'une application au format Prometheus', correct: true },
        { id: 'c', text: 'Créer des graphiques', correct: false },
        { id: 'd', text: 'Envoyer des alertes', correct: false }
      ],
      explanation: 'Un exporter expose les métriques d\'une application ou d\'un système dans un format que Prometheus peut scraper.'
    }
  },
  {
    id: 'prometheus-2',
    toolId: 'prometheus',
    toolName: 'Prometheus',
    levelId: 3,
    lessonNumber: 2,
    totalLessons: 2,
    title: 'Requêtes PromQL',
    description: 'Apprends à interroger les métriques avec PromQL',
    content: {
      theory: `PromQL est le langage de requête de Prometheus pour interroger les métriques.

**Requêtes de base :**
- \`metric_name\` - Toutes les valeurs d'une métrique
- \`metric_name{label="value"}\` - Filtrer par label
- \`rate(metric_name[5m])\` - Taux de changement sur 5min
- \`sum(metric_name)\` - Somme de toutes les valeurs

**Opérateurs :**
- Arithmétiques : +, -, *, /, %
- Comparaison : ==, !=, >, <, >=, <=
- Agrégation : sum, avg, max, min, count`,
      example: `# CPU usage moyen
avg(rate(container_cpu_usage_seconds_total[5m])) by (pod)

# Mémoire utilisée > 80%
(container_memory_usage_bytes / container_memory_limit_bytes) > 0.8

# Requêtes HTTP par seconde
sum(rate(http_requests_total[1m])) by (status_code)

# Top 5 pods utilisant le plus de CPU
topk(5, rate(container_cpu_usage_seconds_total[5m]))`,
      commands: [
        'curl http://prometheus:9090/api/v1/query?query=up',
        'promtool query instant http://localhost:9090 "up"',
        'promtool query range http://localhost:9090 "rate(http_requests_total[5m])"'
      ]
    },
    exercise: {
      question: 'Que fait la fonction rate() dans PromQL ?',
      choices: [
        { id: 'a', text: 'Calcule la somme', correct: false },
        { id: 'b', text: 'Calcule le taux de changement par seconde', correct: true },
        { id: 'c', text: 'Affiche la valeur maximale', correct: false },
        { id: 'd', text: 'Compte le nombre de métriques', correct: false }
      ],
      explanation: 'rate() calcule le taux de changement par seconde d\'un counter sur une période donnée. Essentiel pour mesurer les taux (req/s, errors/s).'
    }
  },

  // GRAFANA LESSONS
  {
    id: 'grafana-1',
    toolId: 'grafana',
    toolName: 'Grafana',
    levelId: 3,
    lessonNumber: 1,
    totalLessons: 2,
    title: 'Introduction à Grafana',
    description: 'Crée des dashboards pour visualiser tes métriques',
    content: {
      theory: `Grafana transforme les métriques en visualisations compréhensibles.

**Concepts clés :**
- **Dashboard** : Collection de panels
- **Panel** : Visualisation individuelle (graph, gauge, table)
- **Data Source** : Source de données (Prometheus, InfluxDB, etc.)
- **Query** : Requête pour récupérer les données
- **Variables** : Paramètres dynamiques du dashboard

**Types de visualisations :**
- Time series graph, Stat panel, Gauge, Bar chart, Heatmap, Table`,
      example: `# grafana-datasource.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-datasources
data:
  prometheus.yaml: |
    apiVersion: 1
    datasources:
    - name: Prometheus
      type: prometheus
      access: proxy
      url: http://prometheus:9090
      isDefault: true`,
      commands: [
        'kubectl apply -f grafana-deployment.yaml',
        'kubectl port-forward svc/grafana 3000:3000',
        'helm install grafana grafana/grafana',
        'kubectl get secret grafana -o jsonpath="{.data.admin-password}" | base64 -d'
      ]
    },
    exercise: {
      question: 'Quelle est la source de données principale utilisée avec Grafana pour Kubernetes ?',
      choices: [
        { id: 'a', text: 'MySQL', correct: false },
        { id: 'b', text: 'Prometheus', correct: true },
        { id: 'c', text: 'MongoDB', correct: false },
        { id: 'd', text: 'Redis', correct: false }
      ],
      explanation: 'Prometheus est la source de données la plus couramment utilisée avec Grafana dans les environnements Kubernetes.'
    }
  },
  {
    id: 'grafana-2',
    toolId: 'grafana',
    toolName: 'Grafana',
    levelId: 3,
    lessonNumber: 2,
    totalLessons: 2,
    title: 'Créer des Dashboards',
    description: 'Construis des dashboards personnalisés avec alertes',
    content: {
      theory: `Un bon dashboard Grafana raconte une histoire sur l'état de ton système.

**Best practices :**
- Commence par les métriques clés (Golden Signals)
- Utilise des variables pour la flexibilité
- Organise en lignes logiques (Overview, Détails, Troubleshooting)
- Configure des alertes pour les seuils critiques

**Golden Signals :**
1. **Latency** - Temps de réponse
2. **Traffic** - Nombre de requêtes
3. **Errors** - Taux d'erreurs
4. **Saturation** - Utilisation des ressources`,
      example: `# Dashboard JSON snippet
{
  "dashboard": {
    "title": "Kubernetes Cluster Monitoring",
    "panels": [
      {
        "title": "CPU Usage",
        "targets": [{
          "expr": "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)"
        }],
        "type": "graph"
      },
      {
        "title": "Memory Usage",
        "targets": [{
          "expr": "sum(container_memory_usage_bytes) by (pod)"
        }],
        "type": "graph"
      }
    ]
  }
}`,
      commands: [
        'grafana-cli plugins install grafana-piechart-panel',
        'curl -X POST http://admin:password@localhost:3000/api/dashboards/db -d @dashboard.json',
        'kubectl get configmap grafana-dashboards'
      ]
    },
    exercise: {
      question: 'Que sont les "Golden Signals" en monitoring ?',
      choices: [
        { id: 'a', text: 'Les 4 métriques clés : Latency, Traffic, Errors, Saturation', correct: true },
        { id: 'b', text: 'Les alertes les plus importantes', correct: false },
        { id: 'c', text: 'Les dashboards par défaut', correct: false },
        { id: 'd', text: 'Les métriques CPU uniquement', correct: false }
      ],
      explanation: 'Les Golden Signals (Google SRE) sont les 4 métriques essentielles pour monitorer n\'importe quel système : latence, trafic, erreurs, et saturation.'
    }
  }
];

// Exercices pratiques à trous pour les outils DevOps
export const devopsExercises = [
  {
    id: 'dockerfile-ex-1',
    toolId: 'docker',
    category: 'Docker - Niveau 1',
    exerciseNumber: 1,
    totalExercises: 2,
    title: 'Créer un Dockerfile Node.js',
    description: 'Complète le Dockerfile pour une application Node.js',
    objective: 'Utiliser node:18-alpine et exposer le port 3000',
    template: `FROM ___BASE_IMAGE___
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ___PORT___
CMD ["npm", "start"]`,
    blanks: [
      {
        id: 'base_image',
        placeholder: '___BASE_IMAGE___',
        correctAnswer: 'node:18-alpine',
        hint: 'L\'image de base doit être "node:18-alpine"'
      },
      {
        id: 'port',
        placeholder: '___PORT___',
        correctAnswer: '3000',
        hint: 'Le port doit être 3000'
      }
    ],
    explanation: 'FROM définit l\'image de base. Alpine est une distribution Linux ultra-légère, idéale pour les conteneurs.'
  },
  {
    id: 'dockerfile-ex-2',
    toolId: 'docker',
    category: 'Docker - Niveau 1',
    exerciseNumber: 2,
    totalExercises: 2,
    title: 'Docker Compose multi-services',
    description: 'Configure une stack web + database',
    objective: 'Créer un service "db" avec postgres:14 et un volume "db_data"',
    template: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - ___SERVICE_NAME___
  
  ___SERVICE_NAME___:
    image: ___IMAGE___
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - ___VOLUME_NAME___:/var/lib/postgresql/data

volumes:
  ___VOLUME_NAME___:`,
    blanks: [
      {
        id: 'service_name',
        placeholder: '___SERVICE_NAME___',
        correctAnswer: 'db',
        hint: 'Le nom du service doit être "db"'
      },
      {
        id: 'image',
        placeholder: '___IMAGE___',
        correctAnswer: 'postgres:14',
        hint: 'L\'image doit être "postgres:14"'
      },
      {
        id: 'volume_name',
        placeholder: '___VOLUME_NAME___',
        correctAnswer: 'db_data',
        hint: 'Le nom du volume doit être "db_data"'
      }
    ],
    explanation: 'Docker Compose utilise des volumes nommés pour persister les données entre les redémarrages de conteneurs.'
  },
  {
    id: 'helm-ex-1',
    toolId: 'helm',
    category: 'Helm - Niveau 2',
    exerciseNumber: 1,
    totalExercises: 2,
    title: 'Values.yaml Helm',
    description: 'Configure les valeurs d\'un chart Helm',
    objective: 'Définir 5 réplicas et l\'image nginx:1.21',
    template: `replicaCount: ___REPLICAS___

image:
  repository: ___REPOSITORY___
  tag: "___TAG___"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80`,
    blanks: [
      {
        id: 'replicas',
        placeholder: '___REPLICAS___',
        correctAnswer: '5',
        hint: 'Le nombre de réplicas doit être 5'
      },
      {
        id: 'repository',
        placeholder: '___REPOSITORY___',
        correctAnswer: 'nginx',
        hint: 'Le repository doit être "nginx"'
      },
      {
        id: 'tag',
        placeholder: '___TAG___',
        correctAnswer: '1.21',
        hint: 'Le tag doit être "1.21"'
      }
    ],
    explanation: 'values.yaml centralise toutes les valeurs configurables d\'un chart Helm, facilitant la personnalisation.'
  },
  {
    id: 'helm-ex-2',
    toolId: 'helm',
    category: 'Helm - Niveau 2',
    exerciseNumber: 2,
    totalExercises: 2,
    title: 'Helm Template',
    description: 'Utilise les templates Go dans Helm',
    objective: 'Créer un Deployment utilisant les values pour replicas et image',
    template: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
spec:
  replicas: {{ .___REPLICAS_PATH___ }}
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
        image: "{{ .___IMAGE_REPO___ }}:{{ .___IMAGE_TAG___ }}"`,
    blanks: [
      {
        id: 'replicas_path',
        placeholder: '___REPLICAS_PATH___',
        correctAnswer: 'Values.replicaCount',
        hint: 'Utilise .Values.replicaCount'
      },
      {
        id: 'image_repo',
        placeholder: '___IMAGE_REPO___',
        correctAnswer: 'Values.image.repository',
        hint: 'Utilise .Values.image.repository'
      },
      {
        id: 'image_tag',
        placeholder: '___IMAGE_TAG___',
        correctAnswer: 'Values.image.tag',
        hint: 'Utilise .Values.image.tag'
      }
    ],
    explanation: 'Les templates Helm utilisent {{ }} pour insérer des valeurs dynamiques depuis values.yaml.'
  },
  {
    id: 'prometheus-ex-1',
    toolId: 'prometheus',
    category: 'Prometheus - Niveau 3',
    exerciseNumber: 1,
    totalExercises: 1,
    title: 'Configuration Prometheus',
    description: 'Configure un job de scraping Prometheus',
    objective: 'Scraper les pods Kubernetes avec annotation prometheus.io/scrape',
    template: `scrape_configs:
  - job_name: '___JOB_NAME___'
    scrape_interval: ___INTERVAL___
    kubernetes_sd_configs:
      - role: ___ROLE___
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: ___ACTION___
        regex: true`,
    blanks: [
      {
        id: 'job_name',
        placeholder: '___JOB_NAME___',
        correctAnswer: 'kubernetes-pods',
        hint: 'Le job doit s\'appeler "kubernetes-pods"'
      },
      {
        id: 'interval',
        placeholder: '___INTERVAL___',
        correctAnswer: '30s',
        hint: 'L\'intervalle doit être "30s"'
      },
      {
        id: 'role',
        placeholder: '___ROLE___',
        correctAnswer: 'pod',
        hint: 'Le role doit être "pod"'
      },
      {
        id: 'action',
        placeholder: '___ACTION___',
        correctAnswer: 'keep',
        hint: 'L\'action doit être "keep"'
      }
    ],
    explanation: 'Cette configuration permet à Prometheus de découvrir automatiquement les pods Kubernetes et de scraper ceux qui ont l\'annotation prometheus.io/scrape=true.'
  }
];
