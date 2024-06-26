import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'development' | 'production';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {

    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: path.resolve(__dirname, 'public', 'favicon.ico')
            }),
            new webpack.ProgressPlugin(),
            new webpack.EnvironmentPlugin({
                REACT_APP_API_URL: `${isDev ? 'http://localhost:5000/' : 'https://api.avagame.site/'}`
            }),
            isProd && new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/i,
                    use: [
                        { 
                            loader: '@svgr/webpack', 
                            options: { 
                                icon: true 
                            } 
                        }
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true,
            historyApiFallback: true
        } : undefined,
    };

    return config;
};
