export interface CreateTableCaseUse {
	execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
	base: number;
	limit?: number;
}

export class CreateTable implements CreateTableCaseUse {
	constructor() /* 
            DI - Dependency Injection
        */
	{}

	execute({ base, limit = 10 }: CreateTableOptions) {
		let outPutMessage = '';
		for (let i = 1; i <= limit; i++) {
			outPutMessage += `${base} x ${i} = ${base * i}\n`;
		}
		return outPutMessage;
	}
}
