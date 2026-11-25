import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import { defineConfig } from "vite";

/**
 * Opt in / opt out of the React Compiler per file.
 * Return true to compile the file, false to skip it.
 * (Per component you can also use the "use no memo" directive.)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reactCompilerOptIn = (_filename: string): boolean => {
	//if (filename.includes("/src/components/ui/")) return false; // opt out: shadcn components
	return true; // opt in: everything else
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// must come before react()
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		tailwindcss(),
		react(),
		babel({ presets: [reactCompilerPreset({ sources: reactCompilerOptIn })] }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
