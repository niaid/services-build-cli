'use strict';

export async function promisifyStream(stream): Promise<any> {
    return await new Promise((resolve, reject) => {
        stream
            .on('error', reject)
            .on('end', resolve);
    });
}
