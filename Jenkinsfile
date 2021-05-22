pipeline {

    agent any

    stages {
        stage("Preparing environment") {
            steps {

                echo ' Executing command for preparing '

                withCredentials([file(credentialsId: 'FEenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                } // End .env step

                withCredentials([file(credentialsId: 'FEenvdev', variable: 'envDev')]){
                    sh 'chmod 700 $WORKSPACE/.env.development || :'
                    sh 'rm -rf $WORKSPACE/.env.development || :'
                    sh 'cp $envDev $WORKSPACE'
                }// End .env.production step

                echo ' ------------------------------ '
                
            } // End steps
            
        } // End stage preparing environment

        stage("Deployment"){
            steps{

                echo ' Executing command for deployment '

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'

                echo ' ------------------------------ '

            } // End steps

        }// End stage deployment

    } // End stages
    
} // End pipeline