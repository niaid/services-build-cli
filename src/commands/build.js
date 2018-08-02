'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const build_service_1 = require("../lib/build-service");
const lodash_1 = require("lodash");
const path_1 = require("path");
const readPkg = require("read-pkg");
const command_1 = require("@oclif/command");
class Build extends command_1.Command {
    async run() {
        const { flags } = this.parse(Build);
        const pkg = await readPkg();
        const destination = path_1.join('dist', ['service', flags.buildVersion || pkg.version].join('.'));
        const options = lodash_1.defaults(flags, {
            buildVersion: pkg.version,
            destination,
            npmCache: null
        });
        await build_service_1.buildService(options);
    }
}
Build.description = 'Builds a Node.js API distribution';
Build.examples = [
    `$ services build`,
    `$ services build --destination ./dist --buildVersion 0.1.2`
];
Build.flags = {
    help: command_1.flags.help({ char: 'h' }),
    source: command_1.flags.string({
        char: 's',
        description: 'The API project root directory',
        default: process.cwd()
    }),
    destination: command_1.flags.string({
        char: 'd',
        description: 'The path to the API distribution'
    }),
    npmCache: command_1.flags.string({
        description: 'Path to a directory. Overrides the global npm cache for the npm install step.'
    }),
    buildVersion: command_1.flags.string({
        char: 'b',
        description: 'Customize the API project build version'
    })
};
Build.args = [];
exports.Build = Build;
