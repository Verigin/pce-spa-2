
/** All available environments. Can be set into `config` */
export const environments = [
    {
        name: "Production",
        baseURL: "https://palettecollector.com",
        couchDB: function(username, password) {
            username = encodeURIComponent(username.toLocaleLowerCase());
            password = encodeURIComponent(password);
            return `https://${username}:${password}@palettecollector.com/couchdb/`;
        }
    },
    {
        name: "Local Development Environment",
        baseURL: "https://192.168.2.168/",
        couchDB: function (username, password) {
            username = encodeURIComponent(username.toLocaleLowerCase());
            password = encodeURIComponent(password);
            return `https://${username}:${password}@192.168.2.168/couchdb/`;
        }
    }
];


/** The currently selected environment */
let config = Object.assign({}, environments[0]);

/** Switch to a different environment */
export const switchEnvironment = function(nextEnvironmentName) {
    const nextConfig = environments.find(environment => environment.name === nextEnvironmentName);
    if (!nextConfig || !nextConfig.name)
        console.error("Environment not found: " + nextEnvironmentName);
    // Copy all into config object
    for (const k in nextConfig)
        config[k]=nextConfig[k];
    console.log(`Switched environment to: ${nextEnvironmentName}`);
};

export default config;