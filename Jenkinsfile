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
                    sh """
                    chmod 777 ./
                    pwd
                    rm -rf *.war
                    cd backend
                    pwd
                    ls
                    mvn clean install
                    cp ./target/survey-0.0.1-SNAPSHOT.war ./../ROOT.war
                    docker login -u kevlar2410 -p ${DOCKERHUB_PASS}
                    docker build -t ${DOCKER_IMAGE_NAME} .
                    echo "Docker Build success"
                    """
                }
            }
        }

        stage("Pushing Image to DockerHub") {
            steps {
                script {
                    sh "chmod 777 ./"
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
                        chmod 777 ./
                        pwd
                        cp /home/ubuntu/config ./config
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
