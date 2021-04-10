pipeline {
    agent any
    stages {
        stage('Init'){
            steps {
                echo 'Init'
                echo '******************************'
                sh 'node --version'
                sh 'yarn --version'
            }
        }
        stage('Yarn Install'){
            steps {
                echo 'Yarn Install'
                echo '******************************'
                sh 'cd ./PAR-Frontend-Consumer'
                sh 'yarn install'
            }
        }
        stage('Yarn dev'){
            steps {
                echo 'Yarn dev'
                echo '******************************'
                sh 'pm2 start yarn --name [DEV]PAR-Fe-Consumer -- dev'
            }
        }
    }
}