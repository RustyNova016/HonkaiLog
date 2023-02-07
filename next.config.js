const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['sequelize'],

    },
    devIndicators: {
        buildActivityPosition: 'bottom-right',
        buildActivity: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
}

module.exports = nextConfig
