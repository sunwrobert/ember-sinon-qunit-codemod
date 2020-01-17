function setupUnhandledRejections(hooks) {
  hooks.beforeEach(function() {
    this.sandbox.stub({}, 'onUnhandledRejection');
  });
}
