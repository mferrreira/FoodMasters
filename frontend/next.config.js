/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Configuração experimental do appDir
  },
  webpack(config) {
    // Adiciona suporte ao SVGR
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
