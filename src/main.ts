import stripAnsi from 'strip-ansi'
import {
	table as xTable,
	getBorderCharacters as xTableBorder,
	TableUserConfig as xTableConfig,
} from 'table'
import termSize from 'term-size'
import wrap from 'word-wrap'

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────── Global constants ────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────────────────────────

const SPACE = ' '
const NEWLINE = '\n'

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// ───────────────────────────────────────────── Utils ─────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * The number of spaces per `IndentLevel`.
 */
export type IndentSpaces = number

/**
 * The number of times to left pad a string with `IndentSpaces` spaces.
 */
export type IndentLevel = number

/**
 * Returns a string made of some number of space characters.
 */
const getIndent = (indentLevel: IndentLevel, indentSpaces: IndentSpaces): string => {
	return SPACE.repeat(indentLevel * indentSpaces)
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────── Generators ───────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * A `Generator` is a function that is called inside the `HelpConfig.display` array of the main
 * `help` function and returns a `RenderFunction`.
 *
 * The purpose of a `Generator` is to receive and apply instance overrides before the
 * `RenderFunction` is called by `help` to render the string. This pattern allows for a functional
 * API that looks visually similar to `help`'s final output.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Generator<T extends (...parameters: any) => RenderFunction> = (
	...parameters: Parameters<T>
) => RenderFunction

/**
 * The type of function that must be returned by a `Generator`. This function will be called with
 * global `HelpOptions` by the main `help` function to render a formatted string.
 */
export type RenderFunction = (helpOptions: HelpOptions) => string

// ───────────────────────────────────────────── space ─────────────────────────────────────────────

type Space = (newlines?: number) => RenderFunction

/**
 * Generate blank newlines.
 * @param newlines The number of newlines to render. Defaults to 1.
 */
export const space: Generator<Space> = (newlines = 1): RenderFunction => {
	return () => NEWLINE.repeat(newlines)
}

// ─────────────────────────────────────────── paragraph ───────────────────────────────────────────

export type ParagraphOptions = {
	/**
	 * The level of indentation for the heading. Defaults to 0.
	 */
	indentLevel: IndentLevel
}

type Paragraph = (text: string, options?: Partial<ParagraphOptions>) => RenderFunction

/**
 * Generate a paragraph.
 * @param text The paragraph text.
 * @param options The paragraph options.
 * @param options.indentLevel The level of indentation for the heading. Defaults to 0.
 */
export const paragraph: Generator<Paragraph> = (
	text: string,
	options?: Partial<ParagraphOptions>
): RenderFunction => {
	const defaultOptions: ParagraphOptions = { indentLevel: 0 }

	const userOptions: ParagraphOptions = { ...defaultOptions, ...options }

	const { indentLevel } = userOptions

	return (helpOptions: HelpOptions): string => {
		const { maxWidth, indentSpaces } = helpOptions

		const indent = getIndent(indentLevel, indentSpaces)

		return (
			wrap(text, {
				width: maxWidth - indent.length,
				indent,
				trim: true,
			}) + NEWLINE
		)
	}
}

// ──────────────────────────────────────────── heading ────────────────────────────────────────────

export type HeadingOptions = {
	/**
	 * The level of indentation for the heading. Defaults to 0.
	 */
	indentLevel: IndentLevel
}

type Heading = (text: string, options?: Partial<HeadingOptions>) => RenderFunction

/**
 * Generate a heading.
 * @param text The heading text.
 * @param options The heading options.
 * @param options.indentLevel The level of indentation for the heading. Defaults to 0.
 */
export const heading: Generator<Heading> = (
	text: string,
	options?: Partial<HeadingOptions>
): RenderFunction => {
	const defaultOptions: HeadingOptions = { indentLevel: 0 }

	const userOptions = {
		...defaultOptions,
		...options,
	}

	const { indentLevel } = userOptions

	return paragraph(text, { indentLevel })
}

// ───────────────────────────────────────────── table ─────────────────────────────────────────────

export type TableAlignment = 'center' | 'justify' | 'left' | 'right'

