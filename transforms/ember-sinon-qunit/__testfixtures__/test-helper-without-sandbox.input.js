import { setApplication } from '@ember/test-helpers';
import { setupA11yAudit } from 'ember-ts-test-support';
import start from 'ember-exam/test-support/start';
import QUnit from 'qunit';
import sinon from 'sinon';

setApplication();

QUnit.testDone(() => {
  sinon.restore();
});

setupA11yAudit();

start({ setupTestIsolationValidation: true });
