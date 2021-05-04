pipeline {
     agent any
     stages {
        stage("build") {
            steps {
                echo ' Executing yarn '
                withCredentials([file(credentialsId: 'FEenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                }
                withCredentials([file(credentialsId: 'FEenvprod', variable: 'envProd')]){
                    sh 'chmod 700 $WORKSPACE/.env.production || :'
                    sh 'rm -rf $WORKSPACE/.env.production || :'
                    sh 'cp $envProd $WORKSPACE'
                }
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'yarn install'
                    sh 'yarn add --dev typescript'
                    sh 'yarn build'
                }
            }
        }
        stage("Deploy"){
            steps{
                echo ' Executing yarn '
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'pm2 delete ${JOB_NAME} || :'
                    sh 'pm2 start yarn --name "${JOB_NAME}" -- staging'
                }
            }
        }
    }
}