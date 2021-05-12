pipeline {

    agent any

    stages {
        stage("prepare for production") {

            when {
                branch 'main'
            }
            steps {

                echo ' Executing command for production '

                withCredentials([file(credentialsId: 'FEenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                }// End .env step

                withCredentials([file(credentialsId: 'FEenvprod', variable: 'envProd')]){
                    sh 'chmod 700 $WORKSPACE/.env.production || :'
                    sh 'rm -rf $WORKSPACE/.env.production || :'
                    sh 'cp $envProd $WORKSPACE'
                } // End .env.production step

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'

            } // End steps

        } // End stage prepare for production

        stage("prepare for staging") {

            when {
                branch 'staging'
            }
            steps {

                echo ' Executing command for staging '

                withCredentials([file(credentialsId: 'FEenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                } // End .env step

                withCredentials([file(credentialsId: 'FEenvprod', variable: 'envProd')]){
                    sh 'chmod 700 $WORKSPACE/.env.production || :'
                    sh 'rm -rf $WORKSPACE/.env.production || :'
                    sh 'cp $envProd $WORKSPACE'
                } // End .env.production step

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'
                        
            } // End steps

        } // End stage prepare for staging

        stage("prepare for development") {

            when {
                branch 'develop'
            }
            steps {

                echo ' Executing command for development '

                withCredentials([file(credentialsId: 'FEenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                } // End .env step

                withCredentials([file(credentialsId: 'FEenvdev', variable: 'envDev')]){
                    sh 'chmod 700 $WORKSPACE/.env.development || :'
                    sh 'rm -rf $WORKSPACE/.env.development || :'
                    sh 'cp $envDev $WORKSPACE'
                } // End .env.production step

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'
                
            } // End steps
            
        } // End stage prepare for development

    } // End stages
    
} // End pipeline