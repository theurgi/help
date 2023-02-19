# help

Generate formatted help text for Node.js CLIs.

This simple package doesn't attempt to parse arguments as a more comprehensive CLI framework might.
Instead, it aims to be an unopinionated primitive that can be used as a stand-alone utility or as a
building block within a more comprehensive CLI framework.

## Features

- A simple and intuitive functional API
- Flexibility: Makes no assumptions about your CLI's argument scheme
- Dynamic line wrapping based on terminal width
- Extensible built-in functions
- Full TypeScript type support

## Install

```sh
pnpm install @theurgi/help
```

## Usage

### Extended examples

- [Colorize with chalk](./examples/with_chalk/README.md)
- [Extending built-in functions](./examples/extending_built-ins/README.md)

### Basic example

```js
import { help, heading, paragraph, space, table } from '@theurgi/help'

console.log(
  help({
    display: [
      paragraph('My awesome CLI'),
      space(),
      heading('Usage'),
      paragraph('$ cli <command> [options]', { indentLevel: 1 }),
      space(),
      heading('Commands'),
      table([
        ['create', 'Create something'],
        ['update', 'Update something'],
      ]),
      space(),
      heading('Options'),
      table([
        ['-h, --help', 'Show help'],
        ['-v, --version', 'Show version'],
      ]),
    ],
  })
)
```

## API

### Exports

#### Functions

