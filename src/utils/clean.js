'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const del = require('del');
const path = require('path');
async function clean(directory) {
    return del([
        path.join(directory, '**/*')
    ], { cwd: process.cwd(), force: true });
}
exports.clean = clean;
