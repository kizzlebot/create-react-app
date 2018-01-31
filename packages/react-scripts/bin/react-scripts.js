#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const spawn = require('react-dev-utils/crossSpawn');
const args = process.argv.slice(2);
// const spawnProcess = (scriptName, args) => {

//   const argss = Object.keys(args).map((key) => {
//     return (args[key]) ? `--${key} ${args[key]}` : `--${key}` ;
//   });

//   const result = spawn.sync(
//     'node',
//     [ require.resolve(`../scripts/${scriptName}.js`) ].concat(argss),
//     { stdio: 'inherit' }
//   );

//   if (result.signal) {
//     if (result.signal === 'SIGKILL') {
//       console.log(
//         'The build failed because the process exited too early. ' +
//           'This probably means the system ran out of memory or someone called ' +
//           '`kill -9` on the process.'
//       );
//     } else if (result.signal === 'SIGTERM') {
//       console.log(`The build failed because the process exited too early. Someone might have called \`kill\` or \`killall\`, or the system could be shutting down.`);
//     }
//     process.exit(1);
//   }
//   process.exit(result.status);
// }
// require('yargs') // eslint-disable-line
//   .command('start', 'start webpack-dev-server', (yargs) => {
//     yargs.positional('port', {
//         describe: 'port to bind on',
//         default: 3000
//     });
//   }, (argv) => {
//     spawnProcess('start', argv)
//   })

//   .command('build', 'build webpack', (yargs) => {}, (args) => {
//     spawnProcess('build');
//   })
//   // .option('verbose', {
//   //   alias: 'v',
//   //   default: true
//   // })
//   .argv

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch (script) {
  case 'build':
  case 'eject':
  case 'start':
  case 'test': {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve('../scripts/' + script))
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if (result.signal === 'SIGTERM') {
        console.log(
          `The build failed because the process exited too early. Someone might have called \`kill\` or \`killall\`, or the system could be shutting down.`
        );
      }
      process.exit(1);
    }
    process.exit(result.status);
    break;
  }
  default:
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-scripts?');
    console.log(
      'See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases'
    );
    break;
}
