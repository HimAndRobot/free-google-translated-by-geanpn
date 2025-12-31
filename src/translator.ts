import { TranslationResult, TranslationOptions, BatchTranslationOptions } from './types';
import { buildRequestBody, parseResponse, buildTranslateUrl } from './core';

/**
 * Translate a single text string using Google Translate
 */
export async function translate(text: string, options: TranslationOptions): Promise<TranslationResult> {
  const { from = 'auto', to } = options;

  if (!text || text.trim().length === 0) {
    return { success: false, error: 'Text cannot be empty' };
  }

  if (!to) {
    return { success: false, error: 'Target language is required' };
  }

  const url = buildTranslateUrl();
  const body = buildRequestBody(text, from, to);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    body: body
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.text();

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}`, raw: data.substring(0, 300) };
    }

    return parseResponse(data);
  } catch (error: any) {
    return { success: false, error: `Request error: ${error.message}` };
  }
}

/**
 * Translate multiple text strings in batch
 */
export async function translateBatch(
  texts: string[],
  options: BatchTranslationOptions
): Promise<TranslationResult> {
  const {
    from = 'auto',
    to,
    batchSize = 50,
    delimiter = ' ||| ',
    delay = 100
  } = options;

  if (!texts || texts.length === 0) {
    return { success: false, error: 'Texts array cannot be empty' };
  }

  if (!to) {
    return { success: false, error: 'Target language is required' };
  }

  const translatedTexts: string[] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const chunk = texts.slice(i, i + batchSize);
    const textToTranslate = chunk.join(delimiter);

    const result = await translate(textToTranslate, { from, to });

    if (!result.success) {
      return { success: false, error: `Batch translation failed: ${result.error}` };
    }

    const translatedChunk = result.text!.split('|||').map(s => s.trim());
    translatedTexts.push(...translatedChunk);

    if (i + batchSize < texts.length && delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return { success: true, text: translatedTexts.join('\n') };
}
