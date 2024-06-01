import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

// console.log(yarg);

const {b:base, l:limit, s:show} = yarg;

let outPutMessage = '';
const headerMessage = `
===========================
===========================
        Tabla del ${base}
===========================\n
`;

for (let i = 1; i <= limit; i++) {
    outPutMessage += `${base} x ${i} = ${base * i}\n`;
};

outPutMessage = headerMessage + outPutMessage;

if (show == true) console.log(outPutMessage);

const outputPath = `outputs`;
fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${ outputPath }/tabla${ base }.txt`, outPutMessage);
console.log(`file is done`);


