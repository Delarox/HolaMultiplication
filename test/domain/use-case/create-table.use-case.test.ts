

import { CreateTable } from '../../../src/domain/use-case/create-table.use-case';

describe('domain/use-case/create-table.use-case.ts', () => {

    test( 'CreateTable.run() should return a table', (done) => {
        const result = new CreateTable().execute({ base: 2, limit: 10 });
        done();
        expect(result).toContain('2 x 10 = 20');
    });
});