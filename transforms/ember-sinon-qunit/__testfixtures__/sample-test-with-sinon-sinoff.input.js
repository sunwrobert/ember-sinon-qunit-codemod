import { module } from 'qunit';
import { setupSinonSinoff } from 'ember-sinon-sinoff/test-support';

module('Dummy test', hooks => {
  setupSinonSinoff(hooks);

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
