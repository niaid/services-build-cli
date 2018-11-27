[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Codecov](https://codecov.io/gh/LabShare/services-build-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/LabShare/services-build-cli)
[![Build Status](https://travis-ci.com/LabShare/services-build-cli.svg?token=zsifsALL6Np5avzzjVp1&branch=master)](https://travis-ci.com/LabShare/services-build-cli)

# services-build-cli

<!-- toc -->
* [services-build-cli](#services-build-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @labshare/services-build-cli
$ services COMMAND
running command...
$ services (-v|--version|version)
@labshare/services-build-cli/1.0.3 linux-x64 node-v10.13.0
$ services --help [COMMAND]
USAGE
  $ services COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`services build`](#services-build)
* [`services help [COMMAND]`](#services-help-command)

## `services build`

The services build CLI can be used to generate distributions for Node.js API projects.

```
USAGE
  $ services build

OPTIONS
  -b, --buildVersion=buildVersion  Set the project build version.
  -d, --destination=destination    Set the build distribution output folder.
  -h, --help                       show CLI help

  -s, --source=source              [default: /home/travis/build/LabShare/services-build-cli] Set the project root
                                   directory

  --npmCache=npmCache              Path to a directory. Overrides the global npm cache for the npm install step.

EXAMPLES
  $ services build
  $ services build --destination ./dist --buildVersion 0.1.2
```

_See code: [src/commands/build.ts](https://github.com/LabShare/services-build-cli/blob/v1.0.3/src/commands/build.ts)_

## `services help [COMMAND]`

display help for services

```
USAGE
  $ services help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
