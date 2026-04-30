import * as fs from "fs";

export interface IStorage {
    save(data: unknown): void;
    load(): unknown;
}

export class JsonFileStorage implements IStorage {
    constructor(private filePath: string) {}

    save(data: unknown): void {
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(data, null, 2),
            "utf-8"
        );
    }

    load(): unknown {
        if (!fs.existsSync(this.filePath)) {
            return null;
        }

        const content = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(content);
    }
}