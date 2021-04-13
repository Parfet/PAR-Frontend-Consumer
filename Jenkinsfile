pipeline {
     agent any
     stages {
        stage("build") {
            steps {
                echo ' Executing yarn '
                nodejs('node-14.16.0') {
                    sh 'yarn install'
                }
            }
        }
    }
}