import { setApplication } from '@ember/test-helpers';
import { setupA11yAudit } from 'ember-ts-test-support';
import start from 'ember-exam/test-support/start';
import setupSinon from 'ember-sinon-qunit';

setupSinon();

setApplication();

setupA11yAudit();

start({ setupTestIsolationValidation: true });
