#!/usr/bin/env node

/**
 * dnd-cli
 * Interactive Command Line tool for Dungeons and Dragons
 *
 * @author Mitul Patel <https://mitulpa.tel>
 */

import cli from './utils/cli.js';
import init from './utils/init.js';
import log from './utils/log.js';

const { flags, input, showHelp } = cli;
const { clear, debug } = flags;

(async () => {
	await init({ clear });
	debug && log(flags);
	input.includes(`help`) && showHelp(0);
})();
