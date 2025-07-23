// src/config/config.js
const runtimeConfig = window.config || {
    navigation: [
        { name: 'TESTHome', icon: 'house' },
        { name: 'My Data', icon: 'database' },
        { name: 'My Transactions', icon: 'arrow-right-arrow-left' },
        { name: 'Pistis Market', icon: 'store' },
        { name: 'Manage Services', icon: 'clipboard-list' },
        { name: 'Resources and activities monitor', icon: 'chart-line' }
    ],
    subNav: [
        { name: 'Wallet' },
        { name: 'Data Log' },
        { name: 'Models Manager' },
        { name: 'Purchase/Subscription Plan Designer' },
        { name: 'Data Usage and Intensions Analytics' }
    ],
    keycloak: {
        factory_or_cloud: import.meta.env.VITE_FACTORY_OR_CLOUD,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        url: import.meta.env.VITE_KEYCLOAK_URL,
        loginUrl: import.meta.env.VITE_EXTERNAL_LOGIN_URL,
        frontendBaseApiHost: import.meta.env.VITE_FRONTEND_BASE_API_HOST,
        backendBaseApiHost: import.meta.env.VITE_BACKEND_BASE_API_HOST
    }
};

export default runtimeConfig;

  