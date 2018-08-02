import {expect, test} from '@oclif/test';
import * as readPkg from 'read-pkg';
import {readdirSync, readFileSync} from 'fs';
import {resolve} from 'path';

const project = resolve(__dirname, '..', 'fixtures', 'test-api');

describe('build', () => {
    test
        .stdout()
        .command(['build', '--source', project])
        .it('creates a build', async (ctx) => {
            const {version} = await readPkg();

            expect(ctx.stdout).to.contain(`service.${version}`);

            const dist = resolve(process.cwd(), 'dist', `service.${version}`);
            const distFiles = readdirSync(dist);

            expect(distFiles).to.contain('node_modules');
            expect(distFiles).to.contain('.env');
            expect(readFileSync(resolve(dist, '.env')).toString())
                .to.contain(`LABSHARE_BUILD_VERSION=${version}`);
        });

    test
        .stdout()
        .command(['build', '--buildVersion', '0.1.2', '--source', project])
        .it('creates a build with a custom build version', ctx => {
            const expectedVersion = '0.1.2';
            const dist = resolve(process.cwd(), 'dist', `service.${expectedVersion}`);

            expect(ctx.stdout).to.contain(`service.${expectedVersion}`);
            expect(readFileSync(resolve(dist, '.env')).toString())
                .to.contain(`LABSHARE_BUILD_VERSION=${expectedVersion}`);
        });
});
