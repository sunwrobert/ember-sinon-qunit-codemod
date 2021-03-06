import { Transform } from 'jscodeshift';

const transform: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const removeDeprecatedImports = () => {
    root
      .find(
        j.ImportDeclaration,
        p =>
          p.source.value ===
            'ember-sinon-sandbox/test-support/setup-global-sinon-sandbox' ||
          p.source.value === 'ember-sinon-sinoff/test-support' ||
          p.source.value === 'ember-sinon-sandbox/test-support'
      )
      .remove();
  };

  const convertTestMethod = () => {
    root
      .find(j.ImportDeclaration, {
        source: { value: 'ember-sinon-qunit/test-support/test' }
      })
      .replaceWith(p =>
        j.importDeclaration(
          [j.importSpecifier(j.identifier('test'), j.identifier('test'))],
          j.literal('qunit')
        )
      );
  };

  const removeCreateSandbox = () => {
    root
      .find(j.AssignmentExpression, {
        right: {
          callee: {
            object: { name: 'sinon' },
            property: { name: 'createSandbox' }
          }
        }
      })
      .remove();
  };

  const removeSetupSinonSandbox = () => {
    root
      .find(j.CallExpression, { callee: { name: 'setupSinonSandbox' } })
      .remove();
  };

  const removeSinonSinoff = () => {
    root
      .find(j.CallExpression, {
        callee: {
          name: 'setupSinonSinoff'
        }
      })
      .remove();
  };

  const setupSinonTestHelper = () => {
    const isTestHelper = !!root.find(
      j.ImportDeclaration,
      p =>
        (p.source.value === 'ember-qunit' ||
          p.source.value === 'ember-exam/test-support/start') &&
        p.specifiers.find(specifier => specifier.local.name === 'start')
    ).length;

    // If we're in the test helper and we dont already have setupSinon
    if (
      isTestHelper &&
      !root.find(j.ImportDeclaration, p =>
        p.specifiers.find(specifier => specifier.local.name === 'setupSinon')
      ).length
    ) {
      root
        .find(j.ImportDeclaration)
        .at(-1)
        .get()
        .insertAfter(
          j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier('setupSinon'))],
            j.literal('ember-sinon-qunit')
          )
        );

      const setupSinonSandbox = root.find(j.Identifier, {
        name: 'setupSinonSandbox'
      });

      if (setupSinonSandbox.length) {
        setupSinonSandbox.replaceWith(() => j.identifier('setupSinon'));
      } else {
        root
          .find(j.ImportDeclaration)
          .at(-1)
          .get()
          .insertAfter(
            j.expressionStatement(
              j.callExpression(j.identifier('setupSinon'), [])
            )
          );
      }
    }
  };

  const convertSandboxToSinon = () => {
    root.findVariableDeclarators('sandbox').remove();

    const thisSandboxNodes = root.find(j.MemberExpression, {
      object: { type: 'ThisExpression' },
      property: { name: 'sandbox' }
    });

    const sandboxRefNodes = root.find(j.Identifier, { name: 'sandbox' });

    // If we're using sandboxes and we don't already have a sinon import, import it.
    if (
      (thisSandboxNodes.length > 0 || sandboxRefNodes.length > 0) &&
      !root.find(j.ImportDefaultSpecifier, { local: { name: 'sinon' } }).length
    ) {
      const existingImports = root.find(j.ImportDeclaration);
      const sinonImport = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('sinon'))],
        j.literal('sinon')
      );

      if (existingImports.length) {
        existingImports
          .at(-1)
          .get()
          .insertAfter(sinonImport);
      } else {
        root.get().node.program.body.unshift(sinonImport);
      }
    }

    thisSandboxNodes.replaceWith(j.identifier('sinon'));
    sandboxRefNodes.replaceWith(j.identifier('sinon'));
  };

  const removeSinonRestore = () => {
    const sinonCalls = root.find(j.CallExpression, {
      callee: { object: { name: 'sinon' }, property: { name: 'restore' } }
    });

    const wrappingCall = sinonCalls.closest(j.CallExpression);

    sinonCalls.remove();

    // Remove the wrapping call if first argument is a function with no body
    wrappingCall
      .filter(p => {
        const firstArg = p.value.arguments[0];
        return (
          (firstArg.type === 'FunctionExpression' ||
            firstArg.type === 'ArrowFunctionExpression') &&
          firstArg.body.type === 'BlockStatement' &&
          firstArg.body.body.length === 0
        );
      })
      .remove();
  };

  removeDeprecatedImports();
  removeCreateSandbox();
  removeSetupSinonSandbox();
  removeSinonSinoff();
  convertTestMethod();
  setupSinonTestHelper();
  convertSandboxToSinon();
  removeSinonRestore();

  return root.toSource({ quote: 'single' });
};

export default transform;
