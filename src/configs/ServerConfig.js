const determineEnvironment = () => {
    const currentHost = window.location.hostname;
    const protocol = window.location.protocol;
    let ip;
    if (currentHost.indexOf("localhost") !== -1) {
        // develop
        ip = "http://localhost:8080";
    } else if (currentHost.indexOf("app.vanpanda.com") !== -1) {
        // production
        ip = "https://server.vanpanda.com";
    } else if (currentHost.indexOf("apptest.vanpanda.com") !== -1) {
        // testing
        ip = "https://vanpanda-test.herokuapp.com";
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
