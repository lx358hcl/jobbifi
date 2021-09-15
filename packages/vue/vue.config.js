module.exports = {
    devServer: {
        port: 8080
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}