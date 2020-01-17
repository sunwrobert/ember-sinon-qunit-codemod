import sinon from 'sinon';
import { module } from 'qunit';

module('Dummy test', hooks => {
  hooks.beforeEach(() => {
    const test = {};
    this.sandbox = sinon.createSandbox();
    this.stub = this.sandbox.stub();
    this.sandbox.stub(test, 'foo');
  });

  hooks.afterEach(() => {
    sinon.restore();
  });

  hooks.afterEach(() => {
    const foo = 'bar';
    sinon.restore();
  });
});
