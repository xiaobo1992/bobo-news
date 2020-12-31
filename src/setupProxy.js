const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/proxy',
        createProxyMiddleware({
            target: 'https://newsapi.org',
            pathRewrite: {'/proxy': '/'},
            changeOrigin: true
        })
    )
};