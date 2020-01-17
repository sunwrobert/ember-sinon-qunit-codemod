import { module } from 'qunit';

module('Dummy test', hooks => {
  hooks.beforeEach(() => {
    const test = {};
    this.stub = this.sandbox.stub();
    this.sandbox.stub(test, 'foo');
  });

  hooks.afterEach(() => {
    this.sandbox.restore();
  });

  hooks.afterEach(() => {
    const foo = 'bar';
    this.sandbox.restore();
  });
});
