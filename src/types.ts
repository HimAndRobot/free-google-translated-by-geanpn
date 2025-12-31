/**
 * Translation result interface
 */
export interface TranslationResult {
  success: boolean;
  text?: string;
  error?: string;
  raw?: string;
}

/**
 * Translation options interface
 */
export interface TranslationOptions {
  from?: string;
  to: string;
  batchSize?: number;
  delimiter?: string;
}

/**
 * Batch translation options
 */
export interface BatchTranslationOptions extends TranslationOptions {
  delay?: number;
}
