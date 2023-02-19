import chalk from 'chalk'

import { help, heading, paragraph, space, table } from '../../src/main.js'

const { blue, bold, green } = chalk

console.log(
	help({
		display: [
			space(),

			paragraph('My awesome CLI'),
			space(),

			heading(bold('Usage')),
			space(),

			paragraph(`$ cli ${blue('<command>')} ${green('<options>')}`, { indentLevel: 1 }),
			space(),

			heading(bold('Commands')),
			space(),

			table([
				[blue('create'), 'Create something'],
				[blue('update'), 'Update something'],
			]),
			space(),

			heading(bold('Options')),
			space(),

			table([
				[green('-h, --help'), 'Show help'],
				[green('-v, --version'), 'Show version'],
			]),
		],
	})
)
