const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development", // Pode ser 'development' ou 'production'
    entry: "./src/index.ts", // Arquivo de entrada principal
    output: {
        filename: "index.js", // Nome do arquivo gerado
        path: path.resolve(__dirname, "dist"), // Pasta de saída
        clean: true, // Limpa a pasta `dist` antes de cada build
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Processa arquivos CSS
                use: [
                    'style-loader', // Injeta CSS no DOM durante o desenvolvimento
                    'css-loader', // Lê arquivos CSS
                    {
                        loader: 'postcss-loader', // Processa o Tailwind via PostCSS
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'), // Inclui o Tailwind
                                    require('autoprefixer'), // Adiciona prefixos automáticos
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // Processa imagens
                type: "asset/resource",
                generator: {
                    filename: 'img/[name][ext]', // Pasta de saída para imagens
                },
            },
            {
                test: /\.html$/, // Processa arquivos HTML
                use: ["html-loader"],
            },
            {
                test: /\.tsx?$/, // Para arquivos .ts e .tsx
                use: 'ts-loader', // Transpila TypeScript para JavaScript
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Arquivo HTML base
            filename: "index.html", // Nome do arquivo de saída
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css", // Nome do CSS extraído
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/pdf/', to: 'pdf' }, // Copia tudo de src/assets para dist/assets
            ],
        }),
    ],
    devServer: {
        static: "./dist", // Pasta servida pelo dev server
        port: 3000, // Porta do servidor local
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Permite importar arquivos sem especificar a extensão
    },
};
