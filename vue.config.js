USERNAME = process.env.API_USERNAME;
PASSWORD = process.env.API_PASSWORD;
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://USERNAME:PASSWORD@localhost:5000',
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
