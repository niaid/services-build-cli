'use strict';

import * as log from 'fancy-log';
import {writeFileSync} from 'fs';
import * as gulp from 'gulp';
import {basename, join, resolve} from 'path';
import {execSync} from 'child_process';
import {promisifyStream} from "../utils/promisify-stream";
import {clean} from "../utils/clean";

/**
 * @description
 * @param {string} destination - The directory to copy the LabShare service source files to
 * @param {String} cwd - The current working directory
 * @returns {*}
 * @private
 */
async function copyServerFiles({destination, cwd}) {
    const source = gulp.src([
        './*.*',
        './!(node_modules|docs|dist|test)/**/*',
        '!package-lock.json'
    ], {follow: true, base: cwd, cwd});

    return await promisifyStream(source.pipe(gulp.dest(destination)));
}

/**
 * @description Builds a web API service
 * @param {String} buildVersion
 * @param {String} [source]
 * @param {String} destination - The lib destination
 * @param {String} [npmCache] - Path to local npm cache directory
 * @returns {Promise}
 */
export async function buildService({
                                       source,
                                       destination,
                                       buildVersion,
                                       npmCache
                                   }) {
    const localCache = npmCache || resolve(source, destination, 'local-npm-cache');
    const envFilePath = join(destination, '.env');

    await clean(destination);

    log('Copy server files to distribution...');
    await copyServerFiles({destination, cwd: source});

    const cmd = `npm i --cache=${localCache}`;

    log(`Installing server dependencies in ${destination}...`);
    log(`Command: ${cmd}`);

    // Use local cache directory to prevent global NPM cache concurrency problems.
    // See: https://github.com/npm/npm/issues/9696
    execSync(cmd, {cwd: destination});

    // Remove dev dependencies
    log('Removing extraneous dependencies with "npm prune"...');
    execSync(`npm prune`, {cwd: destination});

    // Store build version in the .env file
    writeFileSync(envFilePath, `LABSHARE_BUILD_VERSION=${buildVersion}`);

    // Remove local npm caches.
    log(`Removing local cache directories in ${localCache} and ${join(destination, basename(localCache))}...`);
    await Promise.all([
        clean(localCache),
        clean(join(destination, basename(localCache)))
    ]);

    return destination;
}
