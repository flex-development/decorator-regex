# decorator-regex

[![github release](https://img.shields.io/github/v/release/flex-development/decorator-regex.svg?include_prereleases&sort=semver)](https://github.com/flex-development/decorator-regex/releases/latest)
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

Suppose we have the following module:

```typescript
import { DECORATOR_REGEX } from '@flex-development/decorator-regex'
import { omit } from 'radash'
import { dedent } from 'ts-dedent'

const code: string = dedent`
  /**
    * [Data access object][1] for the {@linkcode DatabaseTable.USERS} table.
    *
    * [1]: https://en.wikipedia.org/wiki/Data_access_object
    *
    * @extends {Entity<IUserRaw,CreateUserDTO,IUser>}
    * @implements {IUser}
    */
   @Table<User>({
     defaultScope: {
       attributes: ['created_at', 'email', 'id', 'provider'],
       order: [['id', OrderDirection.ASC]],
       raw: false
     },
     deletedAt: false,
     hooks: {
       /**
        * Normalizes data before a user is persisted to the database.
        *
        * This includes:
        *
        * - Trimming and lowercasing string fields
        *
        * @param {User} instance - Current user instance
        * @return {void} Nothing when complete
        */
       beforeSave(instance: User): void {
         trimmedLowercasedFields(instance.dataValues)
       }
     },
     omitNull: false,
     paranoid: false,
     tableName: DatabaseTable.USERS,
     timestamps: true
   })
     class User
       extends Entity<IUserRaw, CreateUserDTO, IUser> implements IUser {
       @ApiProperty({ description: 'When user was created', type: Number })
       @Column({
         allowNull: false,
         defaultValue: User.CURRENT_TIMESTAMP,
         type: DataType.BIGINT,
         validate: { isUnixTimestamp: User.isUnixTimestamp }
       })
       declare created_at: IUser['created_at']

       @ApiProperty({
         description: 'Email address',
         maxLength: 254,
         minLength: 3,
         type: String
       })
       @Column({
         allowNull: false,
         type: DataType.STRING(254),
         unique: true,
         validate: { isEmail: true, len: [3, 254] }
       })
       declare email: IUser['email']

       @ApiProperty({ description: 'Unique identifier', type: Number })
       @Column({
         allowNull: false,
         autoIncrementIdentity: true,
         defaultValue: Sequelize.fn('nextval', DatabaseSequence.USERS),
         primaryKey: true,
         type: 'NUMERIC',
         unique: true,
         validate: { notNull: true }
       })
       declare id: IUser['id']

       @ApiProperty({
         description: 'Authentication provider',
         enum: OAuthProvider,
         enumName: 'OAuthProvider',
         nullable: true
       })
       @Column({
         allowNull: true,
         defaultValue: null,
         type: DataType.ENUM(...User.AUTH_PROVIDERS)
       })
       declare provider: IUser['provider']

       @HasMany(() => Token)
       declare tokens: Token[]
     }
`

const print = (matches: IterableIterator<RegExpMatchArray>): void => {
  console.debug([...matches].map(match => omit(match, ['input'])))
}

print(code.matchAll(DECORATOR_REGEX))
```

...running that yields:

```sh
[
  {
    '0': '@Table<User>({\n' +
      '   defaultScope: {\n' +
      "     attributes: ['created_at', 'email', 'id', 'provider'],\n" +
      "     order: [['id', OrderDirection.ASC]],\n" +
      '     raw: false\n' +
      '   },\n' +
      '   deletedAt: false,\n' +
      '   hooks: {\n' +
      '     /**\n' +
      '      * Normalizes data before a user is persisted to the database.\n' +
      '      *\n' +
      '      * This includes:\n' +
      '      *\n' +
      '      * - Trimming and lowercasing string fields\n' +
      '      *\n' +
      '      * @param {User} instance - Current user instance\n' +
      '      * @return {void} Nothing when complete\n' +
      '      */\n' +
      '     beforeSave(instance: User): void {\n' +
      '       trimmedLowercasedFields(instance.dataValues)\n' +
      '     }\n' +
      '   },\n' +
      '   omitNull: false,\n' +
      '   paranoid: false,\n' +
      '   tableName: DatabaseTable.USERS,\n' +
      '   timestamps: true\n' +
      ' })',
    '1': 'Table',
    '2': '({\n' +
      '   defaultScope: {\n' +
      "     attributes: ['created_at', 'email', 'id', 'provider'],\n" +
      "     order: [['id', OrderDirection.ASC]],\n" +
      '     raw: false\n' +
      '   },\n' +
      '   deletedAt: false,\n' +
      '   hooks: {\n' +
      '     /**\n' +
      '      * Normalizes data before a user is persisted to the database.\n' +
      '      *\n' +
      '      * This includes:\n' +
      '      *\n' +
      '      * - Trimming and lowercasing string fields\n' +
      '      *\n' +
      '      * @param {User} instance - Current user instance\n' +
      '      * @return {void} Nothing when complete\n' +
      '      */\n' +
      '     beforeSave(instance: User): void {\n' +
      '       trimmedLowercasedFields(instance.dataValues)\n' +
      '     }\n' +
      '   },\n' +
      '   omitNull: false,\n' +
      '   paranoid: false,\n' +
      '   tableName: DatabaseTable.USERS,\n' +
      '   timestamps: true\n' +
      ' })',
    index: 227,
    groups: [Object: null prototype] {
      identifier: 'Table',
      parameters: '({\n' +
        '   defaultScope: {\n' +
        "     attributes: ['created_at', 'email', 'id', 'provider'],\n" +
        "     order: [['id', OrderDirection.ASC]],\n" +
        '     raw: false\n' +
        '   },\n' +
        '   deletedAt: false,\n' +
        '   hooks: {\n' +
        '     /**\n' +
        '      * Normalizes data before a user is persisted to the database.\n' +
        '      *\n' +
        '      * This includes:\n' +
        '      *\n' +
        '      * - Trimming and lowercasing string fields\n' +
        '      *\n' +
        '      * @param {User} instance - Current user instance\n' +
        '      * @return {void} Nothing when complete\n' +
        '      */\n' +
        '     beforeSave(instance: User): void {\n' +
        '       trimmedLowercasedFields(instance.dataValues)\n' +
        '     }\n' +
        '   },\n' +
        '   omitNull: false,\n' +
        '   paranoid: false,\n' +
        '   tableName: DatabaseTable.USERS,\n' +
        '   timestamps: true\n' +
        ' })'
    }
  },
  {
    '0': "@ApiProperty({ description: 'When user was created', type: Number })",
    '1': 'ApiProperty',
    '2': "({ description: 'When user was created', type: Number })",
    index: 994,
    groups: [Object: null prototype] {
      identifier: 'ApiProperty',
      parameters: "({ description: 'When user was created', type: Number })"
    }
  },
  {
    '0': '@Column({\n' +
      '       allowNull: false,\n' +
      '       defaultValue: User.CURRENT_TIMESTAMP,\n' +
      '       type: DataType.BIGINT,\n' +
      '       validate: { isUnixTimestamp: User.isUnixTimestamp }\n' +
      '     })',
    '1': 'Column',
    '2': '({\n' +
      '       allowNull: false,\n' +
      '       defaultValue: User.CURRENT_TIMESTAMP,\n' +
      '       type: DataType.BIGINT,\n' +
      '       validate: { isUnixTimestamp: User.isUnixTimestamp }\n' +
      '     })',
    index: 1068,
    groups: [Object: null prototype] {
      identifier: 'Column',
      parameters: '({\n' +
        '       allowNull: false,\n' +
        '       defaultValue: User.CURRENT_TIMESTAMP,\n' +
        '       type: DataType.BIGINT,\n' +
        '       validate: { isUnixTimestamp: User.isUnixTimestamp }\n' +
        '     })'
    }
  },
  {
    '0': '@ApiProperty({\n' +
      "       description: 'Email address',\n" +
      '       maxLength: 254,\n' +
      '       minLength: 3,\n' +
      '       type: String\n' +
      '     })',
    '1': 'ApiProperty',
    '2': '({\n' +
      "       description: 'Email address',\n" +
      '       maxLength: 254,\n' +
      '       minLength: 3,\n' +
      '       type: String\n' +
      '     })',
    index: 1296,
    groups: [Object: null prototype] {
      identifier: 'ApiProperty',
      parameters: '({\n' +
        "       description: 'Email address',\n" +
        '       maxLength: 254,\n' +
        '       minLength: 3,\n' +
        '       type: String\n' +
        '     })'
    }
  },
  {
    '0': '@Column({\n' +
      '       allowNull: false,\n' +
      '       type: DataType.STRING(254),\n' +
      '       unique: true,\n' +
      '       validate: { isEmail: true, len: [3, 254] }\n' +
      '     })',
    '1': 'Column',
    '2': '({\n' +
      '       allowNull: false,\n' +
      '       type: DataType.STRING(254),\n' +
      '       unique: true,\n' +
      '       validate: { isEmail: true, len: [3, 254] }\n' +
      '     })',
    index: 1425,
    groups: [Object: null prototype] {
      identifier: 'Column',
      parameters: '({\n' +
        '       allowNull: false,\n' +
        '       type: DataType.STRING(254),\n' +
        '       unique: true,\n' +
        '       validate: { isEmail: true, len: [3, 254] }\n' +
        '     })'
    }
  },
  {
    '0': "@ApiProperty({ description: 'Unique identifier', type: Number })",
    '1': 'ApiProperty',
    '2': "({ description: 'Unique identifier', type: Number })",
    index: 1615,
    groups: [Object: null prototype] {
      identifier: 'ApiProperty',
      parameters: "({ description: 'Unique identifier', type: Number })"
    }
  },
  {
    '0': '@Column({\n' +
      '       allowNull: false,\n' +
      '       autoIncrementIdentity: true,\n' +
      "       defaultValue: Sequelize.fn('nextval', DatabaseSequence.USERS),\n" +
      '       primaryKey: true,\n' +
      "       type: 'NUMERIC',\n" +
      '       unique: true,\n' +
      '       validate: { notNull: true }\n' +
      '     })',
    '1': 'Column',
    '2': '({\n' +
      '       allowNull: false,\n' +
      '       autoIncrementIdentity: true,\n' +
      "       defaultValue: Sequelize.fn('nextval', DatabaseSequence.USERS),\n" +
      '       primaryKey: true,\n' +
      "       type: 'NUMERIC',\n" +
      '       unique: true,\n' +
      '       validate: { notNull: true }\n' +
      '     })',
    index: 1685,
    groups: [Object: null prototype] {
      identifier: 'Column',
      parameters: '({\n' +
        '       allowNull: false,\n' +
        '       autoIncrementIdentity: true,\n' +
        "       defaultValue: Sequelize.fn('nextval', DatabaseSequence.USERS),\n" +
        '       primaryKey: true,\n' +
        "       type: 'NUMERIC',\n" +
        '       unique: true,\n' +
        '       validate: { notNull: true }\n' +
        '     })'
    }
  },
  {
    '0': '@ApiProperty({\n' +
      "       description: 'Authentication provider',\n" +
      '       enum: OAuthProvider,\n' +
      "       enumName: 'OAuthProvider',\n" +
      '       nullable: true\n' +
      '     })',
    '1': 'ApiProperty',
    '2': '({\n' +
      "       description: 'Authentication provider',\n" +
      '       enum: OAuthProvider,\n' +
      "       enumName: 'OAuthProvider',\n" +
      '       nullable: true\n' +
      '     })',
    index: 1974,
    groups: [Object: null prototype] {
      identifier: 'ApiProperty',
      parameters: '({\n' +
        "       description: 'Authentication provider',\n" +
        '       enum: OAuthProvider,\n' +
        "       enumName: 'OAuthProvider',\n" +
        '       nullable: true\n' +
        '     })'
    }
  },
  {
    '0': '@Column({\n' +
      '       allowNull: true,\n' +
      '       defaultValue: null,\n' +
      '       type: DataType.ENUM(...User.AUTH_PROVIDERS)\n' +
      '     })',
    '1': 'Column',
    '2': '({\n' +
      '       allowNull: true,\n' +
      '       defaultValue: null,\n' +
      '       type: DataType.ENUM(...User.AUTH_PROVIDERS)\n' +
      '     })',
    index: 2133,
    groups: [Object: null prototype] {
      identifier: 'Column',
      parameters: '({\n' +
        '       allowNull: true,\n' +
        '       defaultValue: null,\n' +
        '       type: DataType.ENUM(...User.AUTH_PROVIDERS)\n' +
        '     })'
    }
  },
  {
    '0': '@HasMany(() => Token)',
    '1': 'HasMany',
    '2': '(() => Token)',
    index: 2300,
    groups: [Object: null prototype] {
      identifier: 'HasMany',
      parameters: '(() => Token)'
    }
  }
]
```

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

- [`decorator-regex`][5] &mdash; `export` statement regex
- [`import-regex`][6] &mdash; `import` statement regex

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://github.com/tc39/proposal-decorators
[2]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[3]: https://codeguage.com/courses/regexp/flags
[4]: https://www.typescriptlang.org
[5]: https://github.com/flex-development/decorator-regex
[6]: https://github.com/flex-development/import-regex
