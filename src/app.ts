import { yarg } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

// console.log(yarg.b);

(async () => {
	await main();
})();

export async function main() {
	const { b: base, l: limit, s: showTable, n: name, d: destination} = yarg;

	ServerApp.run({ base, limit, showTable, fileName: name, fileDestination: destination });
	// console.log( yarg );
}
