'use strict';

import {buildService} from "../lib/build-service";
import {defaults} from 'lodash';
import {join} from "path";
import * as readPkg from 'read-pkg';
import {Command, flags} from '@oclif/command'

export class Build extends Command {
    static description = 'Builds a Node.js API distribution';

    static examples = [
        `$ services build`,
        `$ services build --destination ./dist --buildVersion 0.1.2`
    ];

    static flags = {
        help: flags.help({char: 'h'}),
        source: flags.string({
            char: 's',
            description: 'The API project root directory'
        }),
        destination: flags.string({
            char: 'd',
            description: 'The path to the API distribution'
        }),
        npmCache: flags.boolean({
            description: 'Overrides global npm cache for npm install'
        }),
        buildVersion: flags.string({
            char: 'b',
            description: 'Customize the service build version'
        })
    };

    static args = [];

    async run() {
        const {flags} = this.parse(Build);
        const pkg = await readPkg();
        const destination = join('dist', ['service', flags.buildVersion || pkg.version].join('.'));
        const options = defaults(flags, {
            buildVersion: pkg.version,
            npmCache: null,
            destination,
            source: process.cwd()
        });

        await buildService(options);
    }
}
