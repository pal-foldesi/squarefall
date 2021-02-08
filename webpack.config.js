const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/game.js',
    devtool: 'source-map',
    context: __dirname,
    plugins: [
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: './src/style.css',
                        to: './style.css'
                    },
                    {
                        from: './src/index.html',
                        to: './index.html'
                    }
                ]
            }
        )
    ],
    optimization: {
        minimize: true
    }
}
