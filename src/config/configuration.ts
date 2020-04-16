export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'NEED TO CONFIGURED',
});