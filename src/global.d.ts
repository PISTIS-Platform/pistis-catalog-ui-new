import type AuthStorePlugin from './src/plugins/authStorePlugin.ts'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $authStore: AuthStorePlugin
  }
}

declare module 'vue' {
  interface App {
    use(plugin: any, options?: any): this
  }
}
