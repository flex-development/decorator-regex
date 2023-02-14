# decorator-regex

[![npm](https://img.shields.io/npm/v/@flex-development/decorator-regex.svg)](https://npmjs.com/package/@flex-development/decorator-regex)
[![codecov](https://codecov.io/github/flex-development/decorator-regex/branch/main/graph/badge.svg?token=NO3rVfx9OF)](https://codecov.io/github/flex-development/decorator-regex)
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
  - [`DECORATOR_REGEX`](#decorator-regex)
- [Types](#types)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package exports a regular expression for matching [decorators][1]. Decorators are functions called on classes,
class accessors, class fields, class methods, and/or class method parameters.

## When should I use this?

The regular expression exported from this package can be used to match multi and single-line decorators in JavaScript
and TypeScript source code.

Note:

- Decorators in comments (`/** */`, `/* */`, `//`) are ignored
- Regular expression is ECMAScript-compatible. It has **not** been tested with other flavors (PCRE, PCRE2, etc)

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

This package exports the identifier [`DECORATOR_REGEX`](#decorator-regex).

There is no default export.

### `DECORATOR_REGEX`

Regular expression matching multi and single-line decorators.

Ignores matches in comments.

Required [flags][3]:

- `s`: dot all
- `u`: unicode

> **Source**: [`src/decorator-regex.ts`](src/decorator-regex.ts)

## Types

This package is fully typed with [TypeScript][4].

## Related

- [`export-regex`][5] &mdash; `export` statement regex
- [`import-regex`][6] &mdash; `import` statement regex

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://github.com/tc39/proposal-decorators
[2]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[3]: https://codeguage.com/courses/regexp/flags
[4]: https://www.typescriptlang.org
[5]: https://github.com/flex-development/export-regex
[6]: https://github.com/flex-development/import-regex
