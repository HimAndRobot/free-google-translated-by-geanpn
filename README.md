# Free Google Translate

> A free and unlimited Google Translate API library for Node.js - No API key required

## Features

- ✅ **100% Free** - No API keys or authentication required
- ✅ **High Performance** - Tested at 80+ requests/second in production
- ✅ **Auto language detection** - Automatically detect source language
- ✅ **Batch translation** - Translate multiple texts efficiently
- ✅ **TypeScript support** - Full type definitions included
- ✅ **Lightweight** - Zero dependencies (uses native fetch)
- ✅ **Simple API** - Easy to use with both functional and OOP approaches

## Installation

```bash
npm install @geanpn/free-google-translate
```

## Quick Start

### Functional API

```javascript
const { translate } = require('@geanpn/free-google-translate');

// Simple translation
const result = await translate('Hello world', { to: 'pt' });
console.log(result.text); // "Olá mundo"

// Specify source language
const result2 = await translate('Hello world', { from: 'en', to: 'es' });
console.log(result2.text); // "Hola mundo"
```

### Class-based API

```javascript
const GoogleTranslator = require('@geanpn/free-google-translate');

const translator = new GoogleTranslator('pt', 'auto');

const result = await translator.translate('Hello world');
console.log(result.text); // "Olá mundo"
```

## API Reference

### `translate(text, options)`

Translate a single text string.

**Parameters:**
- `text` (string) - Text to translate
- `options` (object):
  - `to` (string, required) - Target language code
  - `from` (string, optional) - Source language code (default: 'auto')

**Returns:** `Promise<TranslationResult>`

```javascript
const result = await translate('Bonjour', { from: 'fr', to: 'en' });

if (result.success) {
  console.log(result.text); // "Hello"
} else {
  console.error(result.error);
}
```

### `translateBatch(texts, options)`

Translate multiple texts in batch for better performance.

**Parameters:**
- `texts` (string[]) - Array of texts to translate
- `options` (object):
  - `to` (string, required) - Target language code
  - `from` (string, optional) - Source language code (default: 'auto')
  - `batchSize` (number, optional) - Number of texts per request (default: 50)
  - `delimiter` (string, optional) - Delimiter for joining texts (default: ' ||| ')
  - `delay` (number, optional) - Delay between batches in ms (default: 100)

**Returns:** `Promise<TranslationResult>`

```javascript
const texts = ['Hello', 'Good morning', 'Thank you'];
const result = await translateBatch(texts, { to: 'pt' });

if (result.success) {
  console.log(result.text); // "Olá\nBom dia\nObrigado"
}
```

### Class: `GoogleTranslator`

**Constructor:**
```javascript
new GoogleTranslator(defaultTo = 'en', defaultFrom = 'auto')
```

**Methods:**

- `translate(text, to?, from?)` - Translate text
- `translateBatch(texts, to?, from?, options?)` - Translate multiple texts
- `setDefaultTargetLanguage(lang)` - Set default target language
- `setDefaultSourceLanguage(lang)` - Set default source language

**Example:**
```javascript
const translator = new GoogleTranslator('pt', 'en');

// Uses default languages
await translator.translate('Hello');

// Override defaults
await translator.translate('Hola', 'en', 'es');

// Change defaults
translator.setDefaultTargetLanguage('fr');
await translator.translate('Hello'); // Translates to French
```

## Language Codes

Common language codes:
- `en` - English
- `pt` - Portuguese
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `ja` - Japanese
- `ko` - Korean
- `zh-CN` - Chinese (Simplified)
- `ru` - Russian
- `ar` - Arabic
- `auto` - Auto-detect (source language only)

For a complete list, see [Google Translate supported languages](https://cloud.google.com/translate/docs/languages).

## Response Format

```typescript
interface TranslationResult {
  success: boolean;
  text?: string;      // Translated text (if success)
  error?: string;     // Error message (if failed)
  raw?: string;       // Raw response (for debugging)
}
```

## Error Handling

```javascript
const result = await translate('Hello', { to: 'pt' });

if (!result.success) {
  console.error('Translation failed:', result.error);

  // Common errors:
  // - "Empty response" - Network issue
  // - "HTML response (rate limit/captcha)" - Too many requests
  // - "HTTP 429" - Rate limited
  // - "Request error: ..." - Network/fetch error
}
```

## Best Practices

1. **Rate Limiting** - Add delays between requests to avoid being blocked
2. **Error Handling** - Always check `result.success` before using `result.text`
3. **Batch Processing** - Use `translateBatch()` for multiple texts
4. **Caching** - Cache translations to reduce API calls

## Examples

### TypeScript

```typescript
import { translate, TranslationResult } from '@geanpn/free-google-translate';

async function translateText(text: string): Promise<string> {
  const result: TranslationResult = await translate(text, { to: 'pt' });

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.text!;
}
```

### With Retry Logic

```javascript
async function translateWithRetry(text, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const result = await translate(text, options);

    if (result.success) {
      return result;
    }

    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  return { success: false, error: 'Max retries reached' };
}
```

### Translating Files

```javascript
const fs = require('fs').promises;
const { translate } = require('@geanpn/free-google-translate');

async function translateFile(inputPath, outputPath, targetLang) {
  const content = await fs.readFile(inputPath, 'utf-8');
  const result = await translate(content, { to: targetLang });

  if (result.success) {
    await fs.writeFile(outputPath, result.text);
    console.log('Translation complete!');
  } else {
    console.error('Translation failed:', result.error);
  }
}

translateFile('input.txt', 'output.txt', 'pt');
```

## Performance

- Successfully tested in production translating **80+ requests per second**
- Handles high-volume translation workloads efficiently
- Uses Google Translate's web interface, not the official API
- Translation quality depends on Google Translate
- No official support from Google

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Gean Pedro

## Disclaimer

This library uses Google Translate's unofficial API and may break if Google changes their interface. It has been successfully tested in production environments handling high-volume translation workloads. For enterprise use with SLA guarantees, consider using the official [Google Cloud Translation API](https://cloud.google.com/translate).
