export default {
  appUrl: '$VITE_API_BASE_URL',
  hubUrl: '$VITE_API_HUB_URL',
  pistisMode: '$VITE_API_PISTIS_MODE',
  qualityBaseUrl: 'VITE_API_QUALITY_BASE_URL',
  keycloakUrl: '$VITE_AUTHENTICATION_KEYCLOAK_URL',
  keycloakRealm: '$VITE_AUTHENTICATION_KEYCLOAK_REALM',
  keycloakClientId: '$VITE_AUTHENTICATION_KEYCLOAK_CLIENT_ID',
  keycloakClientSecret: 'VITE_AUTHENTICATION_KEYCLOAK_CLIENT_SECRET',
  useLogin: 'VITE_AUTHENTICATION_LOGIN_USE_LOGIN',
  useService: 'VITE_AUTHENTICATION_USE_SERVICE',
  routerOptionsBase: 'VITE_ROUTING_ROUTER_OPTIONS_BASE',

  // Do we (still) need these?
  userToken: 'VITE_AUTHENTICATION_USER_TOKEN',
  
  middlewareUrl: '$VITE_API_MIDDLEWARE_URL',
  piveauSparqlUrl: '$VITE_API_SPARQL_URL'
}
