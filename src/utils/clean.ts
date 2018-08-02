'use strict';

const del = require('del');
const path = require('path');

export async function clean(directory): Promise<any> {
    return del([
        path.join(directory, '**/*')
    ], {cwd: process.cwd(), force: true});
}
