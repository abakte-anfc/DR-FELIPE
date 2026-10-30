import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguage, whatsappUrl } from '../src/language.mjs';
test('manual preference wins', () => assert.equal(resolveLanguage('es', ['pt-BR']), 'es'));
test('first supported language and Spanish fallback', () => {
 assert.equal(resolveLanguage(null, ['en-US', 'pt-BR', 'es']), 'pt');
 assert.equal(resolveLanguage('invalid', ['fr']), 'es');
});
test('localized WhatsApp uses supplied number', () => {
 for (const lang of ['es', 'pt']) {
  const url = new URL(whatsappUrl(lang));
  assert.equal(url.pathname, '/595994333391');
  assert.ok(url.searchParams.get('text').includes(lang === 'pt' ? 'Olá' : 'Hola'));
 }
});
