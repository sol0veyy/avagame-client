import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = 'development' | 'production';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {

    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new htmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
            new webpack.EnvironmentPlugin({
                REACT_APP_API_URL: 'http://localhost:5000/'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true
        } : undefined,
    };

    return config;
};
