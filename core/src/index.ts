import { MissingFile } from "./exceptions.js";
import { Language } from "./language.js"
import fs from 'fs'
import { isNodejs } from "./utils.js";

export class TranslationConfig {
    path!: string
    languages: string[] = []
    default!: string
}

class TranslationService {
    private languages = new Map<string, Language>();
    private path!: string

    private defaultLanguage?: Language
    private language?: Language

    private _onLanguageChanged?: (language: Language) => void

    onLanguageChanged(func: (language: Language) => void) {
        this._onLanguageChanged = func
    }

    async init(config: TranslationConfig) {
        this.path = config.path.endsWith("/") ? config.path : config.path + "/"
        config.languages.forEach(e => {
            const lang = new Language(e)
            this.languages.set(lang.code, lang)
        })
        const defaultLang = this.languages.get(config.default)

        if (!defaultLang) throw new MissingFile(config.default, config.path)

        this.defaultLanguage = defaultLang
        this.language = defaultLang
        await this.changeLanguage(this.defaultLanguage)
    }

    async changeLanguage(language: Language) {
        await this.readLanguageFile(language)
        this.language = language
        this._onLanguageChanged?.(language)
    }


    async changeLanguageByCode(code: string) {
        const language = this.languages.get(code)
        if (!language) throw new MissingFile(code, this.path)
        await this.readLanguageFile(language)
        this.language = language
        this._onLanguageChanged?.(language)
    }

    private async readLanguageFile(language: Language) {
        let jsonData: any;

        if (!isNodejs()) {
            const data = await fetch(this.path + language.filename)
            jsonData = data.json()
        } else
            jsonData = JSON.parse(fs.readFileSync(this.path + language.filename).toString())

        language.load(jsonData)
    }

    getDefaultLanguage() {
        return this.defaultLanguage
    }

    getString(key: string, ...args: any) {
        return this.language?.getString(key, args)
    }

    gatLanguageByCode(code: string) {
        return this.languages.get(code)
    }

    getRegisteredLanguages() {
        return [... this.languages.values()]
    }
}

export const translationService = new TranslationService();