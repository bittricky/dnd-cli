#!/usr/bin/env node

/**
 * dnd-cli
 * Interactive Command Line tool for Dungeons and Dragons
 *
 * @author Mitul Patel <https://mitulpa.tel>
 */

import init from './utils/init.js';
import mainMenu from './src/menu.js';
import cli from './utils/cli.js';
import log from './utils/log.js';

const { flags, input, showHelp } = cli;
const { clear, debug } = flags;

(async () => {
	try {
		await init({ clear });
		debug && log(flags);

		if (input.includes('help')) {
			showHelp(0);
			return;
		}

		await mainMenu();
	} catch (error) {
		console.error('An error occurred:', error);
		process.exit(1);
	}
})();
