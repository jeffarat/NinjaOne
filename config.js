import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const config = {
  ui: {  
    baseUrl: process.env.ENV_URL || 'http://localhost:3001',
  },
  api: {  
    baseUrl: process.env.API_URL || 'http://localhost:3000',
    endpoints:{
    devices: '/devices/',
    },
  }
};

export default config