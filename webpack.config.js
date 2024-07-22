const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

// .env 파일을 로드
dotenv.config();

module.exports = {
  entry: './src/components/FeedbackButton.tsx',
  output: {
    filename: 'feedback-button.js',
    path: path.resolve(__dirname, 'public'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: 'esnext',
                jsx: 'react',
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader', // Handles CSS imports and URLs
          'postcss-loader', // Processes CSS with PostCSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@utils': path.resolve(__dirname, 'utils/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_SUPABASE_URL
      ),
      'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: 'production',
};
