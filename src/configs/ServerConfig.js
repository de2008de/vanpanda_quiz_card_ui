const determineEnvironment = () => {
    const currentHost = window.location.host;
    let ip;
    if (currentHost.indexOf("localhost") !== -1) {
        // develop
        ip = "http://localhost:8080"
    } else {
        // production
        ip = "https://gentle-peak-28389.herokuapp.com"
    }
    return {
        api: {
            ip: ip
        }
    };
};

const oServerConfig = determineEnvironment();

export default oServerConfig;
