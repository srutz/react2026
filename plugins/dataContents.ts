import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

type Options = {
	/** Directory to scan, relative to the project root. */
	dir?: string;
	/** Output file name, written inside `dir`. */
	output?: string;
};

type Entry = {
	file: string;
	name: string;
	size: number;
};

/**
 * Writes `<dir>/<output>` listing all JSON files in `dir`.
 * Regenerates on build start and whenever a JSON file in `dir` changes during dev.
 */
export function dataContents({ dir = "src/data", output = "contents.json" }: Options = {}): Plugin {
	let dataDir = "";
	let outFile = "";

	const generate = () => {
		if (!fs.existsSync(dataDir)) return;

		const entries: Entry[] = fs
			.readdirSync(dataDir)
			.filter((f) => f.endsWith(".json") && f !== output)
			.sort()
			.map((file) => {
				return {
					file,
					name: path.basename(file, ".json"),
					size: fs.statSync(path.join(dataDir, file)).size,
				};
			});

		const content = JSON.stringify(entries, null, "\t") + "\n";
		// only write when changed, to avoid triggering watchers needlessly
		if (fs.existsSync(outFile) && fs.readFileSync(outFile, "utf8") === content) return;
		fs.writeFileSync(outFile, content);
	};

	const isDataJson = (file: string) =>
		path.dirname(file) === dataDir && file.endsWith(".json") && file !== outFile;

	return {
		name: "data-contents",
		configResolved(config) {
			dataDir = path.resolve(config.root, dir);
			outFile = path.join(dataDir, output);
		},
		buildStart() {
			generate();
		},
		configureServer(server) {
			const onChange = (file: string) => {
				if (isDataJson(path.resolve(file))) generate();
			};
			server.watcher.on("add", onChange);
			server.watcher.on("change", onChange);
			server.watcher.on("unlink", onChange);
		},
	};
}
