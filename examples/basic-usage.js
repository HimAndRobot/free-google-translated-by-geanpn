const { translate, translateBatch, GoogleTranslator } = require('../dist/index');

async function examples() {
  console.log('=== Example 1: Simple Translation ===');
  const result1 = await translate('Hello world', { to: 'pt' });
  if (result1.success) {
    console.log('English -> Portuguese:', result1.text);
  }

  console.log('\n=== Example 2: Specify Source Language ===');
  const result2 = await translate('Bonjour le monde', { from: 'fr', to: 'en' });
  if (result2.success) {
    console.log('French -> English:', result2.text);
  }

  console.log('\n=== Example 3: Batch Translation ===');
  const texts = ['Hello', 'Good morning', 'Thank you', 'Goodbye'];
  const result3 = await translateBatch(texts, { to: 'es' });
  if (result3.success) {
    console.log('Batch translation to Spanish:');
    console.log(result3.text);
  }

  console.log('\n=== Example 4: Using Class ===');
  const translator = new GoogleTranslator('pt', 'en');
  const result4 = await translator.translate('How are you?');
  if (result4.success) {
    console.log('Using class:', result4.text);
  }

  console.log('\n=== Example 5: Error Handling ===');
  const result5 = await translate('', { to: 'pt' });
  if (!result5.success) {
    console.log('Error:', result5.error);
  }

  console.log('\n=== Example 6: Multiple Languages ===');
  const text = 'Technology is amazing';
  const languages = ['pt', 'es', 'fr', 'de', 'it'];

  for (const lang of languages) {
    const result = await translate(text, { to: lang });
    if (result.success) {
      console.log(`${lang.toUpperCase()}: ${result.text}`);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

examples().catch(console.error);
