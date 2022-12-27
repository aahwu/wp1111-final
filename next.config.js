/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: process.env.NODE_ENV === 'development' ?
      __dirname : __dirname
  }
};
