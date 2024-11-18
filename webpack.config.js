const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const isProduction = env.NODE_ENV === "production";
  const dotenvFilename = ".env";

  return {
    entry: "./src/index.tsx",
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      static: "./dist",
      open: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      fallback: {
        crypto: require.resolve("crypto-browserify"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv({
        path: dotenvFilename,
        systemvars: true,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public", to: "" }, // Copies everything from `public` to `dist`
        ],
      }),
    ],
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },
  };
};