- [help](README.md#help)
- [heading](README.md#heading)
- [paragraph](README.md#paragraph)
- [space](README.md#space)
- [table](README.md#table)

#### Types

- [Generator](README.md#generator)
- [HeadingOptions](README.md#headingoptions)
- [HelpConfig](README.md#helpconfig)
- [HelpOptions](README.md#helpoptions)
- [IndentLevel](README.md#indentlevel)
- [IndentSpaces](README.md#indentspaces)
- [ParagraphOptions](README.md#paragraphoptions)
- [RenderFunction](README.md#renderfunction)
- [TableOptions](README.md#tableoptions)

### Functions

#### help

▸ **help**(`helpConfig`): `string`

Generate formatted help text for Node.js CLIs.

##### Parameters

| Name         | Type                                 | Description             |
| :----------- | :----------------------------------- | :---------------------- |
| `helpConfig` | [`HelpConfig`](README.md#helpconfig) | The help configuration. |

##### Returns

`string`

---

#### heading

▸ **heading**(`text`, `options?`): [`RenderFunction`](README.md#renderfunction)

Generate a heading.

##### Parameters

| Name       | Type                                                   | Description          |
| :--------- | :----------------------------------------------------- | :------------------- |
| `text`     | `string`                                               | The heading text.    |
| `options?` | `Partial`<[HeadingOptions](README.md#headingoptions)\> | The heading options. |

##### Returns

[`RenderFunction`](README.md#renderfunction)

---

#### paragraph

▸ **paragraph**(`text`, `options?`): [`RenderFunction`](README.md#renderfunction)

Generate a paragraph.

##### Parameters

| Name       | Type                                                       | Description            |
| :--------- | :--------------------------------------------------------- | :--------------------- |
| `text`     | `string`                                                   | The paragraph text.    |
| `options?` | `Partial`<[ParagraphOptions](README.md#paragraphoptions)\> | The paragraph options. |

##### Returns

[`RenderFunction`](README.md#renderfunction)

---

#### space

▸ **space**(`newlines?`): [`RenderFunction`](README.md#renderfunction)

Generate blank newlines.

##### Parameters

| Name        | Type     | Description                       | Default |
| :---------- | :------- | :-------------------------------- | :-----: |
| `newlines?` | `number` | The number of newlines to render. |    1    |

##### Returns

[`RenderFunction`](README.md#renderfunction)

---

#### table

▸ **table**(`data`, `options?`): [`RenderFunction`](README.md#renderfunction)

Generate a 2 column table.

##### Parameters

| Name       | Type                                               | Description                                                                                                                                    |
| :--------- | :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | `[string, string][]`                               | An array of string tuples where `data[n][0]` is typically a CLI command or option and `data[n][1]` is typically a description of `data[n][0]`. |
| `options?` | `Partial`<[TableOptions](README.md#tableoptions)\> | The table options.                                                                                                                             |

##### Returns

[`RenderFunction`](README.md#renderfunction)

### Type Aliases

#### Generator

Ƭ **Generator**<`T`\>: (...`parameters`: `Parameters`<`T`\>) => [`RenderFunction`](README.md#renderfunction)

> ⚠️ **NOTE:** A `Generator` in the context of this package has no relation to, and should not be confused with, [JavaScript Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

A `Generator` is a function that is called inside the [`HelpConfig.display`](README.md#helpconfig) array
of the main [`help`](README.md#help) function and returns a [`RenderFunction`](README.md#renderfunction).

##### Built-in Generators

- [`heading`](README.md#heading)
- [`paragraph`](README.md#paragraph)
- [`space`](README.md#space)
- [`table`](README.md#table)

##### Type parameters

| Name | Type                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| `T`  | extends (...`parameters`: `any`) => [`RenderFunction`](README.md#renderfunction) |

##### Type declaration

▸ (`...parameters`): [`RenderFunction`](README.md#renderfunction)

##### Parameters

| Name            | Type               |
| :-------------- | :----------------- |
| `...parameters` | `Parameters`<`T`\> |

##### Returns

[`RenderFunction`](README.md#renderfunction)

---

#### HeadingOptions

Ƭ **HeadingOptions**: `Object`

##### Type declaration

| Name          | Type                                   | Description                               | Default |
| :------------ | :------------------------------------- | :---------------------------------------- | :-----: |
| `indentLevel` | [`IndentLevel`](README.md#indentlevel) | The level of indentation for the heading. |    0    |

---

#### HelpConfig

Ƭ **HelpConfig**: `Object`

##### Type declaration

| Name       | Type                                               | Description                                                                                                 |
| :--------- | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `display`  | [`RenderFunction`](README.md#renderfunction)[]     | An array in which to call [`Generator`](README.md#generator) functions to render portions of the help text. |
| `options?` | `Partial`<[`HelpOptions`](README.md#helpoptions)\> | Global options for the help text.                                                                           |

---

#### HelpOptions

Ƭ **HelpOptions**: `Object`

##### Type declaration

| Name           | Type                                     | Description                                           |       Default       |
| :------------- | :--------------------------------------- | :---------------------------------------------------- | :-----------------: |
| `indentSpaces` | [`IndentSpaces`](README.md#indentspaces) | The number of spaces used for each indentation level. |          2          |
| `maxWidth`     | `number`                                 | The maximum width of the help text in characters.     | The terminal width. |

---

#### IndentLevel

Ƭ **IndentLevel**: `number`

The number of times to left pad a string with [`IndentSpaces`](README.md#indentspaces) spaces.

---

#### IndentSpaces

Ƭ **IndentSpaces**: `number`

The number of spaces per [`IndentLevel`](README.md#indentlevel).

---

#### ParagraphOptions

Ƭ **ParagraphOptions**: `Object`

##### Type declaration

| Name          | Type                                   | Description                                 | Default |
| :------------ | :------------------------------------- | :------------------------------------------ | :-----: |
| `indentLevel` | [`IndentLevel`](README.md#indentlevel) | The level of indentation for the paragraph. |    0    |

---

#### RenderFunction

Ƭ **RenderFunction**: (`helpOptions`: [`HelpOptions`](README.md#helpoptions)) => `string`

##### Type declaration

▸ (`helpOptions`): `string`

The type of function that must be returned by a [`Generator`](README.md#generator). This function will be called with
global [`HelpOptions`](README.md#helpoptions) by the main [`help`](README.md#help) function to render a formatted string.

##### Parameters

| Name          | Type                                   |
| :------------ | :------------------------------------- |
| `helpOptions` | [`HelpOptions`](README.md#helpoptions) |

##### Returns

`string`

---

#### TableOptions

Ƭ **TableOptions**: `Object`

##### Type declaration

| Name          | Type                                   | Description                             | Default |
| :------------ | :------------------------------------- | :-------------------------------------- | :-----: |
| `columnGap`   | `number`                               | The number of spaces between columns.   |    2    |
| `indentLevel` | [`IndentLevel`](README.md#indentlevel) | The level of indentation for the table. |    1    |
