'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const fs_1 = require("fs");
const gulp = require("gulp");
const path_1 = require("path");
const child_process_1 = require("child_process");
const promisify_stream_1 = require("../utils/promisify-stream");
const clean_1 = require("../utils/clean");
/**
 * @description
 * @param {string} destination - The directory to copy the LabShare service source files to
 * @param {String} cwd - The current working directory
 * @returns {*}
 * @private
 */
async function copyServerFiles({ destination, cwd }) {
    const source = gulp.src([
        './*.*',
        './!(node_modules|docs|dist|test)/**/*',
        '!package-lock.json'
    ], { follow: true, base: cwd, cwd });
    return await promisify_stream_1.promisifyStream(source.pipe(gulp.dest(destination)));
}
/**
 * @description Builds a web API service
 * @param {String} buildVersion
 * @param {String} [source]
 * @param {String} destination - The lib destination
 * @param {String} [npmCache] - Path to local npm cache directory
 * @returns {Promise}
 */
async function buildService({ source, destination, buildVersion, npmCache = null }) {
    const localCache = npmCache || path_1.resolve(source, destination, 'local-npm-cache');
    const envFilePath = path_1.join(destination, '.env');
    await clean_1.clean(destination);
    log('Copy server files to distribution...');
    await copyServerFiles({ destination, cwd: source });
    const cmd = `npm i --cache=${localCache}`;
    log(`Installing server dependencies in ${destination}...`);
    log(`Command: ${cmd}`);
    // Use local cache directory to prevent global NPM cache concurrency problems.
    // See: https://github.com/npm/npm/issues/9696
    child_process_1.execSync(cmd, { cwd: destination });
    // Remove dev dependencies
    log('Removing extraneous dependencies with "npm prune"...');
    child_process_1.execSync(`npm prune`, { cwd: destination });
    // Store build version in the .env file
    fs_1.writeFileSync(envFilePath, `LABSHARE_BUILD_VERSION=${buildVersion}`);
    // Remove local npm caches.
    log(`Removing local cache directories in ${localCache} and ${path_1.join(destination, path_1.basename(localCache))}...`);
    await Promise.all([
        clean_1.clean(localCache),
        clean_1.clean(path_1.join(destination, path_1.basename(localCache)))
    ]);
    return destination;
}
exports.buildService = buildService;
