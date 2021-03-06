const path = require('path');

module.exports = {
    entry: {
        dialog: './src/main/js/dialog-bridge.ts',
        userevent: './src/main/js/event-handler.ts'
    },
    mode: "production",
    optimization: {
      minimize: false
    },
    externals : [
        function(context, request, callback) {
            if (/^aws-sdk/.test(request)){
                return callback(null, 'commonjs ' + request);
            }
            callback();
        }
    ],
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: '[name].js',
        library: 'index',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'target'),
    }
};