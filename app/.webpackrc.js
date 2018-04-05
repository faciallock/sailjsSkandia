export default {
    "proxy": {
        "/api": {
            "target": "http://localhost:1337/",
            "changeOrigin": true,
            "pathRewrite": { "^/api": "" }
        },
        "/skandia": {
            "target": "http://localhost:9999/",
            "changeOrigin": true,
            "pathRewrite": { "^/skandia": "" }
        }
    }}
