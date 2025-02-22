module.exports = {
  presets: ['module:metro-react-native-babel-preset', "@babel/preset-env", "@babel/preset-react"],
  plugins: [
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
    ["@babel/plugin-transform-class-properties", { "loose": true }]
  ]
};