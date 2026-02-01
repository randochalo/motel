/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@ntos/ui', '@ntos/auth', '@ntos/database', '@ntos/types'],
}

module.exports = nextConfig
