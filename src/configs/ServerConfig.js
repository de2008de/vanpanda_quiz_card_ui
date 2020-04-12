const determineEnvironment = () => {
    const currentHost = window.location.hostname;
    const protocol = window.location.protocol;
    let ip;
    if (currentHost.indexOf("localhost") !== -1) {
        // develop
        ip = "http://localhost:8080";
    } else if (currentHost.indexOf("quizcard.io") !== -1) {
        // production
        ip = "https://server.quizcard.io";
    } else {
        ip = protocol + "//" + currentHost + ":8080"
    }
    return {
        api: {
            ip: ip
        }
    };
};

const oServerConfig = determineEnvironment();

export default oServerConfig;
