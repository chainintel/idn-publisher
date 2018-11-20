#! /usr/bin/env node
var colors = require('colors');
const { Publisher } = require('../dist/index');
let program = require('commander');
const Confirm = require('prompt-confirm');

function list(val) {
  return val.split(',');
}

function sizelist(val) {
  return val.split(',').map((x) => parseInt(x));
}

program = program
  .command('idn-publish')
  .description('publish an idn model as a package to npm registry')
  .option('-t, --token <token>', 'npm publish access token')
  .option('--version <version>', 'package version')
  .option('--name <name>', 'package name')
  .option('--description <description>', 'package description')
  .option('--author <author>', 'package author')
  .option('--license <license>', 'package license')
  .option('--types <types>', 'model type', list)
  .option('--path <path>', 'model path')
  .option('--id <id>', 'model id')
  .option('--inputs <inputs>', 'model input size. e.g., [1,1,28,28]', sizelist)
  .option('--outputs <outputs>', 'model output size. e.g., [1,10]', sizelist)
  .option('-y, --yes', 'no confirmation')
  .parse(process.argv);

if (program.token) {
  let publiser = new Publisher({
    token: program.token
  });

  let pkg = {
    version: program.version,
    name: program.name,
    description:
      (typeof program.description === 'string' ? program.description : '') +
      `IDN model with id:${program.id} and types:${program.types.join(',')} available at ${
        program.path
      }`,
    author: program.author,
    license: program.license,
    keywords: ['idn', program.id]
      .concat(program.types)
      .concat([program.inputs.join(','), program.outputs.join(',')]),
    model: {
      types: program.types,
      path: program.path,
      id: program.id,
      inputs: [
        {
          shape: program.inputs
        }
      ],
      outputs: [
        {
          shape: program.outputs
        }
      ]
    }
  };

  if (program.yes) {
    publiser.publish(pkg).catch((error) => {});
  } else {
    new Confirm(`${JSON.stringify(pkg, null, 2).green} Publish?`).ask(function(answer) {
      if (answer) {
        publiser.publish(pkg).catch((error) => {});
      }
    });
  }
}
