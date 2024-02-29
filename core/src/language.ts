import { MissingKey } from "./exceptions.js";


export class Language {


    public filename: string = "";
    private content?: any;

    getString(key1: string, ...args: any[]): string | undefined {


        let value: string;

        const keys = key1.split(".")
        let json = this.content

        while (keys.length > 0) {
            const key = keys.shift()!
            json = json?.[key]
            if (json == null) throw new MissingKey(key1);
        }

        value = json

        let t = 0;
        value = value.replace(/%/g, (match) => args[t++] ?? match)

        return value
    }



    load(strings: any) {
        this.content = strings
    }

    constructor(
        public code: string = "",
    ) {
        this.filename = code + ".json";
    }
}
