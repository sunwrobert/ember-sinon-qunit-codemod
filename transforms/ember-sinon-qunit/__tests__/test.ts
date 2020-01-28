import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

defineTest(__dirname, 'transform', {}, 'sample-test-with-create-sandbox');
defineTest(__dirname, 'transform', {}, 'sample-test-with-sinon-sinoff');
defineTest(__dirname, 'transform', {}, 'sample-test-without-create-sandbox');
defineTest(__dirname, 'transform', {}, 'test-helper-without-sandbox');
defineTest(__dirname, 'transform', {}, 'test-helper-with-sandbox');
defineTest(__dirname, 'transform', {}, 'sample-test-util');
defineTest(__dirname, 'transform', {}, 'sample-test-with-old-sinon-qunit');
defineTest(__dirname, 'transform', {}, 'sample-test-with-setup-sinon-sandbox');
