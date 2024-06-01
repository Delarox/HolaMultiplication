import fs from 'fs';

export interface SaveFileUseCase {
	execute: (options: Options) => boolean;
}

export interface Options {
	fileContent: string;
	fileDestination: string;
	fileName: string;
}

export class SaveFile implements SaveFileUseCase {
	cosntructor /* 
            DI - Dependency Injection
        */() {}

	execute({
		fileContent,
		fileDestination: destination,
		fileName,
	}: Options): boolean {
		try {
			fs.mkdirSync(destination, { recursive: true });
			fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
