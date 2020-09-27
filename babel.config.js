module.exports = {
  presets: ["module:metro-react-native-babel-preset", "@emotion/babel-preset-css-prop"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.ts", ".android.ts", ".ts", ".ios.tsx", ".android.tsx", ".tsx", ".jsx", ".js", ".json"],
      },
    ],
  ],
};