export type TableOptions = {
	/**
	 * The level of indentation for the table. Defaults to 1.
	 */
	indentLevel: IndentLevel
	/**
	 * The number of spaces between columns. Defaults to 2.
	 */
	columnGap: number
	/**
	 * The alignment of the left column. Defaults to 'left'.
	 */
	leftColAlign: TableAlignment
	/**
	 * The alignment of the right column. Defaults to 'left'.
	 */
	rightColAlign: TableAlignment
}

type Table = (data: [string, string][], options?: Partial<TableOptions>) => RenderFunction

/**
 * Generate a 2 column table.
 * @param data The table data.
 * @param options The table options.
 * @param options.indentLevel The level of indentation for the table. Defaults to 1.
 * @param options.columnGap The number of spaces between columns. Defaults to 2.
 */
export const table: Generator<Table> = (
	data: [string, string][],
	options?: Partial<TableOptions>
): RenderFunction => {
	const defaultOptions: TableOptions = {
		indentLevel: 1,
		columnGap: 2,
		leftColAlign: 'left',
		rightColAlign: 'left',
	}

	const userOptions: TableOptions = {
		...defaultOptions,
		...options,
	}

	const { indentLevel, columnGap, leftColAlign, rightColAlign } = userOptions

	return (helpOptions: HelpOptions): string => {
		const { maxWidth, indentSpaces } = helpOptions

		const indent = getIndent(indentLevel, indentSpaces)

		const leftColWidth = Math.max(0, ...data.map(([firstCol]) => stripAnsi(firstCol).length))

		const rightColWidth = maxWidth - leftColWidth - columnGap - indent.length

		const tableConfig: xTableConfig = {
			singleLine: true,
			border: xTableBorder('void'),
			columnDefault: {
				wrapWord: true,
			},
			columns: {
				0: {
					alignment: leftColAlign,
					paddingLeft: indent.length,
					paddingRight: columnGap,
					width: leftColWidth,
				},
				1: { alignment: rightColAlign, paddingLeft: 0, paddingRight: 0, width: rightColWidth },
			},
		}

		return xTable(data, tableConfig)
			.split(NEWLINE)
			.map((row) => row.trimEnd())
			.join(NEWLINE)
			.slice(0, -1) // Remove extra newline
	}
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// ───────────────────────────────────────────── Main ──────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────────────────────────

export type HelpOptions = {
	/**
	 * The maximum width of the help text in characters. Defaults to the terminal width.
	 */
	maxWidth: number
	/**
	 * The number of spaces used for each indentation level. Defaults to 2.
	 */
	indentSpaces: IndentSpaces
}

export type HelpConfig = {
	/**
	 * Global options for the help text.
	 */
	options?: Partial<HelpOptions>
	/**
	 * An array in which to call `Generator` functions to render portions of the help text.
	 */
	display: RenderFunction[]
}

/**
 * A function that generates formatted help text for Node.js CLIs.
 *
 * @param helpConfig The help configuration.
 *
 * @param helpConfig.options The global options for the help text.
 * @param helpConfig.options.maxWidth The maximum width of the help text in characters. Defaults to the terminal width.
 * @param helpConfig.options.indentSpaces The number of spaces per indentation level. Defaults to 2.
 *
 * @param helpConfig.display An array in which to call `Generator` functions to render portions of
 * the help text.
 *
 * Library exported `Generator` functions:
 * - `heading`
 * - `paragraph`
 * - `table`
 * - `space`
 *
 * These generators can be extended and custom generators can be supplied.
 *
 * @see[docs](https://github.com/theurgi/help/README.md) TODO: Add a link to the docs.
 */
export const help = ({ options, display }: HelpConfig): string => {
	const minWidth = 30
	const termWidth = termSize().columns

	const defaultOptions: HelpOptions = {
		maxWidth: termWidth,
		indentSpaces: 2,
	}

	const userOptions: HelpOptions = {
		...defaultOptions,
		...options,
	}

	// clamp: Ensure user provided `maxWidth` is not greater than `termWidth` and not less than
	// `minWidth`.
	userOptions.maxWidth = Math.max(Math.min(userOptions.maxWidth, termWidth), minWidth)

	return display.map((renderer) => renderer(userOptions)).join('')
}
