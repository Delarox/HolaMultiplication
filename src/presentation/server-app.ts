import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/save-file.use-case";

interface options {
	base: number;
	limit: number;
	showTable: boolean;
	fileName: string;
	fileDestination: string;
}

export class ServerApp {
	static run({ base, limit, showTable, fileName, fileDestination }: options) {
		console.log("servidor corriendo...");
		const table = new CreateTable().execute({ base, limit });
		const wasCreated = new SaveFile().execute({
			fileContent: table,
			fileDestination,
			fileName: `${fileName}`,
		});

		if (showTable) console.log(table);
		wasCreated ? console.log("File created") : console.error("File not created");
	}
}
