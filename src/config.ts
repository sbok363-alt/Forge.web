/**
 * FORGE Marketing Site Configuration
 * 
 * Centralized deployment links to the actual FORGE application,
 * authentication portal, and native mobile distribution channels.
 */

export const FORGE_APP_CONFIG = {
  // Primary application deployment URL (configurable via env)
  appUrl: (import.meta as any).env?.VITE_FORGE_APP_URL || 'https://app.forge.fit',

  // Authentication & Onboarding endpoints
  signInUrl: (import.meta as any).env?.VITE_FORGE_SIGN_IN_URL || 'https://app.forge.fit/login',
  startTrainingUrl: (import.meta as any).env?.VITE_FORGE_START_URL || 'https://app.forge.fit/start',

  // Mobile platforms
  iosTestflightUrl: 'https://testflight.apple.com/join/forge',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=fit.forge.app',
};

/**
 * Open actual FORGE app deployment in a new tab or navigate
 */
export function openForgeApp(path = ''): void {
  const base = FORGE_APP_CONFIG.appUrl.replace(/\/$/, '');
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const url = `${base}${cleanPath}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Open athlete sign-in portal on the actual FORGE app deployment
 */
export function openForgeSignIn(): void {
  window.open(FORGE_APP_CONFIG.signInUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Open athlete registration/start onboarding flow on actual FORGE app deployment
 */
export function openForgeStartTraining(): void {
  window.open(FORGE_APP_CONFIG.startTrainingUrl, '_blank', 'noopener,noreferrer');
}
