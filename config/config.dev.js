export default {
  keycloakUrl: import.meta.env.VITE_AUTHENTICATION_KEYCLOAK_URL || 'https://auth.pistis-market.eu/',
  keycloakRealm: import.meta.env.VITE_AUTHENTICATION_KEYCLOAK_REALM || 'PISTIS',
  keycloakClientId: import.meta.env.VITE_AUTHENTICATION_KEYCLOAK_CLIENT_ID || 'fhg-ui-test',
  
  /* FACTORY */
  
  // appUrl: 'https://develop.pistis-market.eu/srv/search/',
  // hubUrl: 'https://develop.pistis-market.eu/srv/repo/',
  // piveauHubStoreUrl: 'https://develop.pistis-market.eu/srv/store/',
  // pistisMode: 'factory', // cloud(marketplace) | factory(my data)
 
  /* CLOUD */
  
  appUrl: 'https://pistis-market.eu/srv/search/',
  hubUrl: 'https://pistis-market.eu/srv/repo/',
  piveauHubStoreUrl: 'https://pistis-market.eu/srv/store/',
  pistisMode: 'cloud', // cloud(marketplace) | factory(my data)

  piveauSparqlUrl: 'https://data.europa.eu/sparql',
}
