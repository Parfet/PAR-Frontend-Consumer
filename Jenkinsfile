pipeline {
     agent any
     stages {
        stage("build") {
            when {
                branch 'main'
            }
            steps {
                echo ' Executing command for main'
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'yarn install'
                }
                echo ' Test automate deploy '
            }
        }
    }
}
