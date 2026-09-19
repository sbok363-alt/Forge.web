/**
 * FORGE Marketing Site Configuration
 * 
 * Centralized deployment links to the actual FORGE application
 * and athlete onboarding/authentication endpoints.
 */

export const FORGE_APP_CONFIG = {
  // Primary application deployment URL (configurable via env)
  appUrl: (import.meta as any).env?.VITE_FORGE_APP_URL || 'https://app.forge.fit',

  // Authentication & Onboarding endpoints
  signInUrl: (import.meta as any).env?.VITE_FORGE_SIGN_IN_URL || 'https://app.forge.fit/login',
  startTrainingUrl: (import.meta as any).env?.VITE_FORGE_START_URL || 'https://app.forge.fit/start',
};

