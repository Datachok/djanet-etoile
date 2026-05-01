/**
 * Petit script inline placé dans <head>, exécuté avant l'hydratation.
 * Évite le flash blanc/noir au chargement (FOUC) en lisant la préférence
 * stockée et en posant la classe `dark` immédiatement.
 */
const SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('djanet-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
