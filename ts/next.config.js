/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const toc = require('remark-toc');
const tocOptions = {
  maxDepth: 5,
  tight: true,
};
const slug = require('remark-slug');
const slugOptions = {};
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [],
    remarkPlugins: [
      [toc, tocOptions],
      [slug, slugOptions],
    ],
  },
});
const mdxConfig = {
  pageExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'md',
    'mdx'
  ]
};

const withImages = require('next-images');

module.exports = withPlugins(
  [
    [withMDX, mdxConfig],
    withImages,
  ],
  {
    // target: 'server' is necessary to export static files
    target: 'server',
    env: {
      // this is how you get values from the '.env' files
      REACT_APP_ENV: process.env.REACT_APP_ENV,
      PORT: process.env.PORT,
      ROOT: __dirname,
    },
    exportTrailingSlash: true,

    // experimental: {
    //   granularChunks: true
    // },

    // exportPathMap: async (
    //   defaultPathMap,
    //   { dev, dir, outDir, distDir, buildId }
    // ) => {

    //   console.log(defaultPathMap);

    //   const pathMap = {
    //     ...defaultPathMap
    //   };

    //   return pathMap;
    // },

    webpack: (config, { defaultLoaders, isServer, dev } ) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
        module: 'empty'
      };

      config.module.rules.push(
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack'
            }
          ]
        }
      );

      // this causes the next export command to fail:
      // if (!isServer && !dev) {
      //   // this reduces build sizes of common dependencies and puts them in _app
      //   config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
      // }

      if (config.resolve.plugins) {
        config.resolve.plugins.push(new TsconfigPathsPlugin());
      } else {
        config.resolve.plugins = [new TsconfigPathsPlugin()];
      }

      return config;
    },
  }
);
