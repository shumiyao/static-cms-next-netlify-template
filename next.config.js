/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  // webpack: (config) => {
  //   config.module.rules.push(
  //     ...[
  //       {
  //         test: /\.svg$/,
  //         use: "@svgr/webpack",
  //       },
  //     ]
  //   );
  //   return config;
  // },
};

module.exports = withContentlayer(nextConfig);

