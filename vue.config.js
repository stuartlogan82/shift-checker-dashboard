module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:5000',
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
