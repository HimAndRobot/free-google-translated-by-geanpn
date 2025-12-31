import { translate, translateBatch } from './translator';
import { TranslationResult, TranslationOptions, BatchTranslationOptions } from './types';

export { translate, translateBatch };
export type { TranslationResult, TranslationOptions, BatchTranslationOptions };

/**
 * Main class for Google Translate operations
 */
export class GoogleTranslator {
  private defaultFrom: string;
  private defaultTo: string;

  constructor(defaultTo: string = 'en', defaultFrom: string = 'auto') {
    this.defaultTo = defaultTo;
    this.defaultFrom = defaultFrom;
  }

  /**
   * Translate a single text
   */
  async translate(text: string, to?: string, from?: string): Promise<TranslationResult> {
    return translate(text, {
      to: to || this.defaultTo,
      from: from || this.defaultFrom
    });
  }

  /**
   * Translate multiple texts in batch
   */
  async translateBatch(
    texts: string[],
    to?: string,
    from?: string,
    options?: Partial<BatchTranslationOptions>
  ): Promise<TranslationResult> {
    return translateBatch(texts, {
      to: to || this.defaultTo,
      from: from || this.defaultFrom,
      ...options
    });
  }

  /**
   * Set default target language
   */
  setDefaultTargetLanguage(lang: string): void {
    this.defaultTo = lang;
  }

  /**
   * Set default source language
   */
  setDefaultSourceLanguage(lang: string): void {
    this.defaultFrom = lang;
  }
}

export default GoogleTranslator;
