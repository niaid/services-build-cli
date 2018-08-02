import { Command, flags } from '@oclif/command';
export declare class Build extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("../../../../../../../Users/virtanevakd/Desktop/Projects/services-build-cli/node_modules/@oclif/parser/lib/flags").IBooleanFlag<void>;
        source: flags.IOptionFlag<string | undefined>;
        destination: flags.IOptionFlag<string | undefined>;
        npmCache: flags.IOptionFlag<string | undefined>;
        buildVersion: flags.IOptionFlag<string | undefined>;
    };
    static args: never[];
    run(): Promise<void>;
}
