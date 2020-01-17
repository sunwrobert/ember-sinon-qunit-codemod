import sinon from 'sinon';
import { module } from 'qunit';

module('Dummy test', hooks => {
  hooks.beforeEach(() => {
    const test = {};
    this.stub = sinon.stub();
    sinon.stub(test, 'foo');
  });

  hooks.afterEach(() => {
    const foo = 'bar';
  });
});
