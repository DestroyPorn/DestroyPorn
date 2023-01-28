import path from "node:path"
import * as url from 'url';



const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
  entry: './src/service_worker.ts',
  devtool: 'inline-source-map',
  mode: "development",
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
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { 
      "stream": "stream-browserify",
      "buffer": "buffer/",
      "util": "util/",
      "zlib": "browserify-zlib",
      "assert": "assert/",
      "path": "path-browserify"
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats:{
    errorDetails: false,
  }
}


