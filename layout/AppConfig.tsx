'use client';
/*
 * AppConfig — theme switcher panel (gear icon).
 * Disabled for DIGI-PHARMed: the theme is fixed to dark/blue.
 * The original Atlantis AppConfig called changeTheme() on every mount
 * which injected a <link> tag via DOM and caused slow initial paint.
 * Keeping the component but removing all theme-switching side effects.
 */
const AppConfig = () => null;
export default AppConfig;
