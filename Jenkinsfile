pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo yarn install"
            }
        }
        stage("Deploy") {
            steps {
                sh "pm2 start yarn --name [Dev]PAR-FE-Consumer -- dev"
            }
        }
    }
}