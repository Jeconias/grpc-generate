#!/usr/bin/env node

const grpcGenerate = require('../lib');
const genCommand = require('../lib/commands/gen');
const onlyProtoCommand = require('../lib/commands/only-proto');

const program = grpcGenerate().program;

genCommand(program);
onlyProtoCommand(program);

program.parse(process.argv);
