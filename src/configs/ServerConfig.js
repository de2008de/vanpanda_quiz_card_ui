const determineEnvironment = () => {
    const currentHost = window.location.host;
    let ip;
    if (currentHost.indexOf("localhost") !== -1) {
        // develop
        ip = "http://localhost:8080";
    } else if (currentHost.indexOf("app.vanpanda.com") !== -1) {
        // production
        // TODO: switch to https
        ip = "http://server.vanpanda.com";
    } else {
        // testing
        ip = "https://vanpanda-test.herokuapp.com";
    }
    return {
        api: {
            ip: ip
        }
    };
};

const oServerConfig = determineEnvironment();

export default oServerConfig;
