/**
 * @description Builds a web API service
 * @param {String} buildVersion
 * @param {String} [source]
 * @param {String} destination - The lib destination
 * @param {String} [npmCache] - Path to local npm cache directory
 * @returns {Promise}
 */
export declare function buildService({ source, destination, buildVersion, npmCache }: {
    source: any;
    destination: any;
    buildVersion: any;
    npmCache?: null;
}): Promise<any>;
