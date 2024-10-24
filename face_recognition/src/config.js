const backendUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'https://smartbrain-backend-6y14.onrender.com';

export default backendUrl;
