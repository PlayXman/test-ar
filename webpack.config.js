const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'app', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        liveReload: true,
        compress: false,
        port: 3000
    }
};