export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.NODE_ENV || 'NEED TO CONFIGURED'
  }
});