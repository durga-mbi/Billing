export const config = {
  // Toggle between DEV and PROD based on environment
  apiUrl: import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL,

  mode: (import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_MODE
    : import.meta.env.VITE_DEV_MODE) || import.meta.env.MODE || 'development',
};

console.log(`[Config] Web App running in ${config.mode} mode`);
console.log(`[Config] API Endpoint: ${config.apiUrl}`);
