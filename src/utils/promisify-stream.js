'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
async function promisifyStream(stream) {
    return await new Promise((resolve, reject) => {
        stream
            .on('error', reject)
            .on('end', resolve);
    });
}
exports.promisifyStream = promisifyStream;
