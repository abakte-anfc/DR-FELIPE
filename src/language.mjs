/** @param {string | null} saved @param {readonly string[]} languages */
export function resolveLanguage(saved, languages = []) {
 if (saved === 'pt' || saved === 'es') return saved;
 for (const value of languages) {
  const lang = value.toLowerCase().split('-')[0];
  if (lang === 'pt' || lang === 'es') return lang;
 }
 return 'es';
}
export function whatsappUrl(lang) {
 const message = lang === 'pt'
  ? 'Olá, vi a página do Dr. Felipe Machado e gostaria de receber informações para agendar uma avaliação.'
  : 'Hola, vi la página del Dr. Felipe Machado y me gustaría recibir información para agendar una evaluación.';
 return 'https://wa.me/595994333391?text=' + encodeURIComponent(message);
}

