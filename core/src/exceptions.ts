export class MissingKey extends Error {
    constructor(key: string) {
        super(`Key  "${key}" not found in translation file`);
    }
}

export class MissingFile extends Error {
    constructor(filename: string, path: string) {
        super(`File "${filename} not found in path "${path}"`);
    }
}

export class MissingTranslation extends Error {
    constructor(code: string) {
        super(`Translation with code "${code} not has not been loaded`);
    }
}

