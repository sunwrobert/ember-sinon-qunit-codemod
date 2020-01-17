import { module } from 'qunit';
import sinon from 'sinon';

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
