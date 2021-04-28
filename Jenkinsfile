pipeline {
     agent any
     stages {
        stage('Preparing') {
            when {
                branch 'main'
            }
            steps {
                echo ' Yarn installation for main '
            }
            when {
                branch 'staging'
            }
            steps {
                echo ' Yarn installation for staging '
            }
            when {
                branch 'develop'
            }
            steps {
                echo ' Yarn installation for develop '
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'yarn install'
                    sh 'yarn add --dev typescript'
                }
            }
        }
        stage('build') {
            when {
                branch 'main'
            }
            steps {
                echo ' Executing command for main'
            }
            when {
                branch 'staging'
            }
            steps {
                echo ' Executing command for staging '
            }
            when {
                branch 'develop'
            }
            steps {
                echo ' Executing command for develop'
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'pm2 delete ${JOB_NAME} || :'
                    sh 'pm2 start yarn --name "${JOB_NAME}" -- dev'
                }
            }
        }
    }
}
