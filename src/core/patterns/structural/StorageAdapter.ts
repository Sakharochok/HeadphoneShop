import * as fs from 'fs';

export interface IStorage {
    save(data: any): void;
    load(): any;
}

export class JsonFileAdapter implements IStorage {
    constructor(private filePath: string) {}

    save(data: any): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    load(): any {
        if (!fs.existsSync(this.filePath)) {
            return null;
        }
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileContent);
    }
}