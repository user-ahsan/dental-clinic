/**
 * PostCSS plugin: Fix SWC CSS parser bug with dotted custom property names.
 *
 * Tailwind v4 generates CSS with `var(--spacing-0.5)` — CSS custom property
 * references containing dots (e.g. fractional spacing 0.5, 1.5, 2.5).
 * SWC's CSS parser (Turbopack) incorrectly tokenizes the dot as a numeric
 * decimal point instead of as part of the ident token.
 *
 * Fix: escapes dots inside var() → `var(--spacing-0\.5)` which SWC parses correctly.
 */
module.exports = () => ({
  postcssPlugin: 'postcss-fix-dotted-vars',

  Declaration(decl) {
    if (
      decl.value.includes('var(--') &&
      decl.value.match(/--[\w-]+\.\d/)
    ) {
      decl.value = decl.value.replace(
        /var\((--[\w-]+)\.(\d+)\)/g,
        'var($1\\.$2)',
      );
    }
  },
});

module.exports.postcss = true;
