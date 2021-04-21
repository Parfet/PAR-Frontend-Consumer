pipeline {
     agent any
     stages {
        stage("build") {
            steps {
                echo ' Executing yarn '
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'yarn install'
                    sh 'yarn add --dev typescript'
                    sh 'pm2 del ${JOB_NAME}'
                    sh 'pm2 start yarn --name "${JOB_NAME}" -- dev'
                }
            }
        }
    }
}