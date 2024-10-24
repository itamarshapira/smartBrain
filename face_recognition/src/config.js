//* Here We check if the environment is 'development' or 'production':
// 'process.env.NODE_ENV' is set automatically by React depending on whether 
// the app is running locally or in a live production environment.

const backendUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'https://smartbrain-backend-6y14.onrender.com';

export default backendUrl;
