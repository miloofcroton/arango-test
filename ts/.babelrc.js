module.exports = {
  presets: [
    "next/babel",
    "@emotion/babel-preset-css-prop"
  ],
  plugins: [
    "preval",
    "macros",
    [
      "babel-plugin-import",
      {
        "libraryName": "@material-ui/core",
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        // "libraryDirectory": "esm",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "core"
    ],
    [
      "babel-plugin-import",
      {
        "libraryName": "@material-ui/icons",
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        // "libraryDirectory": "esm",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "icons"
    ]
  ]
}
