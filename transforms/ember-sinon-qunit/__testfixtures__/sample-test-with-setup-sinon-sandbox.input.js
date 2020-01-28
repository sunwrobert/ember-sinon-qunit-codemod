import { setupApplicationTest } from 'ember-qunit';
import { setupSinonSandbox } from 'ember-sinon-sandbox/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

export default function setupAcceptanceTest(hooks) {
  setupApplicationTest(hooks);
  setupSinonSandbox(hooks);
  setupMirage(hooks);
}
