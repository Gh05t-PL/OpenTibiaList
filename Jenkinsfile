import hudson.Util;
pipeline {
    agent any
    stages {
        stage('Pre-Deploy') {
            steps {
                withCredentials([string(credentialsId: 'DISCORD_OTSLIST', variable: 'secret')]) {
                    discordSend(
                        description: "Deploy NR: ${env.BUILD_NUMBER} rozpoczety",
                        footer: '',
                        image: '',
                        link: RUN_DISPLAY_URL,
                        result: currentBuild.currentResult,
                        thumbnail: '',
                        title: 'Deploy - Projekt Zespolowy - :airplane_departure:',
                        webhookURL: "https://discord.com/api/webhooks/${secret}"
                    )
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'SERVER_SECRET_OTSLIST', passwordVariable: 'password', usernameVariable: 'username'),
                        string(credentialsId: 'SERVER_SECRET_OTSLIST_DIRECTORY', variable: 'SERVER_SECRET_OTSLIST_DIRECTORY'),
                        file(credentialsId: 'OTSLIST_ENV_FILE', variable: 'FILE')
                    ]) {
                        def remote = [:]
                        remote.name = "OTSLIST"
                        remote.host = "51.89.23.200"
                        remote.allowAnyHosts = true
                        remote.user = username
                        remote.password = password
                        def BACK_APP_ENV = "prod"
                        def envFile = readFile(FILE)
                        println("""${envFile}""".stripIndent())

                        

                    }
                }
            }
        }
    }

    post {
        always {
            script {
                def buildDurationString = Util.getTimeSpanString(currentBuild.duration)

                withCredentials([string(credentialsId: 'DISCORD_OTSLIST', variable: 'secret')]) {
                    discordSend(
                        description: "Deploy NR: ${env.BUILD_NUMBER}\nCzas trwania: ${buildDurationString}\nStatus: ${currentBuild.result}",
                        footer: '',
                        image: '',
                        link: RUN_DISPLAY_URL,
                        result: currentBuild.currentResult,
                        thumbnail: '',
                        title: 'Deploy - Projekt Zespolowy - :airplane_arriving:',
                        webhookURL: "https://discord.com/api/webhooks/${secret}"
                    )
                }
            }
        }
    }
}
