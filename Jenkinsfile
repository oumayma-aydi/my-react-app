pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ouma999/flask-jenkins-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            environment {
                DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        def customImage = docker.build("${env.DOCKER_IMAGE}:latest")
                        customImage.push()
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}

