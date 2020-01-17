import { setApplication } from '@ember/test-helpers';
import { setupA11yAudit } from 'ember-ts-test-support';
import start from 'ember-exam/test-support/start';
import setupSinonSandbox from 'ember-sinon-sandbox/test-support/setup-global-sinon-sandbox';

setupSinonSandbox();

setApplication();

setupA11yAudit();

start({ setupTestIsolationValidation: true });
