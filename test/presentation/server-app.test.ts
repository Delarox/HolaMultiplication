import { CreateTable } from "../../src/domain/use-case/create-table.use-case";
import { SaveFile } from "../../src/domain/use-case/save-file.use-case";
import { ServerApp } from "../../src/presentation/server-app";

describe("Server App", () => {
	const options = {
		base: 2,
		limit: 10,
		showTable: false,
		fileName: "test-filename",
		fileDestination: "test-destination",
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test("should create Server App instance", () => {
		const serverApp = new ServerApp();
		expect(serverApp).toBeInstanceOf(ServerApp);
		expect(typeof ServerApp.run).toBe("function");
	});

	test("should run ServerApp with options", () => {
		const logSpy = jest.spyOn(console, "log");
		const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
		const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

		ServerApp.run(options);
		expect(logSpy).toHaveBeenCalledTimes(2);
		expect(logSpy).toHaveBeenCalledWith("servidor corriendo...");
		expect(logSpy).toHaveBeenLastCalledWith("File created");

		expect(createTableSpy).toHaveBeenCalledTimes(1);
		expect(createTableSpy).toHaveBeenCalledWith({
			base: options.base,
			limit: options.limit,
		});

		expect(saveFileSpy).toHaveBeenCalledTimes(1);
		expect(saveFileSpy).toHaveBeenCalledWith({
			fileContent: expect.any(String),
			fileDestination: options.fileDestination,
			fileName: options.fileName,
		});
	});

	test("should run custom values mocked ", () => {
		const logMock = jest.fn();
		const logErrorMock = jest.fn();
		const createMock = jest.fn().mockReturnValue("1 X 2 = 2");
		const saveFileMock = jest.fn().mockReturnValue(false);

		console.log = logMock;
		console.error = logErrorMock;
		CreateTable.prototype.execute = createMock;
		SaveFile.prototype.execute = saveFileMock;

		ServerApp.run(options);

		expect(logMock).toHaveBeenCalledWith("servidor corriendo...");
		expect(createMock).toHaveBeenCalledWith({
			base: options.base,
			limit: options.limit,
		});

		expect(saveFileMock).toHaveBeenCalledWith({
			fileContent: "1 X 2 = 2",
			fileDestination: options.fileDestination,
			fileName: options.fileName,
		});

		//expect(logMock).toHaveBeenCalledWith('File created');
		expect(logErrorMock).toHaveBeenCalled();
	});
});
