module.exports = {
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:9010",
                changeOrigin: true,
                ws: true,
                pathRewrite:{
                }
            }
        }
    }
}