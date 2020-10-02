import * as path from "path";
// @ts-ignore
import * as HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration } from "webpack";

const basePathname = (process.env.BASE_PATHNAME || "")
  .split("/")
  .filter(Boolean);

const config: Configuration = {
  mode: "development",
  entry: {
    "demo.getAvailableRoutes": "./demo.getAvailableRoutes",
    "demo.getBestRoute": "./demo.getBestRoute",
  },
  resolve: { extensions: [".ts", ".js"] },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[contenthash].js",
    publicPath: "/" + basePathname.map((x) => x + "/").join(""),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|ts)$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            lib: ["dom", "ES2020"],
            target: "ES2020",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "demo-getAvailableRoutes.html",
      chunks: ["demo.getAvailableRoutes"],
    }),
    new HtmlWebpackPlugin({
      filename: "demo-getBestRoute.html",
      chunks: ["demo.getBestRoute"],
    }),
  ],

  devtool: false,
  stats: "errors-only",
};

export default config;
