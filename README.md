# decorator-regex

[![npm](https://img.shields.io/npm/v/@flex-development/decorator-regex.svg)](https://npmjs.com/package/@flex-development/decorator-regex)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/decorator-regex.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

[Decorator][1] regex

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
- [Types](#types)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package contains regular expressions for matching [decorators][1]. Decorators are functions called on classes,
class elements, or other JavaScript and TypeScript syntax forms during definition.

## When should I use this?

Regex expressions exported from this package can be used to match decorators in JavaScript and TypeScript source code.

Note:

- Statements in docblock (`/** */`), multiline (`/* */`), and single-line (`//`) comments are ignored
- Expressions are ECMAScript-compatible. They have not been tested with other flavors (PCRE, PCRE2, etc)

## Install

This package is [ESM only][2].

```sh
yarn add @flex-development/decorator-regex
```

From Git:

```sh
yarn add @flex-development/decorator-regex@flex-development/decorator-regex
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/features/protocols#git'>Git - Protocols | Yarn</a>
    &nbsp;for details on requesting a specific branch, commit, or tag.
  </small>
</blockquote>

## Use

**TODO**: usage example.

## API

**TODO**: api documentation.

## Types

This package is fully typed with [TypeScript][3].

## Related

- [`export-regex`][4] &mdash; `export` statement regex
- [`import-regex`][5] &mdash; `import` statement regex

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://github.com/tc39/proposal-decorators
[2]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[3]: https://www.typescriptlang.org
[4]: https://github.com/flex-development/export-regex
[5]: https://github.com/flex-development/import-regex
