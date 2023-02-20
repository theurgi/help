<br>

<p align="center">
	<img src="./help.png" width="300">
</p>

<p align="center">
Generate formatted help text for Node.js CLIs.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@theurgi/help"><img src="https://img.shields.io/npm/v/@theurgi/help?color=5E81AC&label=semantic-release"></a>
<p>

<br>

`help` doesn't attempt to parse arguments as some more comprehensive CLI frameworks do.
Instead, it aims to be an unopinionated primitive that can be used as a stand-alone utility or as a
building block within a more comprehensive CLI framework

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

- [Coloring with chalk](https://github.com/theurgi/help/tree/main/examples/with-chalk)
- [Extending built-in functions](https://github.com/theurgi/help/tree/main/examples/extending-built-ins)
- [Cloning Astro's help text](https://github.com/theurgi/help/tree/main/examples/astro-clone)

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

- [help](#help)
- [heading](#heading)
- [paragraph](#paragraph)
- [space](#space)
- [table](#table)

#### Types

- [Generator](#generator)
- [HeadingOptions](#headingoptions)
- [HelpConfig](#helpconfig)
- [HelpOptions](#helpoptions)
- [IndentLevel](#indentlevel)
- [IndentSpaces](#indentspaces)
- [ParagraphOptions](#paragraphoptions)
- [RenderFunction](#renderfunction)
- [TableAlignment](#tablealignment)
- [TableOptions](#tableoptions)

### Functions

#### help

▸ **help**(`helpConfig`): `string`

Generate formatted help text for Node.js CLIs.

##### Parameters

| Name         | Type                        | Description             |
| :----------- | :-------------------------- | :---------------------- |
| `helpConfig` | [`HelpConfig`](#helpconfig) | The help configuration. |

##### Returns

`string`

---

#### heading

▸ **heading**(`text`, `options?`): [`RenderFunction`](#renderfunction)

Generate a heading.

##### Parameters

| Name       | Type                                          | Description          |
| :--------- | :-------------------------------------------- | :------------------- |
| `text`     | `string`                                      | The heading text.    |
| `options?` | `Partial`<[HeadingOptions](#headingoptions)\> | The heading options. |

##### Returns

[`RenderFunction`](#renderfunction)

---

#### paragraph

▸ **paragraph**(`text`, `options?`): [`RenderFunction`](#renderfunction)

Generate a paragraph.

##### Parameters

| Name       | Type                                              | Description            |
| :--------- | :------------------------------------------------ | :--------------------- |
| `text`     | `string`                                          | The paragraph text.    |
| `options?` | `Partial`<[ParagraphOptions](#paragraphoptions)\> | The paragraph options. |

##### Returns

[`RenderFunction`](#renderfunction)

---

#### space

▸ **space**(`newlines?`): [`RenderFunction`](#renderfunction)

Generate blank newlines.

##### Parameters

| Name        | Type     | Description                       | Default |
| :---------- | :------- | :-------------------------------- | :-----: |
| `newlines?` | `number` | The number of newlines to render. |    1    |

##### Returns

[`RenderFunction`](#renderfunction)

---

#### table

▸ **table**(`data`, `options?`): [`RenderFunction`](#renderfunction)

Generate a 2 column table.

##### Parameters

| Name       | Type                                      | Description                                                                                                                                    |
| :--------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | `[string, string][]`                      | An array of string tuples where `data[n][0]` is typically a CLI command or option and `data[n][1]` is typically a description of `data[n][0]`. |
| `options?` | `Partial`<[TableOptions](#tableoptions)\> | The table options.                                                                                                                             |

##### Returns

[`RenderFunction`](#renderfunction)

### Type Aliases

#### Generator

Ƭ **Generator**<`T`\>: (...`parameters`: `Parameters`<`T`\>) => [`RenderFunction`](#renderfunction)

> **NOTE:** A `Generator` in the context of `help` has no relation to [JavaScript Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

A `Generator` is a function that is called inside the [`HelpConfig.display`](#helpconfig) array
of the main [`help`](#help) function and returns a [`RenderFunction`](#renderfunction).

##### Built-in Generators

- [`heading`](#heading)
- [`paragraph`](#paragraph)
- [`space`](#space)
- [`table`](#table)

##### Type parameters

| Name | Type                                                                    |
| :--- | :---------------------------------------------------------------------- |
| `T`  | extends (...`parameters`: `any`) => [`RenderFunction`](#renderfunction) |

##### Type declaration

▸ (`...parameters`): [`RenderFunction`](#renderfunction)

##### Parameters

| Name            | Type               |
| :-------------- | :----------------- |
| `...parameters` | `Parameters`<`T`\> |

##### Returns

[`RenderFunction`](#renderfunction)

---

#### HeadingOptions

Ƭ **HeadingOptions**: `Object`

##### Type declaration

| Name          | Type                          | Description                               | Default |
| :------------ | :---------------------------- | :---------------------------------------- | :-----: |
| `indentLevel` | [`IndentLevel`](#indentlevel) | The level of indentation for the heading. |   `0`   |

---

#### HelpConfig

Ƭ **HelpConfig**: `Object`

##### Type declaration

| Name       | Type                                      | Description                                                                                        |
| :--------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `display`  | [`RenderFunction`](#renderfunction)[]     | An array in which to call [`Generator`](#generator) functions to render portions of the help text. |
| `options?` | `Partial`<[`HelpOptions`](#helpoptions)\> | Global options for the help text.                                                                  |

---

#### HelpOptions

Ƭ **HelpOptions**: `Object`

##### Type declaration

| Name           | Type                            | Description                                           |       Default       |
| :------------- | :------------------------------ | :---------------------------------------------------- | :-----------------: |
| `indentSpaces` | [`IndentSpaces`](#indentspaces) | The number of spaces used for each indentation level. |         `2`         |
| `maxWidth`     | `number`                        | The maximum width of the help text in characters.     | The terminal width. |

---

#### IndentLevel

Ƭ **IndentLevel**: `number`

The number of times to left pad a string with [`IndentSpaces`](#indentspaces) spaces.

---

#### IndentSpaces

Ƭ **IndentSpaces**: `number`

The number of spaces per [`IndentLevel`](#indentlevel).

---

#### ParagraphOptions

Ƭ **ParagraphOptions**: `Object`

##### Type declaration

| Name          | Type                          | Description                                 | Default |
| :------------ | :---------------------------- | :------------------------------------------ | :-----: |
| `indentLevel` | [`IndentLevel`](#indentlevel) | The level of indentation for the paragraph. |   `0`   |

---

#### RenderFunction

Ƭ **RenderFunction**: (`helpOptions`: [`HelpOptions`](#helpoptions)) => `string`

##### Type declaration

▸ (`helpOptions`): `string`

The type of function that must be returned by a [`Generator`](#generator). This function will be called with
global [`HelpOptions`](#helpoptions) by the main [`help`](#help) function to render a formatted string.

##### Parameters

| Name          | Type                          |
| :------------ | :---------------------------- |
| `helpOptions` | [`HelpOptions`](#helpoptions) |

##### Returns

`string`

---

#### TableAlignment

Ƭ **TableOptions**: 'center' | 'justify' | 'left' | 'right'

The horizontal alignment of a [`table`](#table) column.

---

#### TableOptions

Ƭ **TableOptions**: `Object`

##### Type declaration

| Name            | Type                                | Description                             | Default  |
| :-------------- | :---------------------------------- | :-------------------------------------- | :------: |
| `columnGap`     | `number`                            | The number of spaces between columns.   |   `2`    |
| `indentLevel`   | [`IndentLevel`](#indentlevel)       | The level of indentation for the table. |   `1`    |
| `leftColAlign`  | [`TableAlignment`](#tablealignment) | The alignment of the left column.       | `'left'` |
| `rightColAlign` | [`TableAlignment`](#tablealignment) | The alignment of the right column       | `'left'` |
