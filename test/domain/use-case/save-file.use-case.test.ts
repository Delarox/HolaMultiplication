import fs from "fs";
import { SaveFile } from "../../../src/domain/use-case/save-file.use-case";

describe("SaveFile Class", () => {
	const options = {
		fileContent: "custom content",
		fileDestination: "custom-Outputs/file-destination",
		fileName: "custom-table-name",
	};

	const customFilePath = `${options.fileDestination}/${options.fileName}.txt`;

	afterEach(() => {
		const outputFolderExist = fs.existsSync("outputs");
		if (outputFolderExist) fs.rmSync("outputs", { recursive: true });

		const customOutputFolderExist = fs.existsSync("custom-Outputs");
		if (customOutputFolderExist) fs.rmSync("custom-Outputs", { recursive: true });
	});

	test("should save field with default values", () => {
		const saveFile = new SaveFile();
		const filePath = "outputs/table.txt";
		const options = {
			fileContent: "test content",
		};

		const result = saveFile.execute(options);

		expect(result).toBeTruthy();
		const fileExist = fs.existsSync(filePath);
		const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

		expect(fileExist).toBeTruthy();
		expect(fileContent).toBe(options.fileContent);
	});

	test(" should save file with custom values", () => {
		const saveFile = new SaveFile();

		const result = saveFile.execute(options);

		expect(saveFile).toBeInstanceOf(SaveFile);
		expect(result).toBeTruthy();
		const fileExist = fs.existsSync(customFilePath);
		const fileContent = fs.readFileSync(customFilePath, { encoding: "utf8" });

		expect(fileExist).toBeTruthy();
		expect(fileContent).toBe(options.fileContent);
	});

	test("should return false if directory could not be created", () => {

		const saveFile = new SaveFile();
		const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
			throw new Error("This is a custom error message from testing");
		});

        const result = saveFile.execute( options );

        expect( result ).toBe( false );

        mkdirSpy.mockRestore();
	});

    test("should return false if file could not be created", () => {

		const saveFile = new SaveFile();
		const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
			throw new Error("This is a custom writing error message");
		});

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );

		writeFileSpy.mockRestore();
	});

});
