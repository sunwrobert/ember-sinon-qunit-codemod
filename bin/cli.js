#!/usr/bin/env node
require('codemod-cli').runTransform(
  __dirname,
  'ember-sinon-qunit' /* transform name */,
  process.argv.slice(2) /* paths or globs */
);
