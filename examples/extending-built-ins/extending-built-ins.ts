import chalk from 'chalk'

import { help, heading, paragraph, space, table } from '../../src/main.js'

const { inverse } = chalk

const myHeading = (text: string) => {
	text = text.toUpperCase().trim()
	return heading(inverse(` ${text} `))
}

console.log(
	help({
		display: [
			space(),
			paragraph('My awesome CLI'),
			space(),
			myHeading('usage'),
			space(),
			paragraph('$ cli <command> [options]', { indentLevel: 1 }),
			space(),
			myHeading('commands'),
			space(),
			table([
				['create', 'Create something'],
				['update', 'Update something'],
			]),
			space(),
			myHeading('Options'),
			space(),
			table([
				['-h, --help', 'Show help'],
				['-v, --version', 'Show version'],
			]),
		],
	})
)
