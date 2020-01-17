# ember-sinon-qunit-codemod

A [jscodeshift](https://github.com/facebook/jscodeshift) based codemod to help migrate to [ember-sinon-qunit](https://github.com/elwayman02/ember-sinon-qunit) V4.

This codemod converts usages of `this.sandbox` to `sinon`, and removes usages of `ember-sinon-sandbox` and `ember-sinon-sinoff`. Lastly, it will remove usages of `sinon.restore` as it is not needed in V4.

## Usage

**WARNING**: `jscodeshift`, and thus this codemod, **edits your files in place**.
It does not make a copy. Make sure your code is checked into a source control
repository like Git and that you have no outstanding changes to commit before
running this tool.

```bash
cd my-ember-app-or-addon
npx ember-sinon-qunit-codemod tests
```

Make sure to remove any deprecated libraries, such as `ember-sinon-sandbox` or `ember-sinon-sinoff` and then use the latest `ember-sinon-qunit`

```bash
npm i -D ember-sinon-qunit
```

## Gotchas

Keep in mind that this codemod may end up leaving unwanted whitespace when importing sinon. This can be autofixed with a proper eslint rule.