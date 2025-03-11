import { inject } from 'vue'
import { injectionKey } from '../utils/userConfigShimPlugin'

/**
 * Utility function for retrieving the runtime configuration object.
 */
export function useRuntimeEnv() {
  const env = inject(injectionKey)

  if (!env) {
    throw new Error('No runtime environment found. Did you forget to install the runtime configuration service?')
  }

  return env
}
