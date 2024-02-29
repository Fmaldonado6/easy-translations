import { EnvironmentProviders, Injectable, Provider, computed, signal } from '@angular/core';
import { Language, TranslationConfig, translationService } from 'easy-translations-core';

@Injectable()
export class EasyTranslationsService {
  private _language = signal<Language | null>(null)

  language = computed(() => {
    if (this._language() == null) return
    return this._language()
  })

  constructor(config: TranslationConfig) {
    translationService.init(config)
    translationService.onLanguageChanged((lang) => {
      this._language.set(lang)
    })
  }

  changeLanuage(language: Language) {
    return translationService.changeLanguage(language)
  }

  changeLanguageByCode(code: string) {
    return translationService.changeLanguageByCode(code)
  }


  getString(key: string, ...args: any) {
    return computed(() => {
      return this._language()?.getString(key, args)
    })()
  }
  getStringInstant(key: string, ...args: any) {
    return translationService.getString(key, args)
  }
}


export function provideEasyTranslations(config: TranslationConfig) {
  return {
    provide: EasyTranslationsService,
    useFactory: () => {
      return new EasyTranslationsService(config)
    }
  }
}