import sinon from 'sinon';
function setupUnhandledRejections(hooks) {
  hooks.beforeEach(function() {
    sinon.stub({}, 'onUnhandledRejection');
  });
}
