import sinon from 'sinon';
import { module } from 'qunit';

module('Dummy test', hooks => {
  let sandbox;

  hooks.beforeEach(() => {
    const test = {};
    sandbox = sinon.createSandbox();
    sandbox.stub(test, 'foo');
  });

  hooks.afterEach(() => {
    sinon.restore();
  });

  hooks.afterEach(() => {
    const foo = 'bar';
    sinon.restore();
  });
});
