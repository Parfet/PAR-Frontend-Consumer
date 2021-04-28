pipeline {
     agent any
     stages {
        stage("build") {
            when {
                branch 'main'
            }
            steps {
                echo ' Executing command for main'
                echo ' Test Jenkins trigger '
            }
        }
    }
}
