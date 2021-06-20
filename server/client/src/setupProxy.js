const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ['/q','/host'],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};