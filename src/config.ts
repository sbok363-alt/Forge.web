/**
 * FORGE Marketing Site Configuration
 * 
 * Centralized deployment links to the actual FORGE application
 * and athlete onboarding/authentication endpoints.
 */

export const FORGE_APP_CONFIG = {
  // Primary application deployment URL (configured via VITE_FORGE_APP_URL)
  appUrl: (import.meta as any).env?.VITE_FORGE_APP_URL || '',

  // Authentication & Onboarding endpoints (configured via environment variables)
  signInUrl: (import.meta as any).env?.VITE_FORGE_SIGN_IN_URL || '',
  startTrainingUrl: (import.meta as any).env?.VITE_FORGE_START_URL || '',
};

