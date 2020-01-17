import { module } from 'qunit';
import { test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | foo', function(hooks) {
  setupTest(hooks);

  test('fooTransition action transitions to bar route', function(assert) {
    let route = this.owner.lookup('route:foo');
    const stub = this.stub(route, 'transitionTo');

    route.send('fooTransition');

    assert.ok(stub.calledOnce, 'transitionTo was called once');
    assert.ok(stub.calledWithExactly('bar'), 'bar was passed to transitionTo');
  });
});
