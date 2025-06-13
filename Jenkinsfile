pipeline {
    agent any // Le job peut tourner sur n’importe quel agent disponible.

    environment {
        DOCKER_IMAGE = 'oumayma/my-react-app' // Variable d’environnement pour le nom de l’image Docker.
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Récupère le code depuis le repo configuré dans le job Jenkins (Pipeline SCM)
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install' // Installe les dépendances Node.js
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build' // Compile/build l’application React (génère les fichiers statiques dans build/)
            }
        }

        stage('Docker Build & Push') {
            environment {
                DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id') 
                // Injecte tes identifiants DockerHub sécurisés (stockés dans Jenkins) pour push l’image
            }
            steps {
                script {
                    // Authentification au registre Docker et build puis push l’image
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        def customImage = docker.build("${env.DOCKER_IMAGE}:latest") // Build de l’image Docker
                        customImage.push() // Push de l’image sur DockerHub
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Nettoie le workspace Jenkins, même si le build échoue
        }
    }
}

