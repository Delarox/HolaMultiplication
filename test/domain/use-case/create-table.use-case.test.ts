

import { CreateTable } from '../../../src/domain/use-case/create-table.use-case';

describe('domain/use-case/create-table.use-case.ts', () => {


    test( 'should CreateTable with default values', () => {

        
        const createTable = new CreateTable();
        const table = createTable.execute({base: 2});
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toBe(10);
    });


    test( 'CreateTable.run() should create a table with custom values', () => {

        const options = {
            base: 2,
            limit: 20
        }

        const result = new CreateTable().execute(options);
        expect(typeof result).toBe('string');
        expect(result).toContain('2 x 1 = 2');
        expect(result).toContain('2 x 5 = 10');
        expect(result).toContain('2 x 10 = 20');
        expect(result).toContain('2 x 20 = 40');
    });
});