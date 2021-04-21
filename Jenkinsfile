pipeline {
     agent any
     stages {
        stage("build") {
            steps {
                echo ' Executing yarn '
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'yarn install'
                    sh 'pm2 start yarn --name "[DEV]FE-Consumer" -- dev'
                }
            }
        }
    }
}