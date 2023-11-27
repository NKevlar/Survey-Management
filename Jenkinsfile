pipeline {
    agent any

    environment {
        DOCKERHUB_PASS = credentials('DOCKERHUB_PASS')
        TIMESTAMP = "${BUILD_TIMESTAMP}"
        DOCKER_IMAGE_NAME = "kevlar2410/survey-api:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Building the Spring Boot Application') {
            steps {
                script {
                    checkout scm
                    sh "pwd"
                    sh 'rm -rf *.war'
                    sh 'cd backend'
                    sh 'pwd'
                    sh 'mvn clean install'
                    sh 'cp ./target/survey-0.0.1-SNAPSHOT.war ./../ROOT.war'
                    sh "docker login -u kevlar2410 -p ${DOCKERHUB_PASS}"
                    sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                    echo "Docker Build success"
                }
            }
        }

        stage("Pushing Image to DockerHub") {
            steps {
                script {
                    sh "docker login -u kevlar2410 -p ${DOCKERHUB_PASS}"
                    sh "docker push ${DOCKER_IMAGE_NAME}"
                    echo "Docker push success"
                }
            }
        }

        stage("Deploying to Rancher as a Single Pod") {
            steps {
                script {
                        sh """
                        pwd
                        export KUBECONFIG=config
                        kubectl config get-contexts
                        kubectl config view
                        kubectl set image deployment/survey-deployment container-0=kevlar2410/survey-api:${env.BUILD_NUMBER}
                        echo "Deployment success"
                        """
                    }
                }
            }
        }
    }
